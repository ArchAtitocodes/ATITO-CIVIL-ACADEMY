/**
 * UI Helper Functions
 */

const UI = {
    showAlert: (message, type = 'success') => {
        const div = document.createElement('div');
        div.className = `alert alert-${type} fixed top-4 right-4 p-4 rounded shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
        div.textContent = message;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 3000);
    },

    toggleTab: (tabId, contentId) => {
        // Simple tab switching logic
        document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
        document.getElementById(contentId).classList.remove('hidden');

        document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    }
};
