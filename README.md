# Atito Civil Academy - LMS Platform

A comprehensive Learning Management System (LMS) designed for civil engineering and construction training. This platform offers a seamless experience for students to enroll in courses, track their progress, and take assessments.

## 🚀 Features

-   **User Authentication**: Secure registration and login for students.
-   **Course Catalog**: Browse a wide range of courses in Construction, CAD, BIM, and Structural Engineering.
-   **Interactive Dashboard**: Track enrolled courses, progress, and recent activities.
-   **Video Learning**: Integrated video player for course lessons.
-   **Assessments**: Quizzes to test knowledge and reinforce learning.
-   **Module Locking**: Sequential progression requiring 70% pass mark to unlock next modules.
-   **Certificate Generation**: Download printable certificates upon passing the Final Exam (>70%).
-   **Responsive Design**: Optimized for both desktop and mobile devices.

## 🛠️ Tech Stack

-   **Frontend**: HTML5, CSS3, JavaScript (ES6+)
-   **Data Persistence**: `localStorage` (Client-side persistence for demo purposes)
-   **Styling**: Custom CSS with a focus on modern, clean aesthetics.
-   **Icons**: FontAwesome
-   **PDF Generation**: `jspdf` (for certificates)

## 📂 Project Structure

```
lms-platform/
├── assets/             # Images, videos, and other static assets
├── css/                # Stylesheets (global, pages, components)
├── js/                 # JavaScript logic
│   ├── pages/          # Page-specific scripts
│   ├── auth.js         # Authentication logic
│   ├── course-data.js  # Static course data
│   ├── certificate.js  # Certificate generation logic
│   └── ...
├── pages/              # HTML pages (Dashboard, Courses, Certificate, etc.)
├── docs/               # Detailed documentation
└── index.html          # Landing page
```

## 🏃‍♂️ Getting Started

1.  **Clone the repository** (if applicable) or download the source code.
2.  **Open the project**: Navigate to the `lms-platform` directory.
3.  **Launch**: Open `index.html` in your preferred web browser.

No backend server installation is required for the core functionality as it currently runs entirely on the client side using `localStorage`.

## 📚 Documentation

For more detailed information, please refer to the following guides located in the `docs/` directory:

-   [**Architecture Overview**](docs/ARCHITECTURE.md): Technical details on how the application is structured.
-   [**User Guide**](docs/USER_GUIDE.md): Instructions for students and administrators.
-   [**Developer Guide**](docs/DEVELOPER_GUIDE.md): Setup, project structure, and how-to guides for developers.
-   [**Contributing**](docs/CONTRIBUTING.md): Guidelines for contributing to the project.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

