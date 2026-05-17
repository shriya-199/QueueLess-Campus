package com.queuelesscampus.repository;

import com.queuelesscampus.entity.Facility;
import com.queuelesscampus.enums.FacilityStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FacilityRepository extends JpaRepository<Facility, Long> {
    List<Facility> findByStatus(FacilityStatus status);
}
