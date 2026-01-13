document.addEventListener('DOMContentLoaded', () => {
    // Render Courses
    const tbody = document.getElementById('admin-course-list');
    const courses = CourseService.getAll();

    tbody.innerHTML = courses.map(c => `
        <tr class="border-b hover:bg-gray-50">
            <td class="p-3 font-medium">${c.title}</td>
            <td class="p-3"><span class="bg-gray-200 text-xs px-2 py-1 rounded">${c.category}</span></td>
            <td class="p-3">${c.instructor}</td>
            <td class="p-3">
                <button class="text-primary mr-2"><i class="fas fa-edit"></i></button>
                <button class="text-danger"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');

    // Handle Form Submit
    document.getElementById('add-course-form').addEventListener('submit', (e) => {
        e.preventDefault();
        UI.showAlert('Course added successfully (Mock)', 'success');
        document.getElementById('add-course-modal').classList.add('hidden');
    });
});