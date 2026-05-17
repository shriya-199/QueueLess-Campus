package com.queuelesscampus.repository;

import com.queuelesscampus.entity.User;
import com.queuelesscampus.entity.Waitlist;
import com.queuelesscampus.enums.WaitlistStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface WaitlistRepository extends JpaRepository<Waitlist, Long> {
    List<Waitlist> findByUserOrderByCreatedAtDesc(User user);
    List<Waitlist> findByFacilityIdAndStatusOrderByPreferredDateAscPreferredStartTimeAscQueuePositionAsc(Long facilityId, WaitlistStatus status);
    List<Waitlist> findByFacilityIdAndPreferredDateAndPreferredStartTimeAndPreferredEndTimeAndStatusOrderByQueuePositionAsc(
            Long facilityId, LocalDate date, LocalTime start, LocalTime end, WaitlistStatus status);
    Optional<Waitlist> findFirstByFacilityIdAndPreferredDateAndPreferredStartTimeAndPreferredEndTimeAndStatusOrderByQueuePositionAsc(
            Long facilityId, LocalDate date, LocalTime start, LocalTime end, WaitlistStatus status);
    boolean existsByUserIdAndFacilityIdAndPreferredDateAndPreferredStartTimeAndPreferredEndTimeAndStatus(
            Long userId, Long facilityId, LocalDate date, LocalTime start, LocalTime end, WaitlistStatus status);
    long countByFacilityIdAndPreferredDateAndPreferredStartTimeAndPreferredEndTimeAndStatus(
            Long facilityId, LocalDate date, LocalTime start, LocalTime end, WaitlistStatus status);
}
