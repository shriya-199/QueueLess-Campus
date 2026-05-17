package com.queuelesscampus.service.impl;

import com.queuelesscampus.dto.request.MaintenanceRequest;
import com.queuelesscampus.dto.response.MaintenanceResponse;
import com.queuelesscampus.entity.Facility;
import com.queuelesscampus.entity.MaintenanceLog;
import com.queuelesscampus.entity.User;
import com.queuelesscampus.enums.FacilityStatus;
import com.queuelesscampus.enums.MaintenanceStatus;
import com.queuelesscampus.exception.ResourceNotFoundException;
import com.queuelesscampus.mapper.ResponseMapper;
import com.queuelesscampus.repository.FacilityRepository;
import com.queuelesscampus.repository.MaintenanceLogRepository;
import com.queuelesscampus.service.CurrentUserService;
import com.queuelesscampus.service.MaintenanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaintenanceServiceImpl implements MaintenanceService {
    private final MaintenanceLogRepository maintenanceLogRepository;
    private final FacilityRepository facilityRepository;
    private final CurrentUserService currentUserService;
    private final ResponseMapper mapper;

    @Override
    @Transactional
    public MaintenanceResponse createMaintenance(MaintenanceRequest request) {
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new IllegalArgumentException("Maintenance start date must be before end date");
        }
        Facility facility = facilityRepository.findById(request.getFacilityId())
                .orElseThrow(() -> new ResourceNotFoundException("Facility not found"));
        User admin = currentUserService.getCurrentUser();
        MaintenanceLog log = maintenanceLogRepository.save(MaintenanceLog.builder()
                .facility(facility).admin(admin).reason(request.getReason())
                .startDate(request.getStartDate()).endDate(request.getEndDate())
                .startTime(request.getStartTime()).endTime(request.getEndTime())
                .status(MaintenanceStatus.SCHEDULED).build());
        facility.setStatus(FacilityStatus.MAINTENANCE);
        facilityRepository.save(facility);
        return mapper.toMaintenance(log);
    }

    @Override
    @Transactional
    public MaintenanceResponse completeMaintenance(Long id) {
        MaintenanceLog log = findLog(id);
        log.setStatus(MaintenanceStatus.COMPLETED);
        log.getFacility().setStatus(FacilityStatus.ACTIVE);
        facilityRepository.save(log.getFacility());
        return mapper.toMaintenance(maintenanceLogRepository.save(log));
    }

    @Override
    @Transactional
    public MaintenanceResponse cancelMaintenance(Long id) {
        MaintenanceLog log = findLog(id);
        log.setStatus(MaintenanceStatus.CANCELLED);
        log.getFacility().setStatus(FacilityStatus.ACTIVE);
        facilityRepository.save(log.getFacility());
        return mapper.toMaintenance(maintenanceLogRepository.save(log));
    }

    @Override
    public List<MaintenanceResponse> allMaintenance() {
        return maintenanceLogRepository.findAll().stream().map(mapper::toMaintenance).toList();
    }

    private MaintenanceLog findLog(Long id) {
        return maintenanceLogRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Maintenance log not found"));
    }
}
