package com.queuelesscampus.service;

import com.queuelesscampus.dto.response.NotificationResponse;
import com.queuelesscampus.entity.User;
import com.queuelesscampus.enums.NotificationType;

import java.util.List;

public interface NotificationService {
    void create(User user, String title, String message, NotificationType type);
    List<NotificationResponse> myNotifications();
    NotificationResponse markRead(Long id);
    void markAllRead();
    long unreadCount();
}
