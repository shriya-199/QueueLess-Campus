package com.queuelesscampus.dto.response;

import com.queuelesscampus.enums.NotificationType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NotificationResponse {
    private Long id;
    private String title;
    private String message;
    private NotificationType type;
    private boolean readStatus;
    private LocalDateTime createdAt;
}
