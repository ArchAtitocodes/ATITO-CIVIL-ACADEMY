import { CourseService } from './course-data.js';

document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('courses-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    async function renderCourses(category = 'all') {
        try {
            // Use API data
            let courses = await CourseService.getAll();

            if (category !== 'all') {
                courses = courses.filter(c => c.category === category);
            }

            if (grid) {
                if (courses.length === 0) {
                    grid.innerHTML = '<p class="text-center text-gray-500 col-span-full">No courses found in this category.</p>';
                    return;
                }

                grid.innerHTML = courses.map(course => `
                    <div class="course-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                        <div class="relative h-48 overflow-hidden">
                            <img src="${course.image}" alt="${course.title}" onerror="this.src='../assets/img/placeholder.svg'" class="course-image w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                            <span class="course-category absolute top-2 right-2 bg-secondary text-dark text-xs font-bold px-2 py-1 rounded">${course.category}</span>
                        </div>
                        <div class="p-4 flex-grow flex flex-col">
                            <a href="course-detail.html?id=${course._id || course.id}" class="hover:text-primary transition-colors">
                                <h3 class="course-title text-xl font-bold mb-2 text-primary line-clamp-2">${course.title}</h3>
                            </a>
                            <p class="course-instructor text-sm text-gray-500 mb-2 flex items-center gap-1">
                                <span>👨‍🏫</span> <span>${course.instructor}</span>
                            </p>
                            <p class="course-description text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">${course.description}</p>
                            
                            <div class="border-t pt-3 flex justify-between items-center mt-auto">
                                <div class="flex flex-col">
                                    <span class="course-duration text-xs font-bold text-gray-500 flex items-center gap-1">
                                        <span>⏱️</span> <span>${course.duration}</span>
                                    </span>
                                    <!-- Price is not in local data schema yet, hiding or using placeholder if needed. 
                                         Assuming free or adding a placeholder price for now as per previous UI -->
                                    <span class="course-price text-sm font-bold text-primary mt-1">
                                        Free
                                    </span>
                                </div>
                                <a href="course-detail.html?id=${course._id || course.id}" class="course-link btn btn-sm btn-outline hover:bg-primary hover:text-white text-sm px-3 py-1">View Details</a>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error('Error loading courses:', error);
            if (grid) {
                grid.innerHTML = '<p class="text-center text-red-500 col-span-full">Failed to load courses. Please try again later.</p>';
            }
        }
    }

    // Initial Render
    renderCourses();

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => {
                b.classList.remove('btn-primary', 'text-white');
                b.classList.add('btn-outline');
            });
            // Add active to clicked
            btn.classList.remove('btn-outline');
            btn.classList.add('btn-primary', 'text-white');

            renderCourses(btn.dataset.filter);
        });
    });

    // Set initial active state style manually for the 'All' button
    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) {
        allBtn.classList.remove('btn-outline');
        allBtn.classList.add('btn-primary', 'text-white');
    }
});
