// Function to apply the selected theme
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

// Function to toggle between light and dark mode
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
}

// Function to create and inject the theme switcher
function createThemeSwitcher() {
    const desktopSwitcherContainer = document.querySelector('nav .theme-switcher');
    const mobileSwitcherContainer = document.querySelector('#mobile-menu .theme-switcher-mobile');

    if (!desktopSwitcherContainer && !mobileSwitcherContainer) {
        // If containers are not found, defer execution
        setTimeout(createThemeSwitcher, 100);
        return;
    }

    const buttonHtml = '<button class="btn btn-outline-primary btn-sm"><i class="fas fa-moon"></i><i class="fas fa-sun"></i> <span>Toggle Theme</span></button>';

    if (desktopSwitcherContainer) {
        desktopSwitcherContainer.innerHTML = buttonHtml;
        desktopSwitcherContainer.querySelector('button').addEventListener('click', toggleTheme);
    }

    if (mobileSwitcherContainer) {
        mobileSwitcherContainer.innerHTML = buttonHtml;
        mobileSwitcherContainer.querySelector('button').addEventListener('click', toggleTheme);
    }


    // Apply the saved theme on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
}

// Inject the theme switcher when the DOM is ready
document.addEventListener('DOMContentLoaded', createThemeSwitcher);
