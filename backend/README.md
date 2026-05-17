# QueueLess Campus Backend

Spring Boot backend for smart campus facility slot booking and live queue management.

## Package Structure

```text
com.queuelesscampus
├── config
├── controller
├── dto.request
├── dto.response
├── entity
├── enums
├── exception
├── mapper
├── repository
├── security
└── service / service.impl
```

## MySQL Setup

```sql
CREATE DATABASE queueless_campus;
CREATE USER 'queueless_user'@'localhost' IDENTIFIED BY 'queueless_pass';
GRANT ALL PRIVILEGES ON queueless_campus.* TO 'queueless_user'@'localhost';
FLUSH PRIVILEGES;
```

Update `src/main/resources/application.properties` if you use a non-root user.

## Run Commands

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Default URL:

```text
http://localhost:8080
```

Default seeded users:

```text
ADMIN   admin@campus.com   admin123
STUDENT student@campus.com student123
```

## Main API Testing Steps

1. `POST /api/auth/login` as admin and student.
2. Copy the `token` value from the login response.
3. Add header `Authorization: Bearer <token>`.
4. Admin creates or updates facilities through `/api/admin/facilities`.
5. Student checks `/api/facilities/{id}/availability`.
6. Student books through `POST /api/bookings`.
7. Admin approves through `PUT /api/admin/bookings/{id}/approve`.
8. Student cancels through `PUT /api/bookings/{id}/cancel`.
9. Another student can join waitlist through `POST /api/waitlists/join`.
10. Admin marks no-show through `PUT /api/admin/bookings/{id}/mark-no-show`.

## Common Errors and Fixes

`Access denied`:
Use the right role token. Admin routes require `ADMIN`; student routes require `STUDENT`.

`Communications link failure`:
Start MySQL and verify database credentials in `application.properties`.

`Facility slot is full`:
Use `/api/waitlists/join` for the same facility/date/time.

`Slot is outside facility operating hours`:
Check the facility opening and closing time from `GET /api/facilities/{id}`.

`JWT expired`:
Log in again. Development expiry is configured as 24 hours.
