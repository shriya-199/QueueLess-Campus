package com.queuelesscampus.config;

import com.queuelesscampus.entity.Facility;
import com.queuelesscampus.entity.User;
import com.queuelesscampus.enums.FacilityStatus;
import com.queuelesscampus.enums.FacilityType;
import com.queuelesscampus.enums.UserRole;
import com.queuelesscampus.repository.FacilityRepository;
import com.queuelesscampus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalTime;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {
    private final UserRepository userRepository;
    private final FacilityRepository facilityRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner seedInitialData() {
        return args -> {
            if (!userRepository.existsByEmail("admin@campus.com")) {
                userRepository.save(User.builder()
                        .name("Campus Admin")
                        .email("admin@campus.com")
                        .password(passwordEncoder.encode("admin123"))
                        .role(UserRole.ADMIN)
                        .department("Campus Operations")
                        .active(true)
                        .build());
            }
            if (!userRepository.existsByEmail("student@campus.com")) {
                userRepository.save(User.builder()
                        .name("Aarav Sharma")
                        .email("student@campus.com")
                        .password(passwordEncoder.encode("student123"))
                        .role(UserRole.STUDENT)
                        .department("Computer Science")
                        .studentId("CS2026001")
                        .phone("9876543210")
                        .active(true)
                        .build());
            }
            if (facilityRepository.count() == 0) {
                facilityRepository.saveAll(List.of(
                        Facility.builder().name("North Block Gym").type(FacilityType.GYM).description("Strength and cardio training zone.")
                                .location("North Block, Ground Floor").capacity(8).slotDurationMinutes(60)
                                .openingTime(LocalTime.of(6, 0)).closingTime(LocalTime.of(21, 0)).status(FacilityStatus.ACTIVE).build(),
                        Facility.builder().name("Hostel A Laundry Hub").type(FacilityType.LAUNDRY).description("Washer and dryer slots for hostel students.")
                                .location("Hostel A Basement").capacity(4).slotDurationMinutes(45)
                                .openingTime(LocalTime.of(7, 0)).closingTime(LocalTime.of(22, 0)).status(FacilityStatus.ACTIVE).build(),
                        Facility.builder().name("Acoustic Music Room").type(FacilityType.MUSIC_ROOM).description("Practice room with acoustic treatment.")
                                .location("Arts Centre, Room 204").capacity(2).slotDurationMinutes(60)
                                .openingTime(LocalTime.of(9, 0)).closingTime(LocalTime.of(20, 0)).status(FacilityStatus.ACTIVE).build(),
                        Facility.builder().name("Innovation Lab 3").type(FacilityType.LAB).description("Prototype lab for electronics and project work.")
                                .location("Innovation Centre, Floor 2").capacity(12).slotDurationMinutes(90)
                                .openingTime(LocalTime.of(8, 0)).closingTime(LocalTime.of(19, 0)).status(FacilityStatus.ACTIVE).build()
                ));
            }
        };
    }
}
