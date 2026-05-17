package com.queuelesscampus.dto.response;

import com.queuelesscampus.enums.BookingStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
public class BookingResponse {
    private Long id;
    private Long userId;
    private String userName;
    private Long facilityId;
    private String facilityName;
    private LocalDate bookingDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private BookingStatus status;
    private String adminRemarks;
    private String cancelReason;
    private String timelineNote;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
