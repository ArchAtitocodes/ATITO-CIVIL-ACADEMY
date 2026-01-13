# Developer Guide

This guide is intended for developers who want to contribute to the Atito Civil Academy LMS or understand its internal workings.

## 🛠️ Prerequisites

-   **Web Browser**: Latest version of Chrome, Firefox, or Edge.
-   **Code Editor**: VS Code (recommended) or any text editor.
-   **Git**: For version control.
-   **Live Server**: A local development server is recommended (e.g., "Live Server" extension for VS Code) to avoid CORS issues with local file access.

## 🚀 Getting Started

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/lms-platform.git
    cd lms-platform
    ```

2.  **Run Locally**
    -   Open the folder in VS Code.
    -   Right-click `index.html` and select "Open with Live Server".
    -   The app should launch at `http://127.0.0.1:5500/index.html`.

## 📂 Project Structure

```
lms-platform/
├── assets/                 # Static media files
│   ├── img/                # Images and icons
│   └── videos/             # Demo course videos
├── css/                    # Stylesheets
│   ├── style.css           # Global variables & reset
│   ├── utils.css           # Utility classes
│   ├── navbar.css          # Navigation component
│   └── pages/              # Page-specific styles (dashboard.css, etc.)
├── js/                     # JavaScript Logic
│   ├── auth.js             # Authentication service
│   ├── course-data.js      # Static course database
│   ├── quiz-data.js        # Static quiz database
│   ├── certificate.js      # Certificate generation logic (jsPDF)
│   ├── ui.js               # UI helpers (Toast, Modal)
│   └── pages/              # Page-specific logic
├── pages/                  # HTML Views
│   ├── dashboard.html
│   ├── courses.html
│   └── ...
├── docs/                   # Documentation
└── index.html              # Landing Page
```

## 👩‍💻 How-To Guides

### 1. How to Add a New Course
Courses are defined in `js/course-data.js`. To add a new course, append a new object to the `COURSES` array.

**Template:**
```javascript
{
    id: 'c_unique_id',
    title: 'New Course Title',
    category: 'Category Name', // e.g., 'Construction', 'BIM'
    skillLevel: 'Beginner',
    shortDescription: 'One-line summary',
    description: 'Full detailed description...',
    image: '../assets/img/placeholder.svg',
    instructor: 'Instructor Name',
    duration: 'X Weeks',
    modules: [
        {
            id: 'm1',
            title: 'Module 1',
            lessons: [
                { id: 'l1', title: 'Lesson 1', videoUrl: '...', duration: '10:00' }
            ]
        }
    ]
}
```

### 2. How to Add a Quiz
Quizzes are linked to courses via the Course ID in `js/quiz-data.js`.

**Template:**
```javascript
'c_unique_id': {
    title: 'Course Title Assessment',
    questions: [
        {
            id: 1,
            question: 'What is...?',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: 0 // Index of the correct option (0-3)
        }
    ]
}
```

### 3. Quiz & Progression Logic
-   **Module Locking**: `course-detail-page.js` checks `user.completedModules` before rendering module lists. If the previous module is missing, the current one is rendered as locked.
-   **Pass Mark**: Hardcoded as **70%** in `js/quiz.js`.
-   **Persistence**: Completion is saved to `localStorage` upon successful quiz submission.

### 4. How to Customize Certificates
Certificate generation logic is handled in `js/certificate.js`.
-   **Libraries**: Uses `jspdf` for PDF creation.
-   **Customization**: You can adjust fonts, colors, and layout within the `generateCertificate` function.
-   **Access Control**: Certificates are only accessible after passing the final exam (>= 70%). Module quiz completions do not trigger certificate generation.

### 4. How to Modify Styles
-   **Global Colors**: Edit the `:root` variables in `css/style.css`.
-   **New Components**: Create a new CSS file in `css/` and link it in the relevant HTML files.

## 🧪 Testing
Currently, testing is manual.
1.  **Auth**: Register a new user, login, and logout.
2.  **Enrollment**: Enroll in a new course and verify it appears on the Dashboard.
3.  **Progress**: Watch a video and ensure the progress bar updates.

## 🤝 Contribution Workflow
1.  Create a feature branch (`git checkout -b feature/amazing-feature`).
2.  Commit your changes.
3.  Push to the branch.
4.  Open a Pull Request.
