# QueueLess Campus

Smart Campus Facility Slot Booking and Live Queue Management System.

QueueLess Campus is a full stack campus utility product where students can book shared facilities, view live availability, join waitlists, receive notifications, and track booking history. Admins can manage facilities, approve or reject bookings, block maintenance windows, monitor queues, issue no-show penalties, and view operational analytics.

This project is designed as a realistic fresher-level placement project with production-style architecture, role-based security, API integration, and a polished responsive UI.

## Features

### Student

- Register and login with JWT authentication.
- Browse campus facilities such as gym, laundry, music room, labs, courts, and study rooms.
- View facility details, capacity, operating hours, and live slot availability.
- Book facility slots with overlap and capacity validation.
- Join waitlists when slots are full.
- Cancel active bookings.
- View booking history with status timeline notes.
- View notifications for booking approval, rejection, cancellation, waitlist promotion, and penalties.
- Update profile and view penalty history.

### Admin

- Secure admin login with role-based access.
- Add, edit, and delete facilities.
- Approve or reject pending bookings.
- Mark approved bookings as no-show and generate penalties.
- Create, complete, or cancel facility maintenance blocks.
- View active waiting queues by facility.
- Dashboard analytics for bookings, users, facilities, approvals, and operational pressure.

### Advanced Logic

- JWT-based authentication and authorization.
- Role-based routing on frontend and backend.
- Booking conflict prevention.
- Facility capacity tracking.
- Maintenance block validation.
- Auto waitlist promotion after cancellation, rejection, or no-show.
- Notification generation across booking lifecycle.
- Responsive dark mode UI.

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Context API
- Lucide React icons

### Backend

- Java 21
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- Hibernate
- Maven
- Lombok

### Database

- MySQL

## Folder Structure

```text
QueueLess Campus/
├── backend/
│   ├── pom.xml
│   ├── postman-collection.json
│   ├── README.md
│   └── src/main/
│       ├── java/com/queuelesscampus/
│       │   ├── config/
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── entity/
│       │   ├── enums/
│       │   ├── exception/
│       │   ├── mapper/
│       │   ├── repository/
│       │   ├── security/
│       │   └── service/
│       └── resources/
│           ├── application.properties
│           └── sample-data.sql
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── README.md
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── routes/
│       └── styles/
│
├── README.md
└── PROJECT_FINAL_GUIDE.md
```

## Sample Test Users

These users are seeded automatically on first backend startup.

| Role | Email | Password |
|---|---|---|
| Admin | `admin@campus.com` | `admin123` |
| Student | `student@campus.com` | `student123` |

## Local Setup

### Prerequisites

- Java 21
- Maven
- Node.js 18 or later
- MySQL 8

### Database Setup

```sql
CREATE DATABASE queueless_campus;
```

Default local backend credentials are:

```text
username: root
password: root
database: queueless_campus
```

Update `backend/src/main/resources/application.properties` if your MySQL username or password is different.

### Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs at:

```text
http://localhost:8080
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Environment Variables

### Backend

For deployment, configure these values:

```text
PORT=8080
SPRING_DATASOURCE_URL=jdbc:mysql://HOST:PORT/DATABASE?useSSL=true&allowPublicKeyRetrieval=true&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME=your_mysql_user
SPRING_DATASOURCE_PASSWORD=your_mysql_password
APP_JWT_SECRET=change_this_to_a_long_secure_secret
APP_JWT_EXPIRATION_MS=86400000
APP_CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

### Frontend

```text
VITE_API_BASE_URL=https://your-backend-domain.onrender.com/api
```

See:

- `backend/.env.example`
- `frontend/.env.example`

## API Documentation

Import the Postman collection:

```text
backend/postman-collection.json
```

### Auth APIs

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Authenticated |

### Facility APIs

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/facilities` | Authenticated |
| GET | `/api/facilities/{id}` | Authenticated |
| GET | `/api/facilities/{id}/availability` | Authenticated |
| POST | `/api/admin/facilities` | Admin |
| PUT | `/api/admin/facilities/{id}` | Admin |
| DELETE | `/api/admin/facilities/{id}` | Admin |

### Booking APIs

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/bookings` | Student |
| GET | `/api/bookings/my` | Student |
| GET | `/api/bookings/{id}` | Owner/Admin |
| PUT | `/api/bookings/{id}/cancel` | Owner/Admin |
| GET | `/api/admin/bookings` | Admin |
| GET | `/api/admin/bookings/pending` | Admin |
| PUT | `/api/admin/bookings/{id}/approve` | Admin |
| PUT | `/api/admin/bookings/{id}/reject` | Admin |
| PUT | `/api/admin/bookings/{id}/mark-no-show` | Admin |

### Waitlist APIs

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/waitlists/join` | Student |
| GET | `/api/waitlists/my` | Student |
| PUT | `/api/waitlists/{id}/cancel` | Student |
| GET | `/api/admin/queues/facilities/{facilityId}` | Admin |

### Notification APIs

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/notifications` | Authenticated |
| GET | `/api/notifications/unread-count` | Authenticated |
| PUT | `/api/notifications/{id}/read` | Authenticated |
| PUT | `/api/notifications/read-all` | Authenticated |

### Maintenance APIs

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/admin/maintenance` | Admin |
| GET | `/api/admin/maintenance` | Admin |
| PUT | `/api/admin/maintenance/{id}/complete` | Admin |
| PUT | `/api/admin/maintenance/{id}/cancel` | Admin |

### Analytics APIs

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/admin/dashboard` | Admin |

## Screenshots

Add screenshots after running the project:

```text
screenshots/
├── landing-page.png
├── student-dashboard.png
├── facility-details.png
├── booking-history.png
├── admin-dashboard.png
├── facility-management.png
├── booking-management.png
└── maintenance-panel.png
```

## Deployment Guide

### MySQL Cloud Setup

Recommended options:

- Railway MySQL
- PlanetScale-compatible MySQL provider
- Aiven MySQL
- AWS RDS MySQL

Steps:

1. Create a MySQL database.
2. Copy host, port, database name, username, and password.
3. Ensure public networking or allowed IP access is enabled.
4. Use the cloud database JDBC URL in backend environment variables.

### Backend Deployment: Render

1. Push project to GitHub.
2. Create a new Render Web Service.
3. Select the GitHub repository.
4. Set root directory:

```text
backend
```

5. Set build command:

```bash
mvn clean package -DskipTests
```

6. Set start command:

```bash
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

7. Add backend environment variables listed above.
8. Deploy and copy the backend URL.

### Backend Deployment: Railway

1. Create a Railway project.
2. Add MySQL service.
3. Add backend service from GitHub.
4. Set root directory to `backend`.
5. Configure variables:

```text
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
APP_JWT_SECRET
APP_CORS_ALLOWED_ORIGINS
```

6. Deploy backend and copy public URL.

### Frontend Deployment: Vercel

1. Import GitHub repository in Vercel.
2. Set root directory:

```text
frontend
```

3. Set build command:

```bash
npm run build
```

4. Set output directory:

```text
dist
```

5. Add environment variable:

```text
VITE_API_BASE_URL=https://your-backend-url/api
```

6. Deploy.
7. Add the Vercel domain to backend CORS.

## GitHub Push Commands

```bash
git init
git add .
git commit -m "Initial full stack QueueLess Campus project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/queueless-campus.git
git push -u origin main
```

Suggested commit sequence:

```text
feat: scaffold Spring Boot backend
feat: add JWT security and role based auth
feat: implement facility booking and waitlist workflows
feat: add admin maintenance and analytics APIs
feat: scaffold React Vite frontend
feat: add student booking experience
feat: add admin dashboard and management pages
docs: add deployment and testing documentation
```

## Resume-Ready Description

QueueLess Campus is a full stack smart campus facility booking system built with React, Spring Boot, JWT, and MySQL. It enables students to book facility slots, check live availability, join waitlists, receive notifications, and manage booking history, while admins can manage facilities, approve bookings, block maintenance, handle queues, issue no-show penalties, and view analytics.

### ATS-Friendly Resume Bullets

- Built a Java full stack campus facility booking platform using Spring Boot, React, MySQL, JWT, and Tailwind CSS.
- Implemented role-based authentication and authorization for Admin and Student users using Spring Security and JWT.
- Designed REST APIs for facilities, bookings, waitlists, notifications, maintenance logs, penalties, and dashboard analytics.
- Developed booking conflict prevention, live capacity tracking, maintenance blocking, and automatic waitlist promotion logic.
- Created a responsive React frontend with protected routes, dark mode, reusable components, Axios API integration, and dashboard UI.
- Added production-focused documentation, environment configuration, Postman API collection, and deployment workflow.

### LinkedIn Project Description

I built **QueueLess Campus**, a Java full stack smart campus utility platform that helps students book shared facilities like gyms, laundry rooms, labs, music rooms, and study spaces without offline queues. The system includes JWT authentication, role-based Admin/Student dashboards, live slot availability, waitlist promotion, maintenance blocking, notifications, penalties, and analytics. Built with React, Tailwind CSS, Spring Boot, Spring Security, JPA/Hibernate, and MySQL.

## Architecture Explanation

The application follows a layered full stack architecture.

```text
React Frontend
    |
Axios API Client with JWT
    |
Spring Boot REST Controllers
    |
Service Layer Business Logic
    |
Spring Data JPA Repositories
    |
MySQL Database
```

Frontend handles UI, routing, authentication state, role-based pages, loading states, and user interactions. Backend handles security, validation, business rules, persistence, notifications, waitlist promotion, and admin operations. MySQL stores normalized relational data for users, facilities, bookings, waitlists, notifications, penalties, and maintenance logs.

## Viva Questions With Answers

**Q: What problem does QueueLess Campus solve?**  
A: It reduces offline crowding and manual coordination for shared campus facilities by allowing students to book slots, check availability, and join queues digitally.

**Q: Why did you use JWT?**  
A: JWT makes the backend stateless. Each request carries a signed token, so Spring Security can authenticate the user and apply role-based access without server-side sessions.

**Q: How is booking conflict prevented?**  
A: The backend checks whether the same student already has an overlapping active booking and whether the facility capacity is already full for the selected slot.

**Q: How does waitlist promotion work?**  
A: When a booking is cancelled, rejected, or marked no-show, the service checks the first waiting user for that facility slot and creates an approved booking for them.

**Q: How does maintenance blocking work?**  
A: Admins create maintenance logs for a facility and date/time range. Booking creation checks those logs and rejects bookings during blocked periods.

**Q: Why did you use layered architecture?**  
A: It separates controllers, services, repositories, entities, and DTOs, which makes the code easier to test, maintain, and extend.

## Interview Questions With Answers

**Q: What are the main entities?**  
A: User, Facility, Booking, Waitlist, Notification, Penalty, and MaintenanceLog.

**Q: How is authorization handled?**  
A: Backend endpoints are protected with Spring Security rules. Admin APIs require `ADMIN`, student APIs require `STUDENT`, and frontend routes also check user role.

**Q: What happens when facility capacity is full?**  
A: The booking API rejects the booking request and the student can join the waitlist for that slot.

**Q: How did you handle errors?**  
A: The backend uses a global exception handler for validation, not found, conflict, unauthorized, and generic errors. The frontend displays friendly toast messages.

**Q: What makes this project different from CRUD?**  
A: It includes real business workflows: slot capacity, overlapping booking prevention, waitlist promotion, maintenance blocking, notifications, penalties, and analytics.

## Challenges Faced

- Designing booking overlap validation across users, facilities, dates, and times.
- Keeping waitlist queue positions meaningful and promoting the next eligible student.
- Separating admin and student workflows cleanly in both frontend and backend.
- Handling maintenance blocks without allowing invalid bookings.
- Creating a UI that feels professional while remaining understandable for a fresher-level project.

## Future Scope

- Email or SMS notification integration.
- QR-based check-in to reduce fake bookings and no-shows.
- Calendar view for facility schedules.
- Recurring bookings for clubs and societies.
- Fine-grained facility access by department, hostel, or year.
- Admin export reports in CSV/PDF.
- WebSocket-based real-time queue updates.

## Testing Checklist

### Backend

- Register new student.
- Login as student and admin.
- Access student route using student token.
- Confirm admin route is blocked for student token.
- Create facility as admin.
- Update facility as admin.
- Delete unused facility as admin.
- Create booking as student.
- Prevent overlapping student booking.
- Prevent booking when capacity is full.
- Prevent booking during maintenance.
- Approve booking as admin.
- Reject booking as admin.
- Cancel booking as student.
- Join waitlist as student.
- Auto-promote waitlist after cancellation.
- Mark no-show and verify penalty.
- Fetch notifications.

### API

- Import Postman collection.
- Save admin token.
- Save student token.
- Test every public endpoint without token.
- Test protected endpoints without token.
- Test protected endpoints with wrong role.
- Test validation errors with missing fields.
- Test conflict errors with overlapping slots.
- Test successful booking lifecycle.

### UI

- Landing page renders on desktop and mobile.
- Login works for admin and student demo accounts.
- Register creates a student account.
- Student cannot open admin pages.
- Admin cannot open student-only pages.
- Facility cards render correctly.
- Facility details availability check works.
- Booking modal validates required fields.
- Booking history shows statuses.
- Notifications page marks read.
- Profile page updates student info.
- Admin facility form creates and edits facilities.
- Admin booking actions update status.
- Queue management loads facility queues.
- Maintenance panel blocks facility.
- Dark mode toggles correctly.
- Layout is responsive on mobile.

## Portfolio Description

QueueLess Campus is a full stack campus utility system that digitizes shared facility booking and live queue management. It includes JWT-secured student and admin dashboards, live slot capacity checks, waitlists, auto-promotion, maintenance blocking, notifications, no-show penalties, and analytics. Built using React, Tailwind CSS, Spring Boot, Spring Security, JPA/Hibernate, and MySQL.

## Elevator Pitch

QueueLess Campus is a smart booking and queue management platform for college facilities. Instead of students waiting offline for gyms, labs, laundry, or study rooms, they can book slots, see live availability, and join waitlists. Admins get tools to approve bookings, manage maintenance, track queues, and analyze facility usage. It demonstrates real full stack engineering with authentication, business logic, database design, and a polished React UI.

## Complete Final Project Execution Flow

1. Start MySQL.
2. Create database:

```sql
CREATE DATABASE queueless_campus;
```

3. Start backend:

```bash
cd backend
mvn spring-boot:run
```

4. Confirm backend:

```text
http://localhost:8080
```

5. Start frontend:

```bash
cd frontend
npm install
npm run dev
```

6. Open frontend:

```text
http://localhost:5173
```

7. Login as admin:

```text
admin@campus.com / admin123
```

8. Login as student:

```text
student@campus.com / student123
```

9. Test APIs using:

```text
backend/postman-collection.json
```

10. Run production checks:

```bash
cd backend
mvn -q -DskipTests package
```

```bash
cd frontend
npm run lint
npm run build
```

