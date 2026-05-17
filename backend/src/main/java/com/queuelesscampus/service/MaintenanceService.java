package com.queuelesscampus.service;

import com.queuelesscampus.dto.request.MaintenanceRequest;
import com.queuelesscampus.dto.response.MaintenanceResponse;

import java.util.List;

public interface MaintenanceService {
    MaintenanceResponse createMaintenance(MaintenanceRequest request);
    MaintenanceResponse completeMaintenance(Long id);
    MaintenanceResponse cancelMaintenance(Long id);
    List<MaintenanceResponse> allMaintenance();
}
