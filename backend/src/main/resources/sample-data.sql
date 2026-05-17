-- Optional manual seed data. The application also seeds these records automatically on first run.
-- Default logins:
-- ADMIN:   admin@campus.com / admin123
-- STUDENT: student@campus.com / student123

INSERT INTO facilities (name, type, description, location, capacity, slot_duration_minutes, opening_time, closing_time, status, created_at, updated_at)
VALUES
('North Block Gym', 'GYM', 'Strength and cardio training zone.', 'North Block, Ground Floor', 8, 60, '06:00:00', '21:00:00', 'ACTIVE', NOW(), NOW()),
('Hostel A Laundry Hub', 'LAUNDRY', 'Washer and dryer slots for hostel students.', 'Hostel A Basement', 4, 45, '07:00:00', '22:00:00', 'ACTIVE', NOW(), NOW()),
('Acoustic Music Room', 'MUSIC_ROOM', 'Practice room with acoustic treatment.', 'Arts Centre, Room 204', 2, 60, '09:00:00', '20:00:00', 'ACTIVE', NOW(), NOW()),
('Innovation Lab 3', 'LAB', 'Prototype lab for electronics and project work.', 'Innovation Centre, Floor 2', 12, 90, '08:00:00', '19:00:00', 'ACTIVE', NOW(), NOW());
