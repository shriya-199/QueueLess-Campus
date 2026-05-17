package com.queuelesscampus.service.impl;

import com.queuelesscampus.dto.response.DashboardResponse;
import com.queuelesscampus.enums.BookingStatus;
import com.queuelesscampus.repository.BookingRepository;
import com.queuelesscampus.repository.FacilityRepository;
import com.queuelesscampus.repository.UserRepository;
import com.queuelesscampus.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {
    private final FacilityRepository facilityRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    @Override
    public DashboardResponse dashboard() {
        return DashboardResponse.builder()
                .totalFacilities(facilityRepository.count())
                .totalBookings(bookingRepository.count())
                .pendingBookings(bookingRepository.countByStatus(BookingStatus.PENDING))
                .approvedBookings(bookingRepository.countByStatus(BookingStatus.APPROVED))
                .totalUsers(userRepository.count())
                .build();
    }
}
