package com.queuelesscampus.service.impl;

import com.queuelesscampus.dto.response.NotificationResponse;
import com.queuelesscampus.entity.Notification;
import com.queuelesscampus.entity.User;
import com.queuelesscampus.enums.NotificationType;
import com.queuelesscampus.exception.ResourceNotFoundException;
import com.queuelesscampus.exception.UnauthorizedActionException;
import com.queuelesscampus.mapper.ResponseMapper;
import com.queuelesscampus.repository.NotificationRepository;
import com.queuelesscampus.service.CurrentUserService;
import com.queuelesscampus.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final CurrentUserService currentUserService;
    private final ResponseMapper mapper;

    @Override
    @Transactional
    public void create(User user, String title, String message, NotificationType type) {
        notificationRepository.save(Notification.builder()
                .user(user).title(title).message(message).type(type).readStatus(false).build());
    }

    @Override
    public List<NotificationResponse> myNotifications() {
        return notificationRepository.findByUserOrderByCreatedAtDesc(currentUserService.getCurrentUser())
                .stream().map(mapper::toNotification).toList();
    }

    @Override
    @Transactional
    public NotificationResponse markRead(Long id) {
        User user = currentUserService.getCurrentUser();
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));
        if (!notification.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedActionException("You cannot update this notification");
        }
        notification.setReadStatus(true);
        return mapper.toNotification(notificationRepository.save(notification));
    }

    @Override
    @Transactional
    public void markAllRead() {
        User user = currentUserService.getCurrentUser();
        List<Notification> notifications = notificationRepository.findByUserOrderByCreatedAtDesc(user);
        notifications.forEach(notification -> notification.setReadStatus(true));
        notificationRepository.saveAll(notifications);
    }

    @Override
    public long unreadCount() {
        return notificationRepository.countByUserAndReadStatusFalse(currentUserService.getCurrentUser());
    }
}
