package com.queuelesscampus.controller;

import com.queuelesscampus.dto.request.DecisionRequest;
import com.queuelesscampus.dto.request.FacilityRequest;
import com.queuelesscampus.dto.request.MaintenanceRequest;
import com.queuelesscampus.dto.response.*;
import com.queuelesscampus.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final FacilityService facilityService;
    private final BookingService bookingService;
    private final WaitlistService waitlistService;
    private final MaintenanceService maintenanceService;
    private final AnalyticsService analyticsService;

    @GetMapping("/dashboard")
    public DashboardResponse dashboard() {
        return analyticsService.dashboard();
    }

    @PostMapping("/facilities")
    @ResponseStatus(HttpStatus.CREATED)
    public FacilityResponse createFacility(@Valid @RequestBody FacilityRequest request) {
        return facilityService.createFacility(request);
    }

    @PutMapping("/facilities/{id}")
    public FacilityResponse updateFacility(@PathVariable Long id, @Valid @RequestBody FacilityRequest request) {
        return facilityService.updateFacility(id, request);
    }

    @DeleteMapping("/facilities/{id}")
    public void deleteFacility(@PathVariable Long id) {
        facilityService.deleteFacility(id);
    }

    @GetMapping("/bookings")
    public List<BookingResponse> bookings() {
        return bookingService.allBookings();
    }

    @GetMapping("/bookings/pending")
    public List<BookingResponse> pendingBookings() {
        return bookingService.pendingBookings();
    }

    @PutMapping("/bookings/{id}/approve")
    public BookingResponse approve(@PathVariable Long id, @RequestBody(required = false) DecisionRequest request) {
        return bookingService.approveBooking(id, request);
    }

    @PutMapping("/bookings/{id}/reject")
    public BookingResponse reject(@PathVariable Long id, @RequestBody(required = false) DecisionRequest request) {
        return bookingService.rejectBooking(id, request);
    }

    @PutMapping("/bookings/{id}/mark-no-show")
    public BookingResponse noShow(@PathVariable Long id) {
        return bookingService.markNoShow(id);
    }

    @GetMapping("/queues/facilities/{facilityId}")
    public List<WaitlistResponse> facilityQueue(@PathVariable Long facilityId) {
        return waitlistService.facilityWaitlists(facilityId);
    }

    @PostMapping("/maintenance")
    @ResponseStatus(HttpStatus.CREATED)
    public MaintenanceResponse createMaintenance(@Valid @RequestBody MaintenanceRequest request) {
        return maintenanceService.createMaintenance(request);
    }

    @GetMapping("/maintenance")
    public List<MaintenanceResponse> maintenance() {
        return maintenanceService.allMaintenance();
    }

    @PutMapping("/maintenance/{id}/complete")
    public MaintenanceResponse completeMaintenance(@PathVariable Long id) {
        return maintenanceService.completeMaintenance(id);
    }

    @PutMapping("/maintenance/{id}/cancel")
    public MaintenanceResponse cancelMaintenance(@PathVariable Long id) {
        return maintenanceService.cancelMaintenance(id);
    }
}
