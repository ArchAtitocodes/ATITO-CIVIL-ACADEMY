/**
 * Register Page Functionality
 * Enhanced with validation, password strength checking, and better UX
    */
import Auth from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const submitButton = registerForm.querySelector('button[type="submit"]');

    // Redirect if already logged in
    if (Auth.isAuthenticated()) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Real-time validation
    if (typeof Validation !== 'undefined') {
        // Name validation
        nameInput.addEventListener('blur', () => {
            const name = nameInput.value.trim();
            if (!name) {
                Validation.showError(nameInput, 'Name is required');
            } else if (name.length < 2) {
                Validation.showError(nameInput, 'Name must be at least 2 characters');
            } else {
                Validation.clearError(nameInput);
            }
        });

        // Email validation
        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            if (email && !Validation.isValidEmail(email)) {
                Validation.showError(emailInput, 'Please enter a valid email address');
            } else {
                Validation.clearError(emailInput);
            }
        });

        // Password strength validation
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            if (password) {
                const result = Validation.validatePassword(password);
                if (!result.valid) {
                    Validation.showError(passwordInput, result.message);
                } else {
                    Validation.clearError(passwordInput);
                    // Show strength indicator
                    const strengthText = result.strength >= 4 ? 'Strong' : result.strength >= 3 ? 'Good' : 'Weak';
                    const strengthColor = result.strength >= 4 ? 'success' : result.strength >= 3 ? 'warning' : 'danger';

                    // Could add a visual strength indicator here
                }
            } else {
                Validation.clearError(passwordInput);
            }
        });

        // Confirm password validation
        confirmPasswordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (confirmPassword && password !== confirmPassword) {
                Validation.showError(confirmPasswordInput, 'Passwords do not match');
            } else {
                Validation.clearError(confirmPasswordInput);
            }
        });

        // Clear errors on input
        [nameInput, emailInput].forEach(input => {
            input.addEventListener('input', () => {
                Validation.clearError(input);
            });
        });
    }

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Client-side validation
        let hasError = false;

        if (!name) {
            if (typeof Validation !== 'undefined') {
                Validation.showError(nameInput, 'Name is required');
            }
            hasError = true;
        }

        if (!email || (typeof Validation !== 'undefined' && !Validation.isValidEmail(email))) {
            if (typeof Validation !== 'undefined') {
                Validation.showError(emailInput, 'Please enter a valid email address');
            }
            hasError = true;
        }

        if (!password) {
            if (typeof Validation !== 'undefined') {
                Validation.showError(passwordInput, 'Password is required');
            }
            hasError = true;
        } else if (typeof Validation !== 'undefined') {
            const passwordCheck = Validation.validatePassword(password);
            if (!passwordCheck.valid) {
                Validation.showError(passwordInput, passwordCheck.message);
                hasError = true;
            }
        }

        if (password !== confirmPassword) {
            if (typeof Validation !== 'undefined') {
                Validation.showError(confirmPasswordInput, 'Passwords do not match');
            } else {
                alert('Passwords do not match');
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
            submitButton.textContent = 'Creating account...';
        }

        // Attempt registration
        try {
            const result = await Auth.register(name, email, password);

            if (result.success) {
                // Show success message
                if (typeof UIUtils !== 'undefined') {
                    UIUtils.showToast('Registration successful! Logging you in...', 'success');
                } else if (typeof UI !== 'undefined') {
                    UI.showAlert('Registration successful! Logging you in...', 'success');
                }

                // Auto-login the user
                await Auth.login(email, password);

                // Redirect to dashboard after delay
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                // Show error message
                if (typeof UIUtils !== 'undefined') {
                    UIUtils.showToast(result.message, 'error');
                    UIUtils.setButtonLoading(submitButton, false);
                } else if (typeof UI !== 'undefined') {
                    UI.showAlert(result.message, 'error');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Register';
                }

                // Show error on appropriate field
                if (typeof Validation !== 'undefined') {
                    if (result.message.toLowerCase().includes('email')) {
                        Validation.showError(emailInput, result.message);
                    } else {
                        Validation.showError(nameInput, result.message);
                    }
                }
            }
        } catch (error) {
            console.error('Registration error:', error);

            const errorMsg = 'An unexpected error occurred. Please try again.';
            if (typeof UIUtils !== 'undefined') {
                UIUtils.showToast(errorMsg, 'error');
                UIUtils.setButtonLoading(submitButton, false);
            } else {
                alert(errorMsg);
                submitButton.disabled = false;
                submitButton.textContent = 'Register';
            }
        }
    });

    // Focus first field on load
    nameInput.focus();
});
