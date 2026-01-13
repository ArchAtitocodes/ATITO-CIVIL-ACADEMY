/**
 * Main JavaScript File
 * Handles global initializations and dynamic component loading.
 */

document.addEventListener('DOMContentLoaded', () => {
    loadComponents().then(() => {
        checkAuthStatus();
        initNavbar();
        populateFooterCourses();
        applySavedThemeToComponents();
    });
});

/**
 * Loads reusable components (Navbar, Footer) into the page.
 */
async function loadComponents() {
    const components = [
        { id: 'navbar-container', url: '../components/navbar.html' },
        { id: 'footer-container', url: '../components/footer.html' }
    ];

    for (const component of components) {
        const container = document.getElementById(component.id);
        if (container) {
            try {
                const response = await fetch(component.url);
                if (response.ok) {
                    const html = await response.text();
                    container.innerHTML = html;
                } else {
                    console.error(`Failed to load ${component.url}`);
                }
            } catch (error) {
                console.error(`Error loading ${component.url}:`, error);
            }
        }
    }
}

function initNavbar() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('#navbar-container a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPath) && currentPath !== '') {
            link.classList.add('text-primary');
            link.classList.remove('text-gray-600');
        }
    });

    updateAuthUI();
}

function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('user'));
    // No redirect logic here, just checking status.
}

function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem('user'));
    const authLinks = document.getElementById('auth-links');
    const userProfile = document.getElementById('user-profile');

    if (user && authLinks && userProfile) {
        authLinks.classList.add('hidden');
        userProfile.classList.remove('hidden');
        document.getElementById('user-name-display').textContent = user.name;
    }
}

function applySavedThemeToComponents() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

/**
 * Populates the footer with dynamic course links from the COURSES array.
 */
/**
 * Populates the footer with dynamic course links from the API.
 */
async function populateFooterCourses() {
    try {
        // We import CourseData dynamically here if needed, or assume it's available or use api directly
        // Given main.js isn't a module yet in index.html, we might need a workaround or make it a module.
        const response = await fetch('http://localhost:5500/api/v1/courses');
        const result = await response.json();

        if (!result.success) return;

        const footerList = document.getElementById('footer-courses-list');
        if (!footerList) return;

        footerList.innerHTML = ''; // Clear existing content

        result.data.forEach(course => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <a href="../pages/course-detail.html?id=${course._id || course.id}" 
                   class="hover:text-primary transition-colors flex items-center gap-2">
                    <i class="fas fa-chevron-right text-xs"></i> ${course.title}
                </a>
            `;
            footerList.appendChild(listItem);
            footerList.appendChild(document.createElement('br'));
        });
    } catch (error) {
        console.error('Failed to populate footer courses:', error);
    }
}