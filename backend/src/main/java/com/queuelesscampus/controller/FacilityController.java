package com.queuelesscampus.controller;

import com.queuelesscampus.dto.response.AvailabilityResponse;
import com.queuelesscampus.dto.response.FacilityResponse;
import com.queuelesscampus.service.FacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/facilities")
@RequiredArgsConstructor
public class FacilityController {
    private final FacilityService facilityService;

    @GetMapping
    public List<FacilityResponse> all() {
        return facilityService.getAllFacilities();
    }

    @GetMapping("/{id}")
    public FacilityResponse one(@PathVariable Long id) {
        return facilityService.getFacility(id);
    }

    @GetMapping("/{id}/availability")
    public AvailabilityResponse availability(@PathVariable Long id,
                                             @RequestParam LocalDate date,
                                             @RequestParam LocalTime startTime,
                                             @RequestParam LocalTime endTime) {
        return facilityService.getAvailability(id, date, startTime, endTime);
    }
}
