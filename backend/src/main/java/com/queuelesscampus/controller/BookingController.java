package com.queuelesscampus.controller;

import com.queuelesscampus.dto.request.BookingRequest;
import com.queuelesscampus.dto.request.CancelBookingRequest;
import com.queuelesscampus.dto.response.BookingResponse;
import com.queuelesscampus.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse create(@Valid @RequestBody BookingRequest request) {
        return bookingService.createBooking(request);
    }

    @GetMapping("/{id}")
    public BookingResponse get(@PathVariable Long id) {
        return bookingService.getBooking(id);
    }

    @GetMapping("/my")
    public List<BookingResponse> my() {
        return bookingService.myBookings();
    }

    @PutMapping("/{id}/cancel")
    public BookingResponse cancel(@PathVariable Long id, @RequestBody(required = false) CancelBookingRequest request) {
        return bookingService.cancelBooking(id, request);
    }
}
