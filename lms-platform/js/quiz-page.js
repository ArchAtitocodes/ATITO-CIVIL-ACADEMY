// Quiz page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Check auth
    if (!Auth.isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    // Get course ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId') || 'c1';

    // Render Quiz
    Quiz.render('quiz-container', courseId);
});
