package com.queuelesscampus.dto.request;

import lombok.Data;

@Data
public class ProfileUpdateRequest {
    private String name;
    private String department;
    private String phone;
}
