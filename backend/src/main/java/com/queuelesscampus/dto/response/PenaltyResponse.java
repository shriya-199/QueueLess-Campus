package com.queuelesscampus.dto.response;

import com.queuelesscampus.enums.PenaltyStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PenaltyResponse {
    private Long id;
    private Long bookingId;
    private String reason;
    private int points;
    private PenaltyStatus status;
    private LocalDateTime issuedAt;
    private LocalDateTime waivedAt;
}
