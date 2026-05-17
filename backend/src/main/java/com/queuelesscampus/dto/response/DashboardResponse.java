package com.queuelesscampus.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardResponse {
    private long totalFacilities;
    private long totalBookings;
    private long pendingBookings;
    private long approvedBookings;
    private long totalUsers;
}
