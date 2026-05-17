package com.queuelesscampus.dto.response;

import com.queuelesscampus.enums.MaintenanceStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class MaintenanceResponse {
    private Long id;
    private Long facilityId;
    private String facilityName;
    private Long adminId;
    private String reason;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private MaintenanceStatus status;
}
