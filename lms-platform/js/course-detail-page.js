// Course detail page functionality
import Auth from './auth.js';
import CourseData from './course-data.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    if (!courseId) {
        window.location.href = 'courses.html';
        return;
    }

    try {
        const course = await CourseData.getCourseById(courseId);

        if (!course) {
            throw new Error('Course not found');
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

        // Render Modules with event delegation for toggle
        const moduleList = document.getElementById('module-list');
        // Check authentication and get completion data
        const user = await Auth.getCurrentUser();

        // Fallback for user data
        const userData = user;
        const completedModules = userData ? (userData.completedModules || []) : [];

        if (course.modules && course.modules.length > 0) {
            moduleList.innerHTML = course.modules.map((mod, index) => {
                // Locking Logic
                let isLocked = false;
                if (index > 0) {
                    const prevModule = course.modules[index - 1];
                    const prevModuleKey = `${courseId}_${prevModule.id}`;
                    if (!completedModules.includes(prevModuleKey)) {
                        isLocked = true;
                    }
                }

                // If locked, render disabled state
                if (isLocked) {
                    return `
                        <div class="border rounded overflow-hidden opacity-60 cursor-not-allowed relative">
                            <div class="bg-gray-200 p-3 font-bold flex justify-between items-center text-gray-500">
                                <span>Module ${index + 1}: ${mod.title}</span>
                                <i class="fas fa-lock"></i>
                            </div>
                            <div class="hidden p-3 bg-white"></div>
                        </div>
                    `;
                }

                return `
                <div class="border rounded overflow-hidden">
                    <div class="bg-gray-100 p-3 font-bold flex justify-between cursor-pointer module-toggle hover:bg-gray-200 transition-colors">
                        <span>Module ${index + 1}: ${mod.title}</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="p-3 bg-white module-content ${index === 0 ? '' : 'hidden'}">
                        <ul class="space-y-2">
                            ${mod.lessons.map(lesson => `
                                <li class="flex justify-between items-center text-sm border-b pb-2 last:border-0 hover:bg-gray-50 p-2 rounded">
                                    <a href="video-player.html?courseId=${courseId}&lessonId=${lesson.id}" class="flex items-center text-gray-700 hover:text-primary w-full">
                                        <i class="fas fa-play-circle text-primary mr-2"></i> ${lesson.title}
                                    </a>
                                    <span class="text-gray-500 text-xs">${lesson.duration}</span>
                                </li>
                            `).join('')}
                            <li class="pt-2 mt-2 border-t">
                                <a href="quiz.html?courseId=${courseId}&moduleId=${mod.id}&type=module" class="btn btn-sm btn-outline-primary w-full text-center block">
                                    <i class="fas fa-question-circle mr-1"></i> Take Module Quiz
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            `}).join('');

            // Add event delegation for module toggles
            moduleList.addEventListener('click', (e) => {
                const toggleElement = e.target.closest('.module-toggle');
                // Ensure we don't toggle locked modules (though UI prevents it, good to be safe)
                if (toggleElement && !toggleElement.parentElement.classList.contains('cursor-not-allowed')) {
                    const contentElement = toggleElement.nextElementSibling;
                    if (contentElement && contentElement.classList.contains('module-content')) {
                        contentElement.classList.toggle('hidden');
                        // Rotate icon
                        const icon = toggleElement.querySelector('.fa-chevron-down');
                        if (icon) {
                            icon.style.transform = contentElement.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
                        }
                    }
                }
            });

        } else {
            moduleList.innerHTML = '<p class="text-gray-500">Curriculum details coming soon.</p>';
        }

        // Enroll Button Logic
        document.getElementById('enroll-btn').addEventListener('click', async () => {
            if (!Auth.isAuthenticated()) {
                UI.showAlert('Please login to enroll', 'warning');
                setTimeout(() => window.location.href = 'login.html', 1500);
            } else {
                // TODO: Integrate with backend enrollment API
                // For now, we'll simulate enrollment locally to keep the flow working
                // untill the Auth system is fully migrated.

                const user = Auth.getCurrentUser();
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = users.findIndex(u => u.email === user.email);

                if (userIndex !== -1) {
                    // Check if already enrolled
                    if (!users[userIndex].enrolledCourses) users[userIndex].enrolledCourses = [];

                    if (!users[userIndex].enrolledCourses.includes(course._id)) {
                        users[userIndex].enrolledCourses.push(course._id);
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
                    // Use index for lesson ID if not present, or generate one
                    // The backend schema doesn't strictly enforce lesson IDs yet, 
                    // but for now we can just redirect to the player.
                    // The player will need to be updated to fetch from backend too.

                    setTimeout(() => {
                        // Passing courseId. The player will need to fetch the course.
                        window.location.href = `video-player.html?courseId=${course._id}`;
                    }, 1000);
                } else {
                    UI.showAlert('This course has no content yet.', 'info');
                }
            }
        });

    } catch (error) {
        console.error('Error loading course details:', error);
        document.querySelector('.container').innerHTML = '<div class="text-center py-5"><h2>Course not found or API error</h2><a href="courses.html" class="btn btn-primary">Back to Courses</a></div>';
    }
});
