package com.queuelesscampus.service.impl;

import com.queuelesscampus.dto.request.BookingRequest;
import com.queuelesscampus.dto.request.CancelBookingRequest;
import com.queuelesscampus.dto.request.DecisionRequest;
import com.queuelesscampus.dto.response.BookingResponse;
import com.queuelesscampus.entity.Booking;
import com.queuelesscampus.entity.Facility;
import com.queuelesscampus.entity.User;
import com.queuelesscampus.enums.*;
import com.queuelesscampus.exception.BookingConflictException;
import com.queuelesscampus.exception.ResourceNotFoundException;
import com.queuelesscampus.exception.UnauthorizedActionException;
import com.queuelesscampus.mapper.ResponseMapper;
import com.queuelesscampus.repository.BookingRepository;
import com.queuelesscampus.repository.FacilityRepository;
import com.queuelesscampus.repository.MaintenanceLogRepository;
import com.queuelesscampus.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;
    private final FacilityRepository facilityRepository;
    private final MaintenanceLogRepository maintenanceLogRepository;
    private final CurrentUserService currentUserService;
    private final NotificationService notificationService;
    private final WaitlistService waitlistService;
    private final PenaltyService penaltyService;
    private final ResponseMapper mapper;

    @Override
    @Transactional
    public BookingResponse createBooking(BookingRequest request) {
        User user = currentUserService.getCurrentUser();
        Facility facility = facilityRepository.findById(request.getFacilityId())
                .orElseThrow(() -> new ResourceNotFoundException("Facility not found"));
        validateBookingRequest(user, facility, request);
        Booking booking = bookingRepository.save(Booking.builder()
                .user(user).facility(facility).bookingDate(request.getBookingDate())
                .startTime(request.getStartTime()).endTime(request.getEndTime())
                .status(BookingStatus.PENDING)
                .timelineNote("Booking request created and waiting for admin approval.")
                .build());
        notificationService.create(user, "Booking requested",
                "Your booking request for " + facility.getName() + " is pending approval.",
                NotificationType.BOOKING_CREATED);
        return mapper.toBooking(booking);
    }

    @Override
    @Transactional
    public BookingResponse cancelBooking(Long id, CancelBookingRequest request) {
        User user = currentUserService.getCurrentUser();
        Booking booking = findBooking(id);
        boolean owner = booking.getUser().getId().equals(user.getId());
        if (!owner && user.getRole() != UserRole.ADMIN) throw new UnauthorizedActionException("You cannot cancel this booking");
        if (booking.getStatus() == BookingStatus.CANCELLED || booking.getStatus() == BookingStatus.REJECTED) {
            throw new IllegalArgumentException("Booking is already closed");
        }
        booking.setStatus(BookingStatus.CANCELLED);
        booking.setCancelReason(request == null ? null : request.getReason());
        booking.setTimelineNote("Booking cancelled. Waitlist promotion checked.");
        Booking saved = bookingRepository.save(booking);
        notificationService.create(booking.getUser(), "Booking cancelled",
                "Your booking for " + booking.getFacility().getName() + " was cancelled.",
                NotificationType.BOOKING_CANCELLED);
        waitlistService.promoteNext(booking.getFacility().getId(), booking.getBookingDate(), booking.getStartTime(), booking.getEndTime());
        return mapper.toBooking(saved);
    }

    @Override
    @Transactional
    public BookingResponse approveBooking(Long id, DecisionRequest request) {
        Booking booking = findBooking(id);
        if (booking.getStatus() != BookingStatus.PENDING) throw new IllegalArgumentException("Only pending bookings can be approved");
        booking.setStatus(BookingStatus.APPROVED);
        booking.setAdminRemarks(request == null ? null : request.getRemarks());
        booking.setTimelineNote("Booking approved by admin.");
        Booking saved = bookingRepository.save(booking);
        notificationService.create(booking.getUser(), "Booking approved",
                "Your booking for " + booking.getFacility().getName() + " was approved.",
                NotificationType.BOOKING_APPROVED);
        return mapper.toBooking(saved);
    }

    @Override
    @Transactional
    public BookingResponse rejectBooking(Long id, DecisionRequest request) {
        Booking booking = findBooking(id);
        if (booking.getStatus() != BookingStatus.PENDING) throw new IllegalArgumentException("Only pending bookings can be rejected");
        booking.setStatus(BookingStatus.REJECTED);
        booking.setAdminRemarks(request == null ? null : request.getRemarks());
        booking.setTimelineNote("Booking rejected by admin.");
        Booking saved = bookingRepository.save(booking);
        notificationService.create(booking.getUser(), "Booking rejected",
                "Your booking for " + booking.getFacility().getName() + " was rejected.",
                NotificationType.BOOKING_REJECTED);
        waitlistService.promoteNext(booking.getFacility().getId(), booking.getBookingDate(), booking.getStartTime(), booking.getEndTime());
        return mapper.toBooking(saved);
    }

    @Override
    @Transactional
    public BookingResponse markNoShow(Long id) {
        Booking booking = findBooking(id);
        if (booking.getStatus() != BookingStatus.APPROVED) throw new IllegalArgumentException("Only approved bookings can be marked no-show");
        booking.setStatus(BookingStatus.NO_SHOW);
        booking.setTimelineNote("Admin marked this booking as no-show and penalty was generated.");
        Booking saved = bookingRepository.save(booking);
        penaltyService.issueNoShowPenalty(booking.getUser(), booking);
        waitlistService.promoteNext(booking.getFacility().getId(), booking.getBookingDate(), booking.getStartTime(), booking.getEndTime());
        return mapper.toBooking(saved);
    }

    @Override
    public BookingResponse getBooking(Long id) {
        User user = currentUserService.getCurrentUser();
        Booking booking = findBooking(id);
        if (user.getRole() != UserRole.ADMIN && !booking.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedActionException("You cannot view this booking");
        }
        return mapper.toBooking(booking);
    }

    @Override
    public List<BookingResponse> myBookings() {
        return bookingRepository.findByUserOrderByBookingDateDescStartTimeDesc(currentUserService.getCurrentUser())
                .stream().map(mapper::toBooking).toList();
    }

    @Override
    public List<BookingResponse> allBookings() {
        return bookingRepository.findAll().stream().map(mapper::toBooking).toList();
    }

    @Override
    public List<BookingResponse> pendingBookings() {
        return bookingRepository.findByStatusOrderByCreatedAtAsc(BookingStatus.PENDING)
                .stream().map(mapper::toBooking).toList();
    }

    private Booking findBooking(Long id) {
        return bookingRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
    }

    private void validateBookingRequest(User user, Facility facility, BookingRequest request) {
        if (facility.getStatus() != FacilityStatus.ACTIVE) throw new BookingConflictException("Facility is not available");
        if (!request.getStartTime().isBefore(request.getEndTime())) throw new BookingConflictException("Start time must be before end time");
        if (request.getStartTime().isBefore(facility.getOpeningTime()) || request.getEndTime().isAfter(facility.getClosingTime())) {
            throw new BookingConflictException("Slot is outside facility operating hours");
        }
        List<BookingStatus> activeStatuses = List.of(BookingStatus.PENDING, BookingStatus.APPROVED);
        if (bookingRepository.existsUserOverlap(user.getId(), request.getBookingDate(), request.getStartTime(), request.getEndTime(), activeStatuses)) {
            throw new BookingConflictException("You already have an overlapping active booking");
        }
        if (bookingRepository.findFacilityOverlaps(facility.getId(), request.getBookingDate(), request.getStartTime(), request.getEndTime(), activeStatuses).size() >= facility.getCapacity()) {
            throw new BookingConflictException("Facility slot is full. Join the waitlist instead.");
        }
        boolean blocked = maintenanceLogRepository.existsBlockingMaintenance(
                facility.getId(), request.getBookingDate(), request.getStartTime(), request.getEndTime(),
                List.of(MaintenanceStatus.SCHEDULED, MaintenanceStatus.ACTIVE));
        if (blocked) throw new BookingConflictException("Facility is blocked for maintenance during this slot");
    }
}
