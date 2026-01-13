/**
 * Utility Functions for LMS Platform
 * Common helpers for toasts, loading states, and UI interactions
 */

const UIUtils = {
    /**
     * Show a toast notification
     * @param {string} message - Message to display
     * @param {string} type - 'success', 'error', 'info', 'warning'
     * @param {number} duration - Duration in ms (default 3000)
     */
    showToast: (message, type = 'info', duration = 3000) => {
        // Create toast container if it doesn't exist
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed top-20 right-4 z-toast';
            container.style.zIndex = '9999';
            document.body.appendChild(container);
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} animate-fade-in`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');

        const iconMap = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };

        toast.innerHTML = `
            <div class="flex items-center gap-3 bg-white shadow-lg rounded-lg p-4 border-l-4 border-${type}">
                <i class="fas fa-${iconMap[type]} text-${type} text-xl"></i>
                <span class="text-gray-800">${message}</span>
                <button class="ml-auto text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        container.appendChild(toast);

        // Auto dismiss
        setTimeout(() => {
            toast.classList.add('animate-fade-out');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    /**
     * Show loading state on a button
     * @param {HTMLElement} button - Button element
     * @param {boolean} loading - True to show loading, false to hide
     */
    setButtonLoading: (button, loading) => {
        if (loading) {
            button.dataset.originalText = button.innerHTML;
            button.disabled = true;
            button.innerHTML = `
                <span class="spinner mr-2"></span>
                Loading...
            `;
        } else {
            button.disabled = false;
            button.innerHTML = button.dataset.originalText || 'Submit';
        }
    },

    /**
     * Debounce function to limit rate of function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     */
    debounce: (func, wait = 300) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Show a confirmation dialog
     * @param {string} message - Confirmation message
     * @param {Function} onConfirm - Callback if confirmed
     */
    confirm: (message, onConfirm) => {
        if (window.confirm(message)) {
            onConfirm();
        }
    },

    /**
     * Sanitize HTML to prevent XSS
     * @param {string} html - HTML string to sanitize
     * @returns {string} - Sanitized HTML
     */
    sanitizeHTML: (html) => {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    },

    /**
     * Format date to readable string
     * @param {Date|string} date - Date to format
     * @returns {string} - Formatted date string
     */
    formatDate: (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIUtils;
}
