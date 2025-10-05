// JK Digital Cards - Card Builder Script
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
                const nextStep = parseInt(e.target.dataset.next);
                this.nextStep(nextStep);
            });
        });

        // Previous step buttons
        document.querySelectorAll('.prev-step').forEach(button => {
            button.addEventListener('click', (e) => {
                const prevStep = parseInt(e.target.dataset.prev);
                this.previousStep(prevStep);
            });
        });

        // Form input changes
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('input', () => this.updateCardData());
        });

        // Package select change
        document.querySelectorAll('input[name="package"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.cardData.package = e.target.value;
            });
        });

        // Complete order
        const completeOrderBtn = document.getElementById('complete-order');
        if (completeOrderBtn) {
            completeOrderBtn.addEventListener('click', () => {
                this.completeOrder();
            });
        }
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
        const activeStep = document.querySelector(`.step[data-step="${this.currentStep}"]`);
        if (activeStep) activeStep.classList.add('active');
    }

    updateCardData() {
        // Update personal info
        this.cardData.personalInfo = {
            name: document.getElementById('name')?.value.trim() || '',
            title: document.getElementById('title')?.value.trim() || '',
            phone: document.getElementById('phone')?.value.trim() || '',
            email: document.getElementById('email')?.value.trim() || '',
            website: document.getElementById('website')?.value.trim() || ''
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

        // Update preview text
        preview.querySelector('#preview-name').textContent = name || 'Your Name';
        preview.querySelector('#preview-title').textContent = title || 'Professional Title';
        preview.querySelector('#preview-phone').textContent = phone || '+92 XXX XXXXXXX';

        // Avatar initials
        const avatar = preview.querySelector('.card-avatar');
        if (avatar) {
            const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'JD';
            avatar.textContent = initials;
        }

        // Change preview color (if applicable)
        const card = preview.querySelector('.card-preview');
        if (card) {
            card.style.borderColor = this.cardData.design.color;
        }
    }

    validateCurrentStep() {
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
        const name = document.getElementById('name')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();

        if (!name || !phone) {
            alert('Please fill in all required fields: Name and Phone Number.');
            return false;
        }
        return true;
    }

    validateDesign() {
        // Always valid for now
        return true;
    }

    completeOrder() {
        if (!this.validateCurrentStep()) return;

        const orderData = {
            ...this.cardData,
            timestamp: new Date().toISOString()
        };

        this.sendOrderViaWhatsApp(orderData);
    }

    sendOrderViaWhatsApp(orderData) {
        const { name, phone, email } = orderData.personalInfo;
        const packageName = this.getPackageName(orderData.package);

        const message = `🪪 *New Digital Card Order*\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📧 Email: ${email || 'Not provided'}\n💼 Package: ${packageName}\n\n🎨 Design:\n• Color: ${orderData.design.color}\n• Layout: ${orderData.design.layout}\n\nPlease proceed with this order.`;

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

// Initialize card builder after DOM loaded
document.addEventListener('DOMContentLoaded', function () {
    new CardBuilder();
});
