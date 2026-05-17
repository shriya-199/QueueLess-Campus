package com.queuelesscampus.service;

import com.queuelesscampus.dto.request.FacilityRequest;
import com.queuelesscampus.dto.response.AvailabilityResponse;
import com.queuelesscampus.dto.response.FacilityResponse;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface FacilityService {
    List<FacilityResponse> getAllFacilities();
    FacilityResponse getFacility(Long id);
    FacilityResponse createFacility(FacilityRequest request);
    FacilityResponse updateFacility(Long id, FacilityRequest request);
    void deleteFacility(Long id);
    AvailabilityResponse getAvailability(Long facilityId, LocalDate date, LocalTime startTime, LocalTime endTime);
}
