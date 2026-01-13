/**
 * Form Validation Utilities
 * Reusable validation functions for forms across the platform
 */

const Validation = {
    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} - True if valid
     */
    isValidEmail: (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @returns {Object} - {valid: boolean, message: string, strength: number}
     */
    validatePassword: (password) => {
        const result = {
            valid: false,
            message: '',
            strength: 0
        };

        if (password.length < 8) {
            result.message = 'Password must be at least 8 characters';
            return result;
        }

        let strength = 0;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        result.strength = strength;
        result.valid = strength >= 3;

        if (strength < 3) {
            result.message = 'Password should include uppercase, lowercase, numbers, and special characters';
        } else {
            result.message = strength >= 4 ? 'Strong password' : 'Good password';
        }

        return result;
    },

    /**
     * Validate required field
     * @param {string} value - Value to validate
     * @returns {boolean} - True if not empty
     */
    isRequired: (value) => {
        return value !== null && value !== undefined && value.trim() !== '';
    },

    /**
     * Show validation error on a form field
     * @param {HTMLElement} field - Input field element
     * @param {string} message - Error message
     */
    showError: (field, message) => {
        // Remove existing error
        Validation.clearError(field);

        // Add error class
        field.classList.add('is-invalid');
        field.setAttribute('aria-invalid', 'true');

        // Create error element
        const error = document.createElement('div');
        error.className = 'invalid-feedback';
        error.textContent = message;
        error.setAttribute('role', 'alert');

        field.parentElement.appendChild(error);

        // Announce to screen readers
        field.setAttribute('aria-describedby', error.id);
    },

    /**
     * Clear validation error from a form field
     * @param {HTMLElement} field - Input field element
     */
    clearError: (field) => {
        field.classList.remove('is-invalid');
        field.removeAttribute('aria-invalid');

        const error = field.parentElement.querySelector('.invalid-feedback');
        if (error) {
            error.remove();
        }
    },

    /**
     * Validate entire form
     * @param {HTMLFormElement} form - Form element to validate
     * @param {Object} rules - Validation rules {fieldName: 'required|email', ...}
     * @returns {boolean} - True if all fields valid
     */
    validateForm: (form, rules) => {
        let isValid = true;

        for (const [fieldName, rule] of Object.entries(rules)) {
            const field = form.elements[fieldName];
            if (!field) continue;

            const value = field.value;
            const validationRules = rule.split('|');

            for (const validationRule of validationRules) {
                if (validationRule === 'required' && !Validation.isRequired(value)) {
                    Validation.showError(field, 'This field is required');
                    isValid = false;
                    break;
                } else if (validationRule === 'email' && !Validation.isValidEmail(value)) {
                    Validation.showError(field, 'Please enter a valid email address');
                    isValid = false;
                    break;
                } else if (validationRule.startsWith('min:')) {
                    const min = parseInt(validationRule.split(':')[1]);
                    if (value.length < min) {
                        Validation.showError(field, `Minimum ${min} characters required`);
                        isValid = false;
                        break;
                    }
                } else if (validationRule === 'password' && !Validation.validatePassword(value).valid) {
                    const result = Validation.validatePassword(value);
                    Validation.showError(field, result.message);
                    isValid = false;
                    break;
                }
            }

            if (isValid) {
                Validation.clearError(field);
            }
        }

        return isValid;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Validation;
}
