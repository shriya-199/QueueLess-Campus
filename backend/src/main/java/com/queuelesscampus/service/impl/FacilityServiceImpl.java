package com.queuelesscampus.service.impl;

import com.queuelesscampus.dto.request.FacilityRequest;
import com.queuelesscampus.dto.response.AvailabilityResponse;
import com.queuelesscampus.dto.response.FacilityResponse;
import com.queuelesscampus.entity.Facility;
import com.queuelesscampus.enums.BookingStatus;
import com.queuelesscampus.enums.FacilityStatus;
import com.queuelesscampus.enums.MaintenanceStatus;
import com.queuelesscampus.enums.WaitlistStatus;
import com.queuelesscampus.exception.ResourceNotFoundException;
import com.queuelesscampus.mapper.ResponseMapper;
import com.queuelesscampus.repository.BookingRepository;
import com.queuelesscampus.repository.FacilityRepository;
import com.queuelesscampus.repository.MaintenanceLogRepository;
import com.queuelesscampus.repository.WaitlistRepository;
import com.queuelesscampus.service.FacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FacilityServiceImpl implements FacilityService {
    private final FacilityRepository facilityRepository;
    private final BookingRepository bookingRepository;
    private final WaitlistRepository waitlistRepository;
    private final MaintenanceLogRepository maintenanceLogRepository;
    private final ResponseMapper mapper;

    @Override
    public List<FacilityResponse> getAllFacilities() {
        return facilityRepository.findAll().stream().map(mapper::toFacility).toList();
    }

    @Override
    public FacilityResponse getFacility(Long id) {
        return mapper.toFacility(findFacility(id));
    }

    @Override
    @Transactional
    public FacilityResponse createFacility(FacilityRequest request) {
        validateFacilityTimes(request.getOpeningTime(), request.getClosingTime());
        Facility facility = Facility.builder().build();
        applyRequest(facility, request);
        return mapper.toFacility(facilityRepository.save(facility));
    }

    @Override
    @Transactional
    public FacilityResponse updateFacility(Long id, FacilityRequest request) {
        validateFacilityTimes(request.getOpeningTime(), request.getClosingTime());
        Facility facility = findFacility(id);
        applyRequest(facility, request);
        return mapper.toFacility(facilityRepository.save(facility));
    }

    @Override
    @Transactional
    public void deleteFacility(Long id) {
        facilityRepository.delete(findFacility(id));
    }

    @Override
    public AvailabilityResponse getAvailability(Long facilityId, LocalDate date, LocalTime startTime, LocalTime endTime) {
        Facility facility = findFacility(facilityId);
        validateSlot(facility, startTime, endTime);
        List<BookingStatus> activeStatuses = List.of(BookingStatus.PENDING, BookingStatus.APPROVED);
        long booked = bookingRepository.countByFacilityIdAndBookingDateAndStartTimeAndEndTimeAndStatusIn(
                facilityId, date, startTime, endTime, activeStatuses);
        long waiting = waitlistRepository.countByFacilityIdAndPreferredDateAndPreferredStartTimeAndPreferredEndTimeAndStatus(
                facilityId, date, startTime, endTime, WaitlistStatus.WAITING);
        boolean blocked = maintenanceLogRepository.existsBlockingMaintenance(
                facilityId, date, startTime, endTime, List.of(MaintenanceStatus.SCHEDULED, MaintenanceStatus.ACTIVE));
        return AvailabilityResponse.builder()
                .facilityId(facilityId).date(date).startTime(startTime).endTime(endTime)
                .capacity(facility.getCapacity()).bookedCount(booked).waitingCount(waiting)
                .maintenanceBlocked(blocked).available(facility.getStatus() == FacilityStatus.ACTIVE && !blocked && booked < facility.getCapacity())
                .build();
    }

    private Facility findFacility(Long id) {
        return facilityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Facility not found"));
    }

    private void applyRequest(Facility facility, FacilityRequest request) {
        facility.setName(request.getName());
        facility.setType(request.getType());
        facility.setDescription(request.getDescription());
        facility.setLocation(request.getLocation());
        facility.setCapacity(request.getCapacity());
        facility.setSlotDurationMinutes(request.getSlotDurationMinutes());
        facility.setOpeningTime(request.getOpeningTime());
        facility.setClosingTime(request.getClosingTime());
        facility.setStatus(request.getStatus() == null ? FacilityStatus.ACTIVE : request.getStatus());
        facility.setImageUrl(request.getImageUrl());
    }

    private void validateFacilityTimes(LocalTime opening, LocalTime closing) {
        if (!opening.isBefore(closing)) throw new IllegalArgumentException("Opening time must be before closing time");
    }

    private void validateSlot(Facility facility, LocalTime start, LocalTime end) {
        if (!start.isBefore(end)) throw new IllegalArgumentException("Start time must be before end time");
        if (start.isBefore(facility.getOpeningTime()) || end.isAfter(facility.getClosingTime())) {
            throw new IllegalArgumentException("Slot is outside facility operating hours");
        }
    }
}
