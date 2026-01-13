document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    const course = CourseService.getById(courseId);

    if (!course) {
        document.querySelector('.container').innerHTML = '<div class="text-center py-5"><h2>Course not found</h2><a href="courses.html" class="btn btn-primary">Back to Courses</a></div>';
        return;
    }

    // Populate Data
    document.title = `${course.title} - ATITO CIVIL ACADEMY`;
    document.getElementById('course-title').textContent = course.title;
    document.getElementById('course-description').textContent = course.description;
    document.getElementById('course-category-badge').textContent = course.category;
    document.getElementById('course-instructor').textContent = course.instructor;
    document.getElementById('course-duration').textContent = course.duration;
    document.getElementById('course-image').src = course.image;
    document.getElementById('course-image').onerror = function () { this.src = '../assets/img/placeholder.svg'; };

    // Render Modules
    const moduleList = document.getElementById('module-list');
    if (course.modules && course.modules.length > 0) {
        moduleList.innerHTML = course.modules.map((mod, index) => `
            <div class="border rounded overflow-hidden">
                <div class="bg-gray-100 p-3 font-bold flex justify-between cursor-pointer module-toggle">
                    <span>Module ${index + 1}: ${mod.title}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="p-3 bg-white module-content hidden">
                    <ul class="space-y-2 mb-4">
                        ${mod.lessons.map(lesson => `
                            <li class="flex justify-between items-center text-sm border-b pb-2 last:border-0">
                                <span><i class="fas fa-play-circle text-primary mr-2"></i> ${lesson.title}</span>
                                <span class="text-gray-500">${lesson.duration}</span>
                            </li>
                        `).join('')}
                    </ul>
                    <div class="text-right">
                        <a href="quiz.html?courseId=${course.id}&moduleId=${mod.id}&type=module" class="btn btn-sm btn-outline-primary">
                            <i class="fas fa-pencil-alt mr-1"></i> Take Module Quiz
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        // Add Final Exam Section
        moduleList.innerHTML += `
            <div class="mt-8 p-5 bg-blue-50 rounded-lg border border-blue-100 text-center">
                <h3 class="text-xl font-bold text-blue-900 mb-2">Course Final Exam</h3>
                <p class="text-blue-700 mb-4 text-sm">Test your knowledge with 50 random questions from the entire course.</p>
                <a href="quiz.html?courseId=${course.id}&type=final" class="btn btn-primary">
                    <i class="fas fa-graduation-cap mr-2"></i> Start Final Exam
                </a>
            </div>
        `;

        // Add event delegation for module toggles
        moduleList.addEventListener('click', (e) => {
            const toggleElement = e.target.closest('.module-toggle');
            if (toggleElement) {
                const contentElement = toggleElement.nextElementSibling;
                if (contentElement && contentElement.classList.contains('module-content')) {
                    contentElement.classList.toggle('hidden');
                }
            }
        });
    } else {
        moduleList.innerHTML = '<p class="text-gray-500">Curriculum details coming soon.</p>';
    }

    // Enroll Button Logic
    document.getElementById('enroll-btn').addEventListener('click', () => {
        if (!Auth.isAuthenticated()) {
            UI.showAlert('Please login to enroll', 'warning');
            setTimeout(() => window.location.href = 'login.html', 1500);
        } else {
            // Enroll User
            const user = Auth.getCurrentUser();
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(u => u.email === user.email);

            if (userIndex !== -1) {
                // Check if already enrolled
                if (!users[userIndex].enrolledCourses) users[userIndex].enrolledCourses = [];

                if (!users[userIndex].enrolledCourses.includes(course.id)) {
                    users[userIndex].enrolledCourses.push(course.id);
                    localStorage.setItem('users', JSON.stringify(users));

                    // Update session user too
                    user.enrolledCourses = users[userIndex].enrolledCourses;
                    localStorage.setItem('user', JSON.stringify(user));

                    UI.showAlert('Enrolled successfully!', 'success');
                } else {
                    UI.showAlert('You are already enrolled.', 'info');
                }
            }

            // Redirect to first lesson
            if (course.modules.length > 0 && course.modules[0].lessons.length > 0) {
                const firstLessonId = course.modules[0].lessons[0].id;
                setTimeout(() => {
                    window.location.href = `video-player.html?courseId=${course.id}&lessonId=${firstLessonId}`;
                }, 1000);
            } else {
                UI.showAlert('This course has no content yet.', 'info');
            }
        }
    });
});