package com.queuelesscampus.dto.request;

import com.queuelesscampus.enums.FacilityStatus;
import com.queuelesscampus.enums.FacilityType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalTime;

@Data
public class FacilityRequest {
    @NotBlank
    private String name;

    @NotNull
    private FacilityType type;

    private String description;
    private String location;

    @Min(1)
    private int capacity;

    @Min(15)
    private int slotDurationMinutes;

    @NotNull
    private LocalTime openingTime;

    @NotNull
    private LocalTime closingTime;

    private FacilityStatus status = FacilityStatus.ACTIVE;
    private String imageUrl;
}
