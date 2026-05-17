package com.queuelesscampus.service;

import com.queuelesscampus.dto.request.WaitlistRequest;
import com.queuelesscampus.dto.response.WaitlistResponse;

import java.util.List;

public interface WaitlistService {
    WaitlistResponse joinWaitlist(WaitlistRequest request);
    WaitlistResponse cancelWaitlist(Long id);
    List<WaitlistResponse> myWaitlists();
    List<WaitlistResponse> facilityWaitlists(Long facilityId);
    void promoteNext(Long facilityId, java.time.LocalDate date, java.time.LocalTime start, java.time.LocalTime end);
}
