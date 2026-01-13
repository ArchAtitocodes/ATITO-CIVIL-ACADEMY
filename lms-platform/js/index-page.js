// Index page functionality
function downloadBrochure() {
    UI.showAlert('Brochure download will be available soon!', 'info');
}

// Attach event listener when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-brochure-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            downloadBrochure();
        });
    }
});
