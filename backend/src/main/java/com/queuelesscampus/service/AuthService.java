package com.queuelesscampus.service;

import com.queuelesscampus.dto.request.LoginRequest;
import com.queuelesscampus.dto.request.RegisterRequest;
import com.queuelesscampus.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
