package com.queuelesscampus.controller;

import com.queuelesscampus.dto.request.WaitlistRequest;
import com.queuelesscampus.dto.response.WaitlistResponse;
import com.queuelesscampus.service.WaitlistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/waitlists")
@RequiredArgsConstructor
public class WaitlistController {
    private final WaitlistService waitlistService;

    @PostMapping("/join")
    @ResponseStatus(HttpStatus.CREATED)
    public WaitlistResponse join(@Valid @RequestBody WaitlistRequest request) {
        return waitlistService.joinWaitlist(request);
    }

    @GetMapping("/my")
    public List<WaitlistResponse> my() {
        return waitlistService.myWaitlists();
    }

    @PutMapping("/{id}/cancel")
    public WaitlistResponse cancel(@PathVariable Long id) {
        return waitlistService.cancelWaitlist(id);
    }
}
