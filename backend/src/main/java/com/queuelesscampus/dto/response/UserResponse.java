package com.queuelesscampus.dto.response;

import com.queuelesscampus.enums.UserRole;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private UserRole role;
    private String department;
    private String studentId;
    private String phone;
    private boolean active;
}
