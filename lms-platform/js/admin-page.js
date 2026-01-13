// Admin page functionality
import Auth from './auth.js';
import { CourseService } from './course-data.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Check if admin
    const user = await Auth.getCurrentUser();
    if (!user || user.role !== 'admin') {
        window.location.href = 'dashboard.html';
        return;
    }

    document.getElementById('admin-user-display').textContent = user.name;
    document.getElementById('admin-avatar').textContent = user.name.charAt(0);

    // Initial load
    await loadCourses();

    // Render Courses
    async function loadCourses() {
        const tbody = document.getElementById('admin-course-list');
        const courses = await CourseService.getAll();

        document.getElementById('active-courses-count').textContent = courses.length;

        tbody.innerHTML = courses.map(c => `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-3 font-medium">${c.title}</td>
                <td class="p-3"><span class="bg-gray-200 text-xs px-2 py-1 rounded">${c.category}</span></td>
                <td class="p-3">${c.instructor}</td>
                <td class="p-3">
                    <button class="text-primary mr-2 edit-course" data-id="${c._id || c.id}"><i class="fas fa-edit"></i></button>
                    <button class="text-danger delete-course" data-id="${c._id || c.id}"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    // Modal handlers
    const modal = document.getElementById('add-course-modal');
    const showModalBtn = document.getElementById('btn-add-course');
    const cancelBtn = document.getElementById('btn-close-modal');

    if (showModalBtn) {
        showModalBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    // Handle Form Submit
    const addCourseForm = document.getElementById('add-course-form');
    if (addCourseForm) {
        addCourseForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // TODO: Integrate with real course creation API
            alert('Course creation logic integration pending backend route implementation.');
            modal.classList.add('hidden');
        });
    }

    // Logout handler
    const logoutBtn = document.getElementById('admin-logout-link');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await Auth.logout();
            window.location.href = 'login.html';
        });
    }
});
