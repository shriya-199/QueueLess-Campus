package com.queuelesscampus.dto.response;

import com.queuelesscampus.enums.FacilityStatus;
import com.queuelesscampus.enums.FacilityType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalTime;

@Data
@Builder
public class FacilityResponse {
    private Long id;
    private String name;
    private FacilityType type;
    private String description;
    private String location;
    private int capacity;
    private int slotDurationMinutes;
    private LocalTime openingTime;
    private LocalTime closingTime;
    private FacilityStatus status;
    private String imageUrl;
}
