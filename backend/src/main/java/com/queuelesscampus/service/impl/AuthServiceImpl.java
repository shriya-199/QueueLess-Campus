package com.queuelesscampus.service.impl;

import com.queuelesscampus.dto.request.LoginRequest;
import com.queuelesscampus.dto.request.RegisterRequest;
import com.queuelesscampus.dto.response.AuthResponse;
import com.queuelesscampus.entity.User;
import com.queuelesscampus.enums.UserRole;
import com.queuelesscampus.repository.UserRepository;
import com.queuelesscampus.security.JwtService;
import com.queuelesscampus.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }
        if (request.getStudentId() != null && !request.getStudentId().isBlank()
                && userRepository.existsByStudentId(request.getStudentId())) {
            throw new IllegalArgumentException("Student ID already registered");
        }
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail().toLowerCase())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.STUDENT)
                .department(request.getDepartment())
                .studentId(request.getStudentId())
                .phone(request.getPhone())
                .active(true)
                .build();
        userRepository.save(user);
        return toAuthResponse(user);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        return toAuthResponse(user);
    }

    private AuthResponse toAuthResponse(User user) {
        return AuthResponse.builder()
                .token(jwtService.generateToken(user))
                .tokenType("Bearer")
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}
