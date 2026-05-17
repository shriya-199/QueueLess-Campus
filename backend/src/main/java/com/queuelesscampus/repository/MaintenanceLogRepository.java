package com.queuelesscampus.repository;

import com.queuelesscampus.entity.MaintenanceLog;
import com.queuelesscampus.enums.MaintenanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collection;
import java.util.List;

public interface MaintenanceLogRepository extends JpaRepository<MaintenanceLog, Long> {
    List<MaintenanceLog> findByFacilityIdOrderByCreatedAtDesc(Long facilityId);

    @Query("""
            select count(m) > 0 from MaintenanceLog m
            where m.facility.id = :facilityId
              and m.status in :statuses
              and m.startDate <= :date
              and m.endDate >= :date
              and (m.startTime is null or m.endTime is null or (m.startTime < :endTime and m.endTime > :startTime))
            """)
    boolean existsBlockingMaintenance(@Param("facilityId") Long facilityId,
                                      @Param("date") LocalDate date,
                                      @Param("startTime") LocalTime startTime,
                                      @Param("endTime") LocalTime endTime,
                                      @Param("statuses") Collection<MaintenanceStatus> statuses);
}
