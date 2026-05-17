package com.queuelesscampus.repository;

import com.queuelesscampus.entity.Booking;
import com.queuelesscampus.entity.User;
import com.queuelesscampus.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collection;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserOrderByBookingDateDescStartTimeDesc(User user);
    List<Booking> findByStatusOrderByCreatedAtAsc(BookingStatus status);
    long countByStatus(BookingStatus status);
    long countByFacilityIdAndBookingDateAndStartTimeAndEndTimeAndStatusIn(Long facilityId, LocalDate date, LocalTime start, LocalTime end, Collection<BookingStatus> statuses);

    @Query("""
            select count(b) > 0 from Booking b
            where b.user.id = :userId
              and b.bookingDate = :date
              and b.status in :statuses
              and b.startTime < :endTime
              and b.endTime > :startTime
            """)
    boolean existsUserOverlap(@Param("userId") Long userId,
                              @Param("date") LocalDate date,
                              @Param("startTime") LocalTime startTime,
                              @Param("endTime") LocalTime endTime,
                              @Param("statuses") Collection<BookingStatus> statuses);

    @Query("""
            select b from Booking b
            where b.facility.id = :facilityId
              and b.bookingDate = :date
              and b.status in :statuses
              and b.startTime < :endTime
              and b.endTime > :startTime
            """)
    List<Booking> findFacilityOverlaps(@Param("facilityId") Long facilityId,
                                       @Param("date") LocalDate date,
                                       @Param("startTime") LocalTime startTime,
                                       @Param("endTime") LocalTime endTime,
                                       @Param("statuses") Collection<BookingStatus> statuses);
}
