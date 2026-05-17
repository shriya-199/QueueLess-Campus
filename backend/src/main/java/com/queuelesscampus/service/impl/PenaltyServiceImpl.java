package com.queuelesscampus.service.impl;

import com.queuelesscampus.dto.response.PenaltyResponse;
import com.queuelesscampus.entity.Booking;
import com.queuelesscampus.entity.Penalty;
import com.queuelesscampus.entity.User;
import com.queuelesscampus.enums.NotificationType;
import com.queuelesscampus.enums.PenaltyStatus;
import com.queuelesscampus.mapper.ResponseMapper;
import com.queuelesscampus.repository.PenaltyRepository;
import com.queuelesscampus.service.CurrentUserService;
import com.queuelesscampus.service.NotificationService;
import com.queuelesscampus.service.PenaltyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PenaltyServiceImpl implements PenaltyService {
    private final PenaltyRepository penaltyRepository;
    private final CurrentUserService currentUserService;
    private final NotificationService notificationService;
    private final ResponseMapper mapper;

    @Override
    @Transactional
    public void issueNoShowPenalty(User user, Booking booking) {
        penaltyRepository.save(Penalty.builder()
                .user(user)
                .booking(booking)
                .reason("No-show for approved facility booking")
                .points(1)
                .status(PenaltyStatus.ACTIVE)
                .build());
        notificationService.create(user, "Penalty added",
                "A no-show penalty was added for your booking at " + booking.getFacility().getName(),
                NotificationType.PENALTY_ADDED);
    }

    @Override
    public List<PenaltyResponse> myPenalties() {
        return penaltyRepository.findByUserOrderByIssuedAtDesc(currentUserService.getCurrentUser())
                .stream().map(mapper::toPenalty).toList();
    }
}
