package com.queuelesscampus.dto.request;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class WaitlistRequest {
    @NotNull
    private Long facilityId;

    @NotNull
    @FutureOrPresent
    private LocalDate preferredDate;

    @NotNull
    private LocalTime preferredStartTime;

    @NotNull
    private LocalTime preferredEndTime;
}
