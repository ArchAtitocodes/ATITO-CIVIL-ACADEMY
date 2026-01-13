 * Enhanced with validation, loading states, and better UX
    */
import Auth from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');

    // Redirect if already logged in
    if (Auth.isAuthenticated()) {
        window.location.href = 'dashboard.html';
        return;
    }
    const passwordInput = document.getElementById('password');
    const submitButton = loginForm.querySelector('button[type="submit"]');

    // Real-time email validation
    if (typeof Validation !== 'undefined') {
        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            if (email && !Validation.isValidEmail(email)) {
                Validation.showError(emailInput, 'Please enter a valid email address');
            } else {
                Validation.clearError(emailInput);
            }
        });

        // Clear error on input
        emailInput.addEventListener('input', () => {
            Validation.clearError(emailInput);
        });

        passwordInput.addEventListener('input', () => {
            Validation.clearError(passwordInput);
        });
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Client-side validation
        let hasError = false;

        if (!email) {
            if (typeof Validation !== 'undefined') {
                Validation.showError(emailInput, 'Email is required');
            }
            hasError = true;
        } else if (typeof Validation !== 'undefined' && !Validation.isValidEmail(email)) {
            Validation.showError(emailInput, 'Please enter a valid email address');
            hasError = true;
        }

        if (!password) {
            if (typeof Validation !== 'undefined') {
                Validation.showError(passwordInput, 'Password is required');
            }
            hasError = true;
        }

        if (hasError) {
            return;
        }

        // Show loading state
        if (typeof UIUtils !== 'undefined') {
            UIUtils.setButtonLoading(submitButton, true);
        } else {
            submitButton.disabled = true;
            submitButton.textContent = 'Logging in...';
        }

        // Attempt login
        try {
            const result = await Auth.login(email, password);

            if (result.success) {
                // Show success message
                if (typeof UIUtils !== 'undefined') {
                    UIUtils.showToast(result.message || 'Login successful!', 'success');
                } else if (typeof UI !== 'undefined') {
                    UI.showAlert(result.message || 'Login successful!', 'success');
                }

                // Redirect based on role
                setTimeout(() => {
                    if (result.user.role === 'admin') {
                        window.location.href = 'admin.html';
                    } else {
                        window.location.href = 'dashboard.html';
                    }
                }, 1000);
            } else {
                // Show error message
                if (typeof UIUtils !== 'undefined') {
                    UIUtils.showToast(result.message, 'error');
                    UIUtils.setButtonLoading(submitButton, false);
                } else if (typeof UI !== 'undefined') {
                    UI.showAlert(result.message, 'error');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Login';
                }

                // Show error on password field
                if (typeof Validation !== 'undefined') {
                    Validation.showError(passwordInput, result.message);
                }
            }
        } catch (error) {
            console.error('Login error:', error);

            const errorMsg = 'An unexpected error occurred. Please try again.';
            if (typeof UIUtils !== 'undefined') {
                UIUtils.showToast(errorMsg, 'error');
                UIUtils.setButtonLoading(submitButton, false);
            } else {
                alert(errorMsg);
                submitButton.disabled = false;
                submitButton.textContent = 'Login';
            }
        }
    });

    // Focus first field on load
    emailInput.focus();
});
