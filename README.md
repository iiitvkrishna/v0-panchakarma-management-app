# HIPAA-Styled Appointment Booking Micro-Site

This is a minimal, HIPAA-styled appointment-booking micro-site built with React, TypeScript, Tailwind CSS (Next.js App Router), shadcn/ui components, Zod + React-Hook-Form validation, and Zustand for client state. It's designed to be deployable on Vercel with zero configuration.

## Features

-   **Two User Types:** Doctor and Patient.
-   **Doctor Profile Management:** Full name, title, avatar, clinic name, timezone, currency, language.
-   **Flexible Availability:** Working hours matrix, split-shift options, black-out dates, slot length, buffer time, lead time.
-   **Booking Policies:** Approval mode, cancellation/reschedule policies, daily booking limits.
-   **Notification Settings:** Email (confirmation, reminder, follow-up), SMS (placeholder), Google Calendar sync (placeholder), Zoom auto-link.
-   **Patient Booking Flow:** Doctor hero section, calendar month view, time-slot selection, booking form (patient details, reason, optional file upload), summary sidebar, confirmation page (iCal, Google Calendar, Zoom link).
-   **Doctor Dashboard:** Bookings table with actions (confirm, decline, cancel, add note), export CSV, quick black-out calendar.
-   **Technical Standards:** Responsive design (320px to 4K), Dark-mode toggle, Accessibility (WCAG 2.1), Error Boundary, 404 Page, SEO (title, meta, JSON-LD), PWA-ready.

## Getting Started

1.  **Clone the repository:**
    \`\`\`bash
    git clone [repository-url]
    cd hipaa-booking-app
    \`\`\`
2.  **Install dependencies:**
    \`\`\`bash
    npm install
    # or
    yarn install
    \`\`\`
3.  **Run the development server:**
    \`\`\`bash
    npm run dev
    # or
    yarn dev
    \`\`\`
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the patient-facing booking site.
    Navigate to [http://localhost:3000/doctor](http://localhost:3000/doctor) for the doctor dashboard.

## How to Plug in a Real Backend

This micro-site is currently built with mock data and client-side state management (Zustand). To integrate a real backend, you would typically:

1.  **Choose a Backend Technology:** Select a backend framework (e.g., Node.js with Express, Python with Django/Flask, Go, Ruby on Rails) and a database (e.g., PostgreSQL, MongoDB).
2.  **Define API Endpoints:** Create RESTful or GraphQL API endpoints for managing doctors, patients, appointments, settings, and file uploads.
3.  **Replace Mock Data:** Update the components (e.g., `DoctorProfileSettings`, `BookingCalendar`, `BookingsTable`) to fetch and send data to your backend API using `fetch` or a library like `axios` or `SWR`.
4.  **Implement Authentication:** Secure your API endpoints and implement user authentication (e.g., JWT, OAuth) for both doctor and patient logins.
5.  **Server-Side Logic:** Move complex logic (e.g., time slot generation, booking validation, email sending, calendar sync) from the client to the server.
6.  **Environment Variables:** Use environment variables (e.g., `NEXT_PUBLIC_API_URL`, `DATABASE_URL`, `SENDGRID_API_KEY`) to configure your backend connection and external services.
7.  **Deployment:** Deploy your backend alongside your Next.js frontend (e.g., on Vercel for the frontend, and a separate server/serverless platform for the backend).

This project provides a solid frontend foundation, allowing you to focus on building out your robust backend services.
