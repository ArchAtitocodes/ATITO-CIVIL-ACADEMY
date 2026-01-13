// Page specific script to load featured courses
import { CourseService } from './course-data.js';

document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('featured-courses-grid');
    // const template = document.getElementById('course-card-template'); // Need to load this template first!

    // We need to fetch the template content since it's in a separate file, 
    // BUT main.js loads navbar/footer. We should probably include the template in the page 
    // or load it via JS. For simplicity in this static setup, I'll assume we might need to 
    // manually fetch the template or just build the HTML in JS for this page if the template isn't present.
    // A better approach for this "static" site without a bundler:
    // Let's just fetch the template file or define the render function in UI.js.
    // I'll use a simple render function here for now.

    const allCourses = await CourseService.getAll();
    const courses = allCourses.slice(0, 3);

    // Simple renderer without template for now to ensure it works easily
    if (grid) {
        grid.innerHTML = courses.map(course => `
            <div class="course-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                <div class="relative h-48 overflow-hidden">
                    <img src="${course.image}" alt="${course.title}" onerror="this.src='../assets/img/placeholder.svg'" class="course-image w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                    <span class="course-category absolute top-2 right-2 bg-secondary text-dark text-xs font-bold px-2 py-1 rounded">${course.category}</span>
                </div>
                <div class="p-4 flex-grow flex flex-col">
                    <h3 class="course-title text-xl font-bold mb-2 text-primary line-clamp-2">${course.title}</h3>
                    <p class="course-instructor text-sm text-gray-500 mb-2 flex items-center gap-1">
                        <span>👨‍🏫</span> <span>${course.instructor}</span>
                    </p>
                    <p class="course-description text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">${course.description}</p>
                    
                    <div class="border-t pt-3 flex justify-between items-center mt-auto">
                        <span class="course-duration text-xs font-bold text-gray-500 flex items-center gap-1">
                            <span>⏱️</span> <span>${course.duration}</span>
                        </span>
                        <a href="course-detail.html?id=${course.id}" class="course-link btn btn-sm btn-outline hover:bg-primary hover:text-white text-sm px-3 py-1">View Details</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
});
