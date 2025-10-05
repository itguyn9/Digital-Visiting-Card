// Card Builder Functionality
class CardBuilder {
    constructor() {
        this.currentStep = 1;
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
    }

    bindEvents() {
        // Next step buttons
        document.querySelectorAll('.next-step').forEach(button => {
            button.addEventListener('click', (e) => {
                this.nextStep(parseInt(e.target.dataset.next));
            });
        });

        // Previous step buttons
        document.querySelectorAll('.prev-step').forEach(button => {
            button.addEventListener('click', (e) => {
                this.previousStep(parseInt(e.target.dataset.prev));
            });
        });

        // Form input changes
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('input', () => this.updateCardData());
        });

        // Complete order
        document.getElementById('complete-order')?.addEventListener('click', () => {
            this.completeOrder();
        });
    }

    nextStep(step) {
        if (this.validateCurrentStep()) {
            this.hideStep(this.currentStep);
            this.showStep(step);
            this.currentStep = step;
            this.updateStepIndicator();
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
        document.querySelector(`.step[data-step="${this.currentStep}"]`)?.classList.add('active');
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

        this.updateLivePreview();
    }

    updateLivePreview() {
        const preview = document.getElementById('live-card-preview');
        if (!preview) return;

        const { name, title, phone } = this.cardData.personalInfo;
        
        // Update name
        const nameElement = preview.querySelector('#preview-name');
        if (nameElement) nameElement.textContent = name || 'Your Name';
        
        // Update title
        const titleElement = preview.querySelector('#preview-title');
        if (titleElement) titleElement.textContent = title || 'Professional Title';
        
        // Update phone
        const phoneElement = preview.querySelector('#preview-phone');
        if (phoneElement) phoneElement.textContent = phone || '+92 XXX XXXXXXX';
        
        // Update avatar with initials
        const avatar = preview.querySelector('.card-avatar');
        if (avatar) {
            const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'JD';
            avatar.textContent = initials;
        }
    }

    validateCurrentStep() {
        // Add validation logic for each step
        switch (this.currentStep) {
            case 1:
                return this.validatePersonalInfo();
            case 2:
                return this.validateDesign();
            default:
                return true;
        }
    }

    validatePersonalInfo() {
        const name = document.getElementById('name')?.value;
        const phone = document.getElementById('phone')?.value;
        
        if (!name || !phone) {
            alert('Please fill in all required fields (Name and Phone Number)');
            return false;
        }
        return true;
    }

    validateDesign() {
        // Basic design validation
        return true;
    }

    completeOrder() {
        if (this.validateCurrentStep()) {
            const orderData = {
                ...this.cardData,
                timestamp: new Date().toISOString()
            };

            // Send order via WhatsApp
            this.sendOrderViaWhatsApp(orderData);
        }
    }

    sendOrderViaWhatsApp(orderData) {
        const { name, phone, email } = orderData.personalInfo;
        const packageName = this.getPackageName(orderData.package);
        
        const message = `New Digital Card Order:
        
Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}
Package: ${packageName}
        
Design Preferences:
Color: ${orderData.design.color}
Layout: ${orderData.design.layout}

Please proceed with this order.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    }

    getPackageName(packageType) {
        const packages = {
            'essential': 'Essential (PKR 1500)',
            'professional': 'Professional (PKR 2500)',
            'business': 'Business (PKR 5000/year)'
        };
        return packages[packageType] || 'Essential';
    }
}

// Initialize card builder when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new CardBuilder();
});