package com.queuelesscampus.service;

import com.queuelesscampus.dto.request.BookingRequest;
import com.queuelesscampus.dto.request.CancelBookingRequest;
import com.queuelesscampus.dto.request.DecisionRequest;
import com.queuelesscampus.dto.response.BookingResponse;

import java.util.List;

public interface BookingService {
    BookingResponse createBooking(BookingRequest request);
    BookingResponse cancelBooking(Long id, CancelBookingRequest request);
    BookingResponse approveBooking(Long id, DecisionRequest request);
    BookingResponse rejectBooking(Long id, DecisionRequest request);
    BookingResponse markNoShow(Long id);
    BookingResponse getBooking(Long id);
    List<BookingResponse> myBookings();
    List<BookingResponse> allBookings();
    List<BookingResponse> pendingBookings();
}
