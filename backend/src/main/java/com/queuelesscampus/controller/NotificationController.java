package com.queuelesscampus.controller;

import com.queuelesscampus.dto.response.NotificationResponse;
import com.queuelesscampus.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping
    public List<NotificationResponse> all() {
        return notificationService.myNotifications();
    }

    @GetMapping("/unread-count")
    public Map<String, Long> unreadCount() {
        return Map.of("count", notificationService.unreadCount());
    }

    @PutMapping("/{id}/read")
    public NotificationResponse read(@PathVariable Long id) {
        return notificationService.markRead(id);
    }

    @PutMapping("/read-all")
    public void readAll() {
        notificationService.markAllRead();
    }
}
