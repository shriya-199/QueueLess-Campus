package com.queuelesscampus.repository;

import com.queuelesscampus.entity.Notification;
import com.queuelesscampus.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserOrderByCreatedAtDesc(User user);
    long countByUserAndReadStatusFalse(User user);
}
