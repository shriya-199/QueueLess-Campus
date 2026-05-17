package com.queuelesscampus.service;

import com.queuelesscampus.dto.response.PenaltyResponse;
import com.queuelesscampus.entity.Booking;
import com.queuelesscampus.entity.User;

import java.util.List;

public interface PenaltyService {
    void issueNoShowPenalty(User user, Booking booking);
    List<PenaltyResponse> myPenalties();
}
