document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // For now, just show success message
    UI.showAlert('Thank you for your message! We will get back to you soon.', 'success');
    e.target.reset();

    // TODO: Implement actual form submission to backend
    console.log('Contact form submitted:', data);
});