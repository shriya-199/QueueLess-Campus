package com.queuelesscampus.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class MaintenanceRequest {
    @NotNull
    private Long facilityId;

    @NotBlank
    private String reason;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    private LocalTime startTime;
    private LocalTime endTime;
}
