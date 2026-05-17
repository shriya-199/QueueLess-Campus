package com.queuelesscampus.service.impl;

import com.queuelesscampus.dto.request.WaitlistRequest;
import com.queuelesscampus.dto.response.WaitlistResponse;
import com.queuelesscampus.entity.Booking;
import com.queuelesscampus.entity.Facility;
import com.queuelesscampus.entity.User;
import com.queuelesscampus.entity.Waitlist;
import com.queuelesscampus.enums.BookingStatus;
import com.queuelesscampus.enums.FacilityStatus;
import com.queuelesscampus.enums.NotificationType;
import com.queuelesscampus.enums.WaitlistStatus;
import com.queuelesscampus.exception.ResourceNotFoundException;
import com.queuelesscampus.exception.UnauthorizedActionException;
import com.queuelesscampus.mapper.ResponseMapper;
import com.queuelesscampus.repository.BookingRepository;
import com.queuelesscampus.repository.FacilityRepository;
import com.queuelesscampus.repository.WaitlistRepository;
import com.queuelesscampus.service.CurrentUserService;
import com.queuelesscampus.service.NotificationService;
import com.queuelesscampus.service.WaitlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WaitlistServiceImpl implements WaitlistService {
    private final WaitlistRepository waitlistRepository;
    private final FacilityRepository facilityRepository;
    private final BookingRepository bookingRepository;
    private final CurrentUserService currentUserService;
    private final NotificationService notificationService;
    private final ResponseMapper mapper;

    @Override
    @Transactional
    public WaitlistResponse joinWaitlist(WaitlistRequest request) {
        User user = currentUserService.getCurrentUser();
        Facility facility = facilityRepository.findById(request.getFacilityId())
                .orElseThrow(() -> new ResourceNotFoundException("Facility not found"));
        validateSlot(facility, request.getPreferredStartTime(), request.getPreferredEndTime());
        if (waitlistRepository.existsByUserIdAndFacilityIdAndPreferredDateAndPreferredStartTimeAndPreferredEndTimeAndStatus(
                user.getId(), facility.getId(), request.getPreferredDate(), request.getPreferredStartTime(),
                request.getPreferredEndTime(), WaitlistStatus.WAITING)) {
            throw new IllegalArgumentException("You are already waiting for this slot");
        }
        long currentCount = waitlistRepository.countByFacilityIdAndPreferredDateAndPreferredStartTimeAndPreferredEndTimeAndStatus(
                facility.getId(), request.getPreferredDate(), request.getPreferredStartTime(), request.getPreferredEndTime(), WaitlistStatus.WAITING);
        Waitlist waitlist = waitlistRepository.save(Waitlist.builder()
                .user(user).facility(facility).preferredDate(request.getPreferredDate())
                .preferredStartTime(request.getPreferredStartTime()).preferredEndTime(request.getPreferredEndTime())
                .queuePosition((int) currentCount + 1).status(WaitlistStatus.WAITING).build());
        notificationService.create(user, "Joined waitlist",
                "You joined the waiting queue for " + facility.getName(), NotificationType.WAITLIST_JOINED);
        return mapper.toWaitlist(waitlist);
    }

    @Override
    @Transactional
    public WaitlistResponse cancelWaitlist(Long id) {
        User user = currentUserService.getCurrentUser();
        Waitlist waitlist = waitlistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Waitlist entry not found"));
        if (!waitlist.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedActionException("You cannot cancel this waitlist entry");
        }
        waitlist.setStatus(WaitlistStatus.CANCELLED);
        return mapper.toWaitlist(waitlistRepository.save(waitlist));
    }

    @Override
    public List<WaitlistResponse> myWaitlists() {
        return waitlistRepository.findByUserOrderByCreatedAtDesc(currentUserService.getCurrentUser())
                .stream().map(mapper::toWaitlist).toList();
    }

    @Override
    public List<WaitlistResponse> facilityWaitlists(Long facilityId) {
        return waitlistRepository.findByFacilityIdAndStatusOrderByPreferredDateAscPreferredStartTimeAscQueuePositionAsc(
                facilityId, WaitlistStatus.WAITING)
                .stream().map(mapper::toWaitlist).toList();
    }

    @Override
    @Transactional
    public void promoteNext(Long facilityId, LocalDate date, LocalTime start, LocalTime end) {
        Facility facility = facilityRepository.findById(facilityId)
                .orElseThrow(() -> new ResourceNotFoundException("Facility not found"));
        long activeBookings = bookingRepository.countByFacilityIdAndBookingDateAndStartTimeAndEndTimeAndStatusIn(
                facilityId, date, start, end, List.of(BookingStatus.PENDING, BookingStatus.APPROVED));
        if (activeBookings >= facility.getCapacity()) return;
        waitlistRepository.findFirstByFacilityIdAndPreferredDateAndPreferredStartTimeAndPreferredEndTimeAndStatusOrderByQueuePositionAsc(
                facilityId, date, start, end, WaitlistStatus.WAITING).ifPresent(waitlist -> {
            waitlist.setStatus(WaitlistStatus.PROMOTED);
            waitlistRepository.save(waitlist);
            bookingRepository.save(Booking.builder()
                    .user(waitlist.getUser()).facility(facility).bookingDate(date).startTime(start).endTime(end)
                    .status(BookingStatus.APPROVED)
                    .timelineNote("Auto-promoted from waitlist after a slot opened.")
                    .build());
            notificationService.create(waitlist.getUser(), "Waitlist promoted",
                    "A slot opened for " + facility.getName() + ". Your booking is now approved.",
                    NotificationType.WAITLIST_PROMOTED);
        });
    }

    private void validateSlot(Facility facility, LocalTime start, LocalTime end) {
        if (facility.getStatus() != FacilityStatus.ACTIVE) throw new IllegalArgumentException("Facility is not active");
        if (!start.isBefore(end)) throw new IllegalArgumentException("Start time must be before end time");
        if (start.isBefore(facility.getOpeningTime()) || end.isAfter(facility.getClosingTime())) {
            throw new IllegalArgumentException("Slot is outside facility operating hours");
        }
    }
}
