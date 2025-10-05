// pricing-calculator.js
// Handles dynamic price calculations for digital card packages

class PricingCalculator {
    constructor() {
        this.packages = {
            essential: 1500,
            professional: 2500,
            business: 5000
        };
        this.addOns = {
            logoDesign: 500,
            qrCode: 300,
            customDomain: 1000
        };
        this.selectedPackage = 'essential';
        this.selectedAddOns = [];
        this.currency = 'PKR';
        this.init();
    }

    init() {
        this.bindEvents();
        this.updatePriceDisplay();
    }

    bindEvents() {
        // Package selection
        document.querySelectorAll('.package-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectPackage(e.currentTarget.dataset.package);
            });
        });

        // Add-on selection
        document.querySelectorAll('.addon-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const addon = e.target.value;
                if (e.target.checked) {
                    this.selectedAddOns.push(addon);
                } else {
                    this.selectedAddOns = this.selectedAddOns.filter(a => a !== addon);
                }
                this.updatePriceDisplay();
            });
        });
    }

    selectPackage(pkg) {
        this.selectedPackage = pkg;
        document.querySelectorAll('.package-option').forEach(opt => opt.classList.remove('active'));
        document.querySelector(`.package-option[data-package="${pkg}"]`)?.classList.add('active');
        this.updatePriceDisplay();
    }

    calculateTotal() {
        const basePrice = this.packages[this.selectedPackage];
        const addonsPrice = this.selectedAddOns.reduce((sum, addon) => sum + this.addOns[addon], 0);
        return basePrice + addonsPrice;
    }

    updatePriceDisplay() {
        const total = this.calculateTotal();
        const displayElement = document.getElementById('total-price');
        if (displayElement) {
            displayElement.textContent = `${this.currency} ${total.toLocaleString()}`;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    new PricingCalculator();
});
