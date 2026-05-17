package com.queuelesscampus.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class AvailabilityResponse {
    private Long facilityId;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private int capacity;
    private long bookedCount;
    private long waitingCount;
    private boolean available;
    private boolean maintenanceBlocked;
}
