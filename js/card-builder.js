// card-builder.js
// JK Digital Cards - Interactive Card Builder

class CardBuilder {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.cardData = {
            personalInfo: {},
            design: {},
            package: 'essential'
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateLivePreview();
        this.setupFormValidation();
        
        console.log('Card Builder initialized');
    }

    bindEvents() {
        // Next step buttons
        document.querySelectorAll('.next-step').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextStep(parseInt(e.target.dataset.next));
            });
        });

        // Previous step buttons
        document.querySelectorAll('.prev-step').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.previousStep(parseInt(e.target.dataset.prev));
            });
        });

        // Form input changes
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('input', () => {
                this.updateCardData();
                this.updateLivePreview();
            });
            
            input.addEventListener('change', () => {
                this.updateCardData();
                this.updateLivePreview();
            });
        });

        // Package selection
        document.querySelectorAll('input[name="package"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.cardData.package = e.target.value;
                this.updateReviewSection();
            });
        });

        // Complete order
        const completeOrderBtn = document.getElementById('complete-order');
        if (completeOrderBtn) {
            completeOrderBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.completeOrder();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.type !== 'textarea') {
                e.preventDefault();
                const activeStep = this.currentStep;
                if (activeStep < this.totalSteps) {
                    this.nextStep(activeStep + 1);
                }
            }
        });
    }

    setupFormValidation() {
        const forms = document.querySelectorAll('.builder-form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => e.preventDefault());
        });

        // Real-time validation
        document.getElementById('name')?.addEventListener('blur', this.validateName.bind(this));
        document.getElementById('phone')?.addEventListener('blur', this.validatePhone.bind(this));
        document.getElementById('email')?.addEventListener('blur', this.validateEmail.bind(this));
    }

    validateName() {
        const nameInput = document.getElementById('name');
        const name = nameInput?.value.trim();
        
        if (!name) {
            this.showFieldError(nameInput, 'Name is required');
            return false;
        }
        
        if (name.length < 2) {
            this.showFieldError(nameInput, 'Name must be at least 2 characters');
            return false;
        }
        
        this.clearFieldError(nameInput);
        return true;
    }

    validatePhone() {
        const phoneInput = document.getElementById('phone');
        const phone = phoneInput?.value.trim();
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        
        if (!phone) {
            this.showFieldError(phoneInput, 'Phone number is required');
            return false;
        }
        
        if (!phoneRegex.test(phone)) {
            this.showFieldError(phoneInput, 'Please enter a valid phone number');
            return false;
        }
        
        this.clearFieldError(phoneInput);
        return true;
    }

    validateEmail() {
        const emailInput = document.getElementById('email');
        const email = emailInput?.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            this.showFieldError(emailInput, 'Please enter a valid email address');
            return false;
        }
        
        this.clearFieldError(emailInput);
        return true;
    }

    showFieldError(input, message) {
        this.clearFieldError(input);
        
        input.style.borderColor = 'var(--error)';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: var(--error);
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        input.parentNode.appendChild(errorElement);
    }

    clearFieldError(input) {
        input.style.borderColor = '';
        
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    nextStep(step) {
        if (!this.validateCurrentStep()) {
            return;
        }

        this.hideStep(this.currentStep);
        this.showStep(step);
        this.currentStep = step;
        this.updateStepIndicator();
        
        // Update review section when reaching step 3
        if (step === 3) {
            this.updateReviewSection();
        }
        
        // Scroll to top of builder
        const builderSection = document.getElementById('card-builder');
        if (builderSection) {
            builderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    previousStep(step) {
        this.hideStep(this.currentStep);
        this.showStep(step);
        this.currentStep = step;
        this.updateStepIndicator();
    }

    showStep(step) {
        const stepElement = document.getElementById(`step-${step}`);
        if (stepElement) {
            stepElement.classList.add('active');
        }
    }

    hideStep(step) {
        const stepElement = document.getElementById(`step-${step}`);
        if (stepElement) {
            stepElement.classList.remove('active');
        }
    }

    updateStepIndicator() {
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
        
        const currentStepElement = document.querySelector(`.step[data-step="${this.currentStep}"]`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
    }

    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                return this.validateStep1();
            case 2:
                return this.validateStep2();
            case 3:
                return this.validateStep3();
            default:
                return true;
        }
    }

    validateStep1() {
        const nameValid = this.validateName();
        const phoneValid = this.validatePhone();
        const emailValid = this.validateEmail();
        
        return nameValid && phoneValid && emailValid;
    }

    validateStep2() {
        // Design step is always valid as it has default values
        return true;
    }

    validateStep3() {
        // Review step is always valid
        return true;
    }

    updateCardData() {
        // Update personal info
        this.cardData.personalInfo = {
            name: document.getElementById('name')?.value || '',
            title: document.getElementById('title')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            email: document.getElementById('email')?.value || '',
            website: document.getElementById('website')?.value || ''
        };

        // Update design preferences
        this.cardData.design = {
            color: document.getElementById('color')?.value || 'blue',
            layout: document.getElementById('layout')?.value || 'modern'
        };
    }

    updateLivePreview() {
        const preview = document.getElementById('live-card-preview');
        if (!preview) return;

        const { name, title, phone } = this.cardData.personalInfo;
        
        // Update preview content
        this.updatePreviewElement('preview-name', name || 'Your Name');
        this.updatePreviewElement('preview-title', title || 'Professional Title');
        this.updatePreviewElement('preview-phone', phone || '+92 XXX XXXXXXX');
        
        // Update avatar with initials
        this.updateAvatar(name);
        
        // Update design based on selections
        this.updatePreviewDesign();
    }

    updatePreviewElement(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
        }
    }

    updateAvatar(name) {
        const avatar = document.querySelector('#live-card-preview .card-avatar');
        if (avatar) {
            const initials = name ? 
                name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 
                'JD';
            avatar.textContent = initials;
        }
    }

    updatePreviewDesign() {
        const preview = document.getElementById('live-card-preview');
        if (!preview) return;

        const { color, layout } = this.cardData.design;
        
        // Remove existing color classes
        preview.classList.remove('theme-blue', 'theme-purple', 'theme-green', 'theme-red');
        
        // Add new color class
        preview.classList.add(`theme-${color}`);
        
        // Update layout (you can add more layout variations)
        if (layout === 'minimal') {
            preview.style.padding = '20px';
        } else {
            preview.style.padding = '';
        }
    }

    updateReviewSection() {
        const { name, title, phone, email } = this.cardData.personalInfo;
        const { color, layout } = this.cardData.design;
        
        this.updateReviewElement('review-name', name || 'Not provided');
        this.updateReviewElement('review-title', title || 'Not provided');
        this.updateReviewElement('review-phone', phone || 'Not provided');
        this.updateReviewElement('review-design', `${this.capitalizeFirst(color)} theme, ${layout} layout`);
        
        // Update package selection in radio buttons
        const packageRadio = document.querySelector(`input[name="package"][value="${this.cardData.package}"]`);
        if (packageRadio) {
            packageRadio.checked = true;
        }
    }

    updateReviewElement(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
        }
    }

    capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    completeOrder() {
        if (!this.validateCurrentStep()) {
            showNotification('Please fix the errors before completing your order', 'error');
            return;
        }

        const submitBtn = document.getElementById('complete-order');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Processing...';
        submitBtn.disabled = true;

        // Simulate processing
        setTimeout(() => {
            this.sendOrderViaWhatsApp();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    sendOrderViaWhatsApp() {
        const { name, title, phone, email, website } = this.cardData.personalInfo;
        const { color, layout } = this.cardData.design;
        const packageInfo = this.getPackageInfo(this.cardData.package);
        
        const message = `🚀 *New Digital Card Order - JK Digital Cards*

*Personal Information:*
👤 Name: ${name}
💼 Title: ${title}
📞 Phone: ${phone}
📧 Email: ${email || 'Not provided'}
🌐 Website: ${website || 'Not provided'}

*Design Preferences:*
🎨 Color Theme: ${this.capitalizeFirst(color)}
📐 Layout: ${this.capitalizeFirst(layout)}

*Selected Package:*
📦 ${packageInfo.name}
💰 Price: ${packageInfo.price}

*Order Details:*
🕒 Timestamp: ${new Date().toLocaleString()}
🌍 Timezone: Pakistan Standard Time

Please proceed with this order and provide payment details.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/923459016204?text=${encodedMessage}`;
        
        // Track conversion
        if (typeof trackConversion === 'function') {
            trackConversion('card_builder_order', {
                package: this.cardData.package,
                hasEmail: !!email,
                hasWebsite: !!website
            });
        }
        
        window.open(whatsappUrl, '_blank');
        
        showNotification('Order sent to WhatsApp! We\'ll contact you shortly.', 'success');
    }

    getPackageInfo(packageType) {
        const packages = {
            'essential': {
                name: 'Essential Package',
                price: 'PKR 1500'
            },
            'professional': {
                name: 'Professional Package',
                price: 'PKR 2500'
            },
            'business': {
                name: 'Business Package',
                price: 'PKR 5000/year'
            }
        };
        
        return packages[packageType] || packages['essential'];
    }

    // Utility method to get card data (useful for debugging)
    getCardData() {
        return this.cardData;
    }

    // Method to reset the builder
    reset() {
        this.currentStep = 1;
        this.cardData = {
            personalInfo: {},
            design: {},
            package: 'essential'
        };
        
        // Reset forms
        document.querySelectorAll('.builder-form').forEach(form => form.reset());
        
        // Reset steps
        this.hideStep(this.currentStep);
        this.showStep(1);
        this.updateStepIndicator();
        this.updateLivePreview();
        
        showNotification('Card Builder has been reset', 'info');
    }
}

// Initialize card builder when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Auto-initialize if card builder section exists
    if (document.getElementById('card-builder')) {
        window.cardBuilderInstance = new CardBuilder();
    }
});

// Global function to reset card builder
window.resetCardBuilder = function() {
    if (window.cardBuilderInstance) {
        window.cardBuilderInstance.reset();
    }
};
