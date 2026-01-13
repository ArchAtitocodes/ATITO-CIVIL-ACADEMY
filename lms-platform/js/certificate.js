document.addEventListener('DOMContentLoaded', () => {
    // Get params
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');
    const score = urlParams.get('score');

    // Auth check
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('You must be logged in to view your certificate.');
        window.location.href = '../pages/login.html';
        return;
    }

    // Verify Completion
    if (!user.completedCourses || !user.completedCourses.includes(courseId)) {
        alert('You have not completed this course yet. Please pass the final exam to generate your certificate.');
        window.location.href = 'dashboard.html';
        return;
    }

    // Elements
    const studentNameEl = document.getElementById('student-name');
    const courseNameEl = document.getElementById('course-name');
    const issueDateEl = document.getElementById('issue-date');
    const certIdEl = document.getElementById('cert-id');

    // Populate Data
    studentNameEl.textContent = user.name || "Student Name";

    if (courseId) {
        const course = COURSES.find(c => c.id === courseId);
        if (course) {
            courseNameEl.textContent = course.title;
        } else {
            courseNameEl.textContent = "Unknown Course";
        }
    } else {
        courseNameEl.textContent = "Course Completion";
    }

    // Date
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    issueDateEl.textContent = today.toLocaleDateString('en-US', options);

    // ID Generation (Simple mock)
    const randomId = Math.random().toString(36).substr(2, 9).toUpperCase();
    certIdEl.textContent = `ACA-${today.getFullYear()}-${randomId}`;

    // Security check: simple score validation (in real app, use backend)
    // if (!score || parseInt(score) < 80) {
    //    alert('Invalid certificate request.');
    //    window.location.href = 'index.html';
    // }
});
