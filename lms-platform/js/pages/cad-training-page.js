document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('cad-courses-grid');
    const courses = CourseService.getByCategory('CAD');

    if (courses.length > 0) {
        grid.innerHTML = courses.map(course => `
            <div class="course-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                <div class="relative h-48 overflow-hidden">
                    <img src="${course.image}" alt="${course.title}" onerror="this.src='../assets/img/placeholder.svg'" class="course-image w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                </div>
                <div class="p-4 flex-grow flex flex-col">
                    <h3 class="course-title text-xl font-bold mb-2 text-primary line-clamp-2">${course.title}</h3>
                    <p class="course-description text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">${course.description}</p>
                    <a href="course-detail.html?id=${course.id}" class="btn btn-block btn-outline mt-auto">View Curriculum</a>
                </div>
            </div>
        `).join('');
    } else {
        grid.innerHTML = '<p class="text-center col-span-3">No CAD courses available at the moment.</p>';
    }
});