package com.queuelesscampus.dto.response;

import com.queuelesscampus.enums.UserRole;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String token;
    private String tokenType;
    private Long userId;
    private String name;
    private String email;
    private UserRole role;
}
