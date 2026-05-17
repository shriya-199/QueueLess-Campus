package com.queuelesscampus.service.impl;

import com.queuelesscampus.entity.User;
import com.queuelesscampus.exception.ResourceNotFoundException;
import com.queuelesscampus.repository.UserRepository;
import com.queuelesscampus.security.CustomUserDetails;
import com.queuelesscampus.service.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurrentUserServiceImpl implements CurrentUserService {
    private final UserRepository userRepository;

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails principal)) {
            throw new ResourceNotFoundException("Authenticated user not found");
        }
        return userRepository.findByEmail(principal.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));
    }
}
