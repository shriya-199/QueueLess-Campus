package com.queuelesscampus.repository;

import com.queuelesscampus.entity.Penalty;
import com.queuelesscampus.entity.User;
import com.queuelesscampus.enums.PenaltyStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PenaltyRepository extends JpaRepository<Penalty, Long> {
    List<Penalty> findByUserOrderByIssuedAtDesc(User user);
    int countByUserAndStatus(User user, PenaltyStatus status);
}
