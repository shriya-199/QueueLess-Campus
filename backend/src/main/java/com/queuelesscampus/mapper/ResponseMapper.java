package com.queuelesscampus.mapper;

import com.queuelesscampus.dto.response.*;
import com.queuelesscampus.entity.*;
import org.springframework.stereotype.Component;

@Component
public class ResponseMapper {
    public UserResponse toUser(User user) {
        return UserResponse.builder()
                .id(user.getId()).name(user.getName()).email(user.getEmail()).role(user.getRole())
                .department(user.getDepartment()).studentId(user.getStudentId()).phone(user.getPhone())
                .active(user.isActive()).build();
    }

    public FacilityResponse toFacility(Facility facility) {
        return FacilityResponse.builder()
                .id(facility.getId()).name(facility.getName()).type(facility.getType())
                .description(facility.getDescription()).location(facility.getLocation())
                .capacity(facility.getCapacity()).slotDurationMinutes(facility.getSlotDurationMinutes())
                .openingTime(facility.getOpeningTime()).closingTime(facility.getClosingTime())
                .status(facility.getStatus()).imageUrl(facility.getImageUrl()).build();
    }

    public BookingResponse toBooking(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId()).userId(booking.getUser().getId()).userName(booking.getUser().getName())
                .facilityId(booking.getFacility().getId()).facilityName(booking.getFacility().getName())
                .bookingDate(booking.getBookingDate()).startTime(booking.getStartTime()).endTime(booking.getEndTime())
                .status(booking.getStatus()).adminRemarks(booking.getAdminRemarks()).cancelReason(booking.getCancelReason())
                .timelineNote(booking.getTimelineNote()).createdAt(booking.getCreatedAt()).updatedAt(booking.getUpdatedAt()).build();
    }

    public WaitlistResponse toWaitlist(Waitlist waitlist) {
        return WaitlistResponse.builder()
                .id(waitlist.getId()).userId(waitlist.getUser().getId()).userName(waitlist.getUser().getName())
                .facilityId(waitlist.getFacility().getId()).facilityName(waitlist.getFacility().getName())
                .preferredDate(waitlist.getPreferredDate()).preferredStartTime(waitlist.getPreferredStartTime())
                .preferredEndTime(waitlist.getPreferredEndTime()).queuePosition(waitlist.getQueuePosition())
                .status(waitlist.getStatus()).build();
    }

    public NotificationResponse toNotification(Notification notification) {
        return NotificationResponse.builder()
                .id(notification.getId()).title(notification.getTitle()).message(notification.getMessage())
                .type(notification.getType()).readStatus(notification.isReadStatus())
                .createdAt(notification.getCreatedAt()).build();
    }

    public PenaltyResponse toPenalty(Penalty penalty) {
        return PenaltyResponse.builder()
                .id(penalty.getId()).bookingId(penalty.getBooking() == null ? null : penalty.getBooking().getId())
                .reason(penalty.getReason()).points(penalty.getPoints()).status(penalty.getStatus())
                .issuedAt(penalty.getIssuedAt()).waivedAt(penalty.getWaivedAt()).build();
    }

    public MaintenanceResponse toMaintenance(MaintenanceLog maintenance) {
        return MaintenanceResponse.builder()
                .id(maintenance.getId()).facilityId(maintenance.getFacility().getId())
                .facilityName(maintenance.getFacility().getName()).adminId(maintenance.getAdmin().getId())
                .reason(maintenance.getReason()).startDate(maintenance.getStartDate()).endDate(maintenance.getEndDate())
                .startTime(maintenance.getStartTime()).endTime(maintenance.getEndTime())
                .status(maintenance.getStatus()).build();
    }
}
