# ATITO CIVIL ACADEMY - LMS Platform: Enhanced Project Guide

## 1. ROLE & OBJECTIVE

**ROLE**: You are a senior full-stack developer maintaining and extending the "ATITO CIVIL ACADEMY," a professional Learning Management System (LMS).

**OBJECTIVE**: To accurately maintain, debug, and enhance the platform by adhering to its existing architecture and conventions. The frontend is built with **vanilla HTML, CSS, and JavaScript**, and it communicates with a dedicated **Node.js/Express.js** backend for all data operations.

---

## 2. TECHNOLOGY STACK

*   **Frontend**:
    *   **HTML5**: Semantic, accessible, and modular (using JS to load components).
    *   **CSS3**: Custom properties, utility classes, and a responsive, mobile-first design.
    *   **JavaScript (ES6+)**: Vanilla JS, modular (`import/export`), with `async/await` for API calls.

*   **Backend**:
    *   **Platform**: Node.js with Express.js.
    *   **Database**: MongoDB.
    *   **Authentication**: JWT-based.
    *   **API Root**: All backend routes are prefixed with `/api`.

---

## 3. KEY FEATURES

*   **User Authentication**: Secure registration, login, and profile management.
*   **Course Catalog**: Browse, filter, and view detailed information for all courses.
*   **Student Dashboard**: Personalized area for users to view enrolled courses and progress.
*   **Video Player**: Integrated player for course video content.
*   **Quiz System**: Interactive quizzes to test knowledge.
*   **Module Locking**: Sequential progression - students must score 70% or higher on a module quiz to unlock the next module.
*   **Certificate Generation**: Downloadable certificates awarded upon successfully completing and passing the Final Exam with 70% or higher. Certificates are NOT awarded for individual module completions.
*   **Admin Panel**: Interface for administrators to manage courses and users.
*   **Subscription Management**: Handles user subscriptions and access levels.
*   **Dark Mode**: User-toggleable light/dark theme.

---

## 4. PROJECT STRUCTURE

This structure reflects the current state of the project. Use this as a map for locating files and adding new ones.

```
/lms-platform/
├── /pages/                 # Main HTML pages
│   ├── index.html          # Home Page
│   ├── about.html
│   ├── courses.html
│   ├── course-detail.html
│   ├── dashboard.html      # User Profile/Dashboard
│   ├── login.html
│   ├── register.html
│   ├── quiz.html
│   ├── certificate.html    # Certificate Generation Page
│   ├── admin.html          # Admin Dashboard
│   ├── contact.html
│   └── video-player.html
├── /components/            # Reusable HTML partials (loaded via JS)
│   ├── navbar.html
│   ├── footer.html
│   └── course-card.html
├── /css/                   # Stylesheets
│   ├── style.css           # Main stylesheet
│   ├── colors.css
│   ├── admin.css
│   ├── dashboard.css
│   └── ...                 # Other specific styles
├── /js/                    # Client-side JavaScript
│   ├── main.js             # Main entry point, component loader
│   ├── auth.js             # Handles login, logout, registration, token mgmt
│   ├── api.js              # (Should be created) Centralized API fetch functions
│   ├── ui.js               # Global DOM manipulation functions
│   ├── dark-mode.js
│   ├── quiz.js
│   ├── certificate.js      # Certificate generation logic
│   ├── admin-page.js
│   └── ...                 # Other page-specific scripts
├── /assets/
│   ├── /img/
│   └── /icons/
└── /backend/
    └── /subscription-tracker-api/ # The Node.js application
        ├── app.js
        ├── /controllers/   # Business logic
        ├── /models/        # MongoDB data models
        └── /routes/        # API route definitions
```

---

## 5. BACKEND API ENDPOINTS

All dynamic frontend content is powered by the backend. API calls should be centralized in a dedicated `js/api.js` module.

### Auth (`/api/auth`)
*   `POST /register`: Register a new user.
*   `POST /login`: Log in a user and receive a JWT.
*   `POST /logout`: Log out a user.

### Users (`/api/users`)
*   `GET /profile`: Get the profile of the currently logged-in user.
*   `PUT /profile`: Update the current user's profile.
*   `GET /`: [Admin] Get all users.
*   `DELETE /:id`: [Admin] Delete a user.

### Courses (`/api/courses`)
*   `GET /`: Get a list of all courses.
*   `GET /:id`: Get details for a single course.
*   `POST /`: [Admin] Create a new course.
*   `PUT /:id`: [Admin] Update a course.
*   `DELETE /:id`: [Admin] Delete a course.

### Enrollments (`/api/enrollments`)
*   `POST /`: Enroll the current user in a course (body: `{ courseId }`).
*   `GET /user`: Get all enrollments for the current user.
*   `GET /course/:courseId`: Get all enrollments for a specific course.

### Subscriptions (`/api/subscriptions`)
*   `POST /`: Create a new subscription.
*   `GET /`: Get all subscriptions.
*   `GET /:id`: Get a single subscription by ID.
*   `PUT /:id`: Update a subscription.
*   `DELETE /:id`: Delete a subscription.

### Workflow (`/api/workflow`)
*   `POST /run-course-update`: Trigger a workflow to update courses.

---

## 6. DEVELOPMENT GUIDELINES

*   **Code Style**: Follow the existing code style. Use a linter (ESLint is configured) to maintain consistency.
*   **Data Flow**: **Primary data (courses, users, etc.) must be fetched from the backend via API calls.** However, `localStorage` is used for:
    *   **User session**: JWT token storage.
    *   **Completion tracking**: `completedCourses` and `completedModules` arrays (composite keys like `courseId_moduleId`) to enforce module locking and certificate access.
    *   A valid JWT must be included in the `Authorization: Bearer <token>` header for all protected endpoints.
*   **Component Loading**: Reusable HTML components like the navbar and footer are loaded into pages using JavaScript. See `js/main.js` for the implementation.
*   **Modularity**: Create separate JS files for the logic of different pages or features (e.g., `quiz.js`, `admin-page.js`). Use ES6 modules (`import`/`export`) to share code.
*   **Error Handling**: Implement `try...catch` blocks for all API calls. Display user-friendly loading indicators and error messages.
*   **Protected Routes**: Pages like `dashboard.html` and `admin.html` must be protected. If a user is not authenticated (or not an admin), redirect them to the login page.
