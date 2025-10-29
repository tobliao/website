// Contact Form Handler with Validation
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(e);
        });

        // Add real-time validation
        const inputs = this.form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                // Clear error state on input
                input.style.borderColor = '';
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;

        if (!value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        if (fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid email');
                return false;
            }
        }

        if (fieldName === 'message' && value.length < 10) {
            this.showFieldError(field, 'Message should be at least 10 characters');
            return false;
        }

        field.style.borderColor = '#00ff88';
        return true;
    }

    showFieldError(field, message) {
        field.style.borderColor = '#ff4444';
        if (window.verifyNotif) {
            window.verifyNotif.fail(message);
        }
    }

    async handleSubmit(e) {
        const formData = new FormData(this.form);
        const data = {};
        let allValid = true;

        // Validate all fields
        const inputs = this.form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                allValid = false;
            }
            data[input.name] = input.value.trim();
        });

        if (!allValid) {
            if (window.verifyNotif) {
                window.verifyNotif.fail('Please fix all errors before submitting');
            }
            return;
        }

        // Show sending notification
        if (window.verifyNotif) {
            window.verifyNotif.info('Preparing message...');
        }

        // Simulate sending (in real app, this would be an API call)
        setTimeout(() => {
            // Create mailto link with form data
            const subject = encodeURIComponent('Contact from Resume Website');
            const body = encodeURIComponent(
                `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
            );
            const mailtoLink = `mailto:tobliao@cisco.com?subject=${subject}&body=${body}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show success notification
            if (window.verifyNotif) {
                window.verifyNotif.pass('Opening your email client... ✓');
            }

            // Reset form
            this.form.reset();

            // Reset border colors
            inputs.forEach(input => {
                input.style.borderColor = '';
            });
        }, 800);
    }
}

// Initialize contact form when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.contactForm = new ContactForm();
    });
} else {
    window.contactForm = new ContactForm();
}
