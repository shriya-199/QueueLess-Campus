package com.queuelesscampus.dto.response;

import com.queuelesscampus.enums.WaitlistStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class WaitlistResponse {
    private Long id;
    private Long userId;
    private String userName;
    private Long facilityId;
    private String facilityName;
    private LocalDate preferredDate;
    private LocalTime preferredStartTime;
    private LocalTime preferredEndTime;
    private int queuePosition;
    private WaitlistStatus status;
}
