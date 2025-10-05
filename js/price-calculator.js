// price-calculater.js
// JK Digital Cards - Price Calculator and Package Comparison

class PriceCalculator {
    constructor() {
        this.packages = {
            essential: {
                name: 'Essential',
                price: 1500,
                features: [
                    'Professional Digital Card',
                    'QR Code Generation',
                    'WhatsApp Sharing',
                    'Basic Support',
                    '24h Delivery'
                ],
                popular: false
            },
            professional: {
                name: 'Professional',
                price: 2500,
                features: [
                    'Everything in Essential',
                    'Website & Social Links',
                    'Google Maps Integration',
                    'Priority Design',
                    'Email Support',
                    '1 Free Update',
                    '12h Delivery'
                ],
                popular: true
            },
            business: {
                name: 'Business',
                price: 5000,
                features: [
                    'Everything in Professional',
                    'Unlimited Updates',
                    'Advanced Analytics',
                    'Custom Domain',
                    'Priority Support',
                    'Team Member Cards',
                    '6h Delivery'
                ],
                popular: false,
                yearly: true
            }
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializePackageComparison();
        this.updateCurrencyDisplay();
        
        console.log('Price Calculator initialized');
    }

    bindEvents() {
        // Package selection
        document.addEventListener('change', (e) => {
            if (e.target.name === 'package') {
                this.updateSelectedPackage(e.target.value);
            }
        });

        // Currency toggle (if implemented)
        const currencyToggle = document.getElementById('currency-toggle');
        if (currencyToggle) {
            currencyToggle.addEventListener('change', this.toggleCurrency.bind(this));
        }

        // Bulk order calculator
        this.initializeBulkCalculator();
    }

    initializePackageComparison() {
        const comparisonContainer = document.getElementById('package-comparison');
        if (!comparisonContainer) return;

        let comparisonHTML = `
            <div class="comparison-table">
                <div class="comparison-header">
                    <div class="feature-column">Features</div>
                    <div class="package-column">Essential</div>
                    <div class="package-column popular">Professional</div>
                    <div class="package-column">Business</div>
                </div>
        `;

        // Get all unique features
        const allFeatures = this.getAllFeatures();
        
        allFeatures.forEach(feature => {
            comparisonHTML += `
                <div class="comparison-row">
                    <div class="feature-column">${feature}</div>
                    <div class="package-column">${this.getFeatureStatus('essential', feature)}</div>
                    <div class="package-column popular">${this.getFeatureStatus('professional', feature)}</div>
                    <div class="package-column">${this.getFeatureStatus('business', feature)}</div>
                </div>
            `;
        });

        comparisonHTML += `
                <div class="comparison-footer">
                    <div class="feature-column"></div>
                    <div class="package-column">
                        <div class="price">PKR ${this.packages.essential.price}</div>
                        <button class="btn btn-outline btn-sm" onclick="orderViaWhatsApp('essential')">
                            Select Essential
                        </button>
                    </div>
                    <div class="package-column popular">
                        <div class="price">PKR ${this.packages.professional.price}</div>
                        <button class="btn btn-primary btn-sm" onclick="orderViaWhatsApp('professional')">
                            Select Professional
                        </button>
                    </div>
                    <div class="package-column">
                        <div class="price">PKR ${this.packages.business.price}/year</div>
                        <button class="btn btn-outline btn-sm" onclick="orderViaWhatsApp('business')">
                            Select Business
                        </button>
                    </div>
                </div>
            </div>
        `;

        comparisonContainer.innerHTML = comparisonHTML;
    }

    getAllFeatures() {
        const features = new Set();
        Object.values(this.packages).forEach(pkg => {
            pkg.features.forEach(feature => features.add(feature));
        });
        return Array.from(features).sort();
    }

    getFeatureStatus(packageType, feature) {
        const pkg = this.packages[packageType];
        return pkg.features.includes(feature) ? 
            '<i class="fas fa-check text-success"></i>' : 
            '<i class="fas fa-times text-gray"></i>';
    }

    updateSelectedPackage(packageType) {
        // Update visual selection
        document.querySelectorAll('.package-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        const selectedOption = document.querySelector(`.package-option[data-package="${packageType}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }

        // Update any price displays
        this.updatePriceDisplay(packageType);
    }

    updatePriceDisplay(packageType) {
        const pkg = this.packages[packageType];
        const priceElements = document.querySelectorAll('.calculated-price');
        
        priceElements.forEach(element => {
            if (pkg.yearly) {
                element.textContent = `PKR ${pkg.price}/year`;
                element.nextElementSibling.textContent = 'Yearly subscription';
            } else {
                element.textContent = `PKR ${pkg.price}`;
                element.nextElementSibling.textContent = 'One-time payment';
            }
        });
    }

    initializeBulkCalculator() {
        const bulkCalculator = document.getElementById('bulk-calculator');
        if (!bulkCalculator) return;

        bulkCalculator.innerHTML = `
            <div class="bulk-calc-container">
                <h4><i class="fas fa-users"></i> Bulk Order Calculator</h4>
                <p>Get special discounts for team or company orders</p>
                
                <div class="bulk-inputs">
                    <div class="form-group">
                        <label for="team-size">Number of Team Members</label>
                        <input type="range" id="team-size" min="5" max="50" value="5" step="5">
                        <div class="range-value">
                            <span id="team-size-value">5</span> members
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="package-type">Package Type</label>
                        <select id="package-type" class="form-control">
                            <option value="professional">Professional (PKR 2500 each)</option>
                            <option value="business">Business (PKR 5000/year each)</option>
                        </select>
                    </div>
                </div>
                
                <div class="bulk-results">
                    <div class="result-item">
                        <span>Original Price:</span>
                        <span id="original-price">PKR 12,500</span>
                    </div>
                    <div class="result-item discount">
                        <span>Bulk Discount (20%):</span>
                        <span id="discount-amount">-PKR 2,500</span>
                    </div>
                    <div class="result-item total">
                        <span><strong>Final Price:</strong></span>
                        <span id="final-price"><strong>PKR 10,000</strong></span>
                    </div>
                    <div class="result-item saving">
                        <span>You Save:</span>
                        <span id="saving-amount">PKR 2,500</span>
                    </div>
                </div>
                
                <button class="btn btn-primary" onclick="orderBulkPackage()">
                    <i class="fab fa-whatsapp"></i> Inquire About Bulk Order
                </button>
            </div>
        `;

        // Initialize bulk calculator functionality
        this.initializeBulkCalcFunctionality();
    }

    initializeBulkCalcFunctionality() {
        const teamSizeSlider = document.getElementById('team-size');
        const teamSizeValue = document.getElementById('team-size-value');
        const packageTypeSelect = document.getElementById('package-type');
        
        if (teamSizeSlider && teamSizeValue) {
            teamSizeSlider.addEventListener('input', () => {
                teamSizeValue.textContent = teamSizeSlider.value;
                this.calculateBulkPrice();
            });
        }
        
        if (packageTypeSelect) {
            packageTypeSelect.addEventListener('change', this.calculateBulkPrice.bind(this));
        }
        
        // Initial calculation
        this.calculateBulkPrice();
    }

    calculateBulkPrice() {
        const teamSize = parseInt(document.getElementById('team-size')?.value) || 5;
        const packageType = document.getElementById('package-type')?.value || 'professional';
        
        const basePrice = this.packages[packageType].price;
        const originalPrice = basePrice * teamSize;
        
        // Calculate discount (20% for 5+ members, 25% for 10+, 30% for 20+)
        let discountRate = 0.20;
        if (teamSize >= 20) discountRate = 0.30;
        else if (teamSize >= 10) discountRate = 0.25;
        
        const discountAmount = originalPrice * discountRate;
        const finalPrice = originalPrice - discountAmount;
        
        this.updateBulkResults(originalPrice, discountAmount, finalPrice);
    }

    updateBulkResults(originalPrice, discountAmount, finalPrice) {
        const elements = {
            original: document.getElementById('original-price'),
            discount: document.getElementById('discount-amount'),
            final: document.getElementById('final-price'),
            saving: document.getElementById('saving-amount')
        };
        
        if (elements.original) elements.original.textContent = `PKR ${originalPrice.toLocaleString()}`;
        if (elements.discount) elements.discount.textContent = `-PKR ${discountAmount.toLocaleString()}`;
        if (elements.final) elements.final.innerHTML = `<strong>PKR ${finalPrice.toLocaleString()}</strong>`;
        if (elements.saving) elements.saving.textContent = `PKR ${discountAmount.toLocaleString()}`;
    }

    updateCurrencyDisplay() {
        // This can be extended for multi-currency support
        const currencyElements = document.querySelectorAll('[data-currency]');
        currencyElements.forEach(element => {
            const amount = element.getAttribute('data-currency');
            element.textContent = `PKR ${amount}`;
        });
    }

    toggleCurrency() {
        // Placeholder for currency toggle functionality
        showNotification('Currency toggle would be implemented for international clients', 'info');
    }

    // Method to get package recommendations based on business type
    recommendPackage(businessType, teamSize, requirements = []) {
        const recommendations = {
            'freelancer': 'essential',
            'small-business': 'professional',
            'agency': 'professional',
            'enterprise': 'business',
            'startup': 'professional'
        };
        
        let recommendedPackage = recommendations[businessType] || 'professional';
        
        // Adjust based on team size
        if (teamSize > 10) {
            recommendedPackage = 'business';
        }
        
        // Adjust based on specific requirements
        if (requirements.includes('analytics') || requirements.includes('team-cards')) {
            recommendedPackage = 'business';
        }
        
        return {
            package: recommendedPackage,
            reason: this.getRecommendationReason(recommendedPackage, businessType, teamSize)
        };
    }

    getRecommendationReason(packageType, businessType, teamSize) {
        const reasons = {
            essential: 'Perfect for individual professionals and freelancers',
            professional: 'Ideal for small businesses and growing teams',
            business: 'Best for established businesses with multiple team members'
        };
        
        return reasons[packageType] || 'Recommended based on your business needs';
    }
}

// Bulk order function
function orderBulkPackage() {
    const teamSize = document.getElementById('team-size')?.value || 5;
    const packageType = document.getElementById('package-type')?.value || 'professional';
    const finalPrice = document.getElementById('final-price')?.textContent || 'PKR 10,000';
    
    const message = `Hello! I'm interested in a bulk order for my team.

Team Size: ${teamSize} members
Package: ${packageType === 'professional' ? 'Professional' : 'Business'}
Calculated Price: ${finalPrice}

Please provide me with more details about bulk ordering and payment options.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/923459016204?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Initialize price calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.priceCalculator = new PriceCalculator();
});

// Global function to get package recommendation
window.getPackageRecommendation = function(businessType, teamSize = 1) {
    if (window.priceCalculator) {
        return window.priceCalculator.recommendPackage(businessType, teamSize);
    }
    return { package: 'professional', reason: 'Recommended for most businesses' };
};
