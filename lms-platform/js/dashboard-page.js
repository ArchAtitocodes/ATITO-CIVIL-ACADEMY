// Dashboard page functionality
import Auth from './auth.js';
import { CourseService } from './course-data.js';

document.addEventListener('DOMContentLoaded', async () => {
    if (!Auth.isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    const user = await Auth.getCurrentUser();
    if (user) {
        document.getElementById('student-name').textContent = user.name;
    }

    // Render Enrolled Courses
    const enrolledList = document.getElementById('enrolled-courses-list');
    const enrolledCount = document.getElementById('enrolled-count');


    if (user && user.enrolledCourses && user.enrolledCourses.length > 0) {
        enrolledCount.textContent = user.enrolledCourses.length;

        // Use Promise.all to fetch all course details in parallel
        const coursePromises = user.enrolledCourses.map(courseId => CourseService.getById(courseId));
        const courses = await Promise.all(coursePromises);

        enrolledList.innerHTML = courses.filter(c => c !== null).map(course => {
            const progress = Math.floor(Math.random() * 50); // Mock progress
            return `
                <div class="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-4 items-center hover:shadow-lg transition-all">
                    <img src="${course.image}" class="w-full md:w-32 h-20 object-cover rounded" onerror="this.src='../assets/img/placeholder.svg'">
                    <div class="flex-grow">
                        <h4 class="font-bold text-lg">${course.title}</h4>
                        <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-1">
                            <div class="bg-success h-2.5 rounded-full" style="width: ${progress}%"></div>
                        </div>
                        <span class="text-xs text-gray-500">${progress}% Complete</span>
                    </div>
                    <div class="flex gap-2">
                        <a href="course-detail.html?id=${course._id || course.id}" class="btn btn-primary btn-sm">Resume</a>
                        ${user.completedCourses && user.completedCourses.includes(course._id || course.id)
                    ? `<a href="certificate.html?courseId=${course._id || course.id}" class="btn btn-warning btn-sm text-white"><i class="fas fa-certificate"></i> Cert</a>`
                    : `<a href="quiz.html?courseId=${course._id || course.id}&type=final" class="btn btn-outline-primary btn-sm">Final Exam</a>`
                }
                    </div>
                </div>
            `;
        }).join('');
    } else {
        enrolledList.innerHTML = '<div class="bg-white p-5 rounded shadow text-center"><p class="text-gray-500">You have not enrolled in any courses yet.</p><a href="courses.html" class="btn btn-primary mt-3">Browse Courses</a></div>';
    }

    // Logout handler
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            Auth.logout();
        });
    }
});
