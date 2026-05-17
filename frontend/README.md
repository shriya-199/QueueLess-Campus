# QueueLess Campus Frontend

React + Vite frontend for the QueueLess Campus Spring Boot backend.

## Project Folder Structure

```text
frontend/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── pages/
│   │   ├── admin/
│   │   ├── public/
│   │   └── student/
│   ├── routes/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
```

## Installation Commands

```bash
cd frontend
npm install
```

## Tailwind Setup

Tailwind is configured in `tailwind.config.js`, `postcss.config.js`, and `src/styles/index.css`.

## Axios Setup

Axios is configured in `src/api/axiosConfig.js`.

Default backend API:

```text
http://localhost:8080/api
```

Optional `.env`:

```text
VITE_API_BASE_URL=http://localhost:8080/api
```

## Run Commands

Start backend first:

```bash
cd ../backend
mvn spring-boot:run
```

Start frontend:

```bash
cd ../frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

## Build Commands

```bash
npm run build
npm run preview
```

## Deployment Steps

1. Set `VITE_API_BASE_URL` to the deployed backend URL.
2. Run `npm run build`.
3. Deploy the `dist/` folder to Netlify, Vercel, Firebase Hosting, or Nginx.
4. Configure backend CORS to allow the frontend deployment domain.

## Demo Users

```text
ADMIN   admin@campus.com   admin123
STUDENT student@campus.com student123
```

## Common Frontend Errors and Fixes

`Network Error`:
Start the Spring Boot backend on port `8080`.

`403 Forbidden`:
You are logged in with the wrong role for the route.

`401 Unauthorized`:
Log in again. The token may be missing or expired.

`CORS error`:
Add the frontend origin to `app.cors.allowed-origins` in backend `application.properties`.

`Slot is full`:
Use the waitlist action on the facility details page.
