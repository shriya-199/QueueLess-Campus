package com.queuelesscampus.controller;

import com.queuelesscampus.dto.request.ProfileUpdateRequest;
import com.queuelesscampus.dto.response.BookingResponse;
import com.queuelesscampus.dto.response.PenaltyResponse;
import com.queuelesscampus.dto.response.UserResponse;
import com.queuelesscampus.entity.User;
import com.queuelesscampus.mapper.ResponseMapper;
import com.queuelesscampus.repository.UserRepository;
import com.queuelesscampus.service.BookingService;
import com.queuelesscampus.service.CurrentUserService;
import com.queuelesscampus.service.PenaltyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {
    private final CurrentUserService currentUserService;
    private final UserRepository userRepository;
    private final BookingService bookingService;
    private final PenaltyService penaltyService;
    private final ResponseMapper mapper;

    @GetMapping("/profile")
    public UserResponse profile() {
        return mapper.toUser(currentUserService.getCurrentUser());
    }

    @PutMapping("/profile")
    public UserResponse updateProfile(@RequestBody ProfileUpdateRequest request) {
        User user = currentUserService.getCurrentUser();
        if (request.getName() != null && !request.getName().isBlank()) user.setName(request.getName());
        if (request.getDepartment() != null) user.setDepartment(request.getDepartment());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        return mapper.toUser(userRepository.save(user));
    }

    @GetMapping("/bookings")
    public List<BookingResponse> bookings() {
        return bookingService.myBookings();
    }

    @GetMapping("/penalties")
    public List<PenaltyResponse> penalties() {
        return penaltyService.myPenalties();
    }
}
