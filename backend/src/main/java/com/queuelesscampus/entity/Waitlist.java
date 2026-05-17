package com.queuelesscampus.entity;

import com.queuelesscampus.enums.WaitlistStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "waitlists", indexes = {
        @Index(name = "idx_waitlist_slot", columnList = "facility_id, preferredDate, preferredStartTime, preferredEndTime")
})
public class Waitlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "facility_id")
    private Facility facility;

    @Column(nullable = false)
    private LocalDate preferredDate;

    @Column(nullable = false)
    private LocalTime preferredStartTime;

    @Column(nullable = false)
    private LocalTime preferredEndTime;

    @Column(nullable = false)
    private int queuePosition;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private WaitlistStatus status;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
