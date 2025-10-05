// main.js
// JK Digital Cards - Main JavaScript Functionality

const CONFIG = {
    WHATSAPP_NUMBER: '923459016204',
    BUSINESS_EMAIL: 'jehangir3life@gmail.com',
    BUSINESS_NAME: 'JK Digital Cards',
    LOADING_DELAY: 1000
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // Show loading screen
        showLoadingScreen();
        
        // Initialize all components
        await Promise.all([
            initializeMobileMenu(),
            initializeScrollEffects(),
            initializeAnimations(),
            initializeStatsCounter(),
            initializeContactForm(),
            initializeSamplesGallery()
        ]);
        
        // Hide loading screen after delay
        setTimeout(() => {
            hideLoadingScreen();
        }, CONFIG.LOADING_DELAY);
        
        console.log('JK Digital Cards initialized successfully');
        
    } catch (error) {
        console.error('Error initializing app:', error);
        hideLoadingScreen();
    }
}

// Loading Screen Functions
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (!mobileMenuToggle || !navLinks) return;

    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking on links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container') && navLinks.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 20;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll Effects
function initializeScrollEffects() {
    const header = document.querySelector('header');
    const backToTop = document.getElementById('backToTop');

    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        // Header background
        if (currentScrollY > 50) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        }

        // Back to top button
        if (backToTop) {
            if (currentScrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }

        // Header hide/show on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Back to top functionality
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Animation Initialization
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('feature-card') || 
                    entry.target.classList.contains('testimonial-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .package-card, .testimonial-card, .sample-item, .trust-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Stats Counter Animation
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    if (statNumbers.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    function updateCounter() {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }

    updateCounter();
}

// Contact Form Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const formDataObj = Object.fromEntries(formData.entries());
        
        // Simple validation
        if (!formDataObj.name || !formDataObj.email || !formDataObj.phone || !formDataObj.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // In a real application, you would send this data to your server
            console.log('Form submitted:', formDataObj);
            
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Samples Gallery
function initializeSamplesGallery() {
    const samplesContainer = document.getElementById('samples-container');
    
    if (!samplesContainer) return;

    // Sample data - replace with your actual samples
    const samples = [
        {
            name: 'Medical Professional',
            category: 'Healthcare',
            image: 'assets/images/samples/medical-sample.jpg',
            description: 'Clean design for doctors and healthcare professionals'
        },
        {
            name: 'Real Estate Agent',
            category: 'Real Estate',
            image: 'assets/images/samples/real-estate-sample.jpg',
            description: 'Professional card for property experts'
        },
        {
            name: 'IT Consultant',
            category: 'Technology',
            image: 'assets/images/samples/tech-sample.jpg',
            description: 'Modern design for tech professionals'
        },
        {
            name: 'Fashion Boutique',
            category: 'Retail',
            image: 'assets/images/samples/fashion-sample.jpg',
            description: 'Elegant design for fashion businesses'
        },
        {
            name: 'Restaurant Owner',
            category: 'Food & Beverage',
            image: 'assets/images/samples/restaurant-sample.jpg',
            description: 'Appetizing design for food businesses'
        },
        {
            name: 'Marketing Agency',
            category: 'Marketing',
            image: 'assets/images/samples/marketing-sample.jpg',
            description: 'Creative design for marketing professionals'
        }
    ];

    samples.forEach((sample, index) => {
        const sampleElement = createSampleElement(sample, index);
        samplesContainer.appendChild(sampleElement);
    });
}

function createSampleElement(sample, index) {
    const div = document.createElement('div');
    div.className = 'sample-item';
    div.style.animationDelay = `${index * 100}ms`;
    
    div.innerHTML = `
        <div class="sample-card">
            <div class="sample-image">
                <div class="sample-placeholder">
                    <i class="fas fa-image"></i>
                    <span>${sample.name}</span>
                </div>
                <div class="sample-overlay">
                    <div class="sample-category">${sample.category}</div>
                    <h4>${sample.name}</h4>
                    <p>${sample.description}</p>
                    <button class="btn btn-outline btn-sm" onclick="viewSample('${sample.name}')">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return div;
}

function viewSample(sampleName) {
    showNotification(`Viewing sample: ${sampleName}`, 'info');
    // In a real implementation, this would open a modal or lightbox
}

// WhatsApp Order Functionality
function orderViaWhatsApp(packageType) {
    const packageInfo = getPackageInfo(packageType);
    
    const message = `Hello! I would like to order the ${packageInfo.name} from JK Digital Cards.

Package: ${packageInfo.name}
Price: ${packageInfo.price}
Features: ${packageInfo.features.join(', ')}

Please provide me with more details and payment information.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Track conversion
    trackConversion('whatsapp_order', packageType);
    
    window.open(whatsappUrl, '_blank');
}

function getPackageInfo(packageType) {
    const packages = {
        'essential': {
            name: 'Essential Package',
            price: 'PKR 1500',
            features: ['Professional Digital Card', 'QR Code Generation', 'WhatsApp Sharing', 'Basic Support']
        },
        'professional': {
            name: 'Professional Package',
            price: 'PKR 2500',
            features: ['Everything in Essential', 'Website & Social Links', 'Google Maps Integration', 'Priority Design', '1 Free Update']
        },
        'business': {
            name: 'Business Package',
            price: 'PKR 5000/year',
            features: ['Everything in Professional', 'Unlimited Updates', 'Advanced Analytics', 'Custom Domain', 'Priority Support']
        }
    };
    
    return packages[packageType] || packages['essential'];
}

// Card Builder Initialization
function startCardBuilder() {
    scrollToSection('card-builder');
    
    // Initialize card builder if not already initialized
    if (typeof CardBuilder === 'function' && !window.cardBuilderInstance) {
        window.cardBuilderInstance = new CardBuilder();
    }
    
    showNotification('Card Builder started! Follow the steps to create your digital card.', 'info');
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--dark);
                border: 1px solid var(--glass-border);
                border-left: 4px solid var(--primary);
                border-radius: var(--radius);
                padding: var(--space-md) var(--space-lg);
                display: flex;
                align-items: center;
                gap: var(--space-md);
                box-shadow: var(--shadow-lg);
                z-index: 10000;
                max-width: 400px;
                animation: slideInRight 0.3s ease;
            }
            
            .notification-success { border-left-color: var(--success); }
            .notification-error { border-left-color: var(--error); }
            .notification-warning { border-left-color: var(--warning); }
            .notification-info { border-left-color: var(--info); }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--gray);
                cursor: pointer;
                padding: var(--space-xs);
                border-radius: var(--radius-sm);
                transition: var(--transition);
            }
            
            .notification-close:hover {
                background: rgba(255,255,255,0.1);
                color: var(--light);
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Utility Functions
function trackConversion(event, data = null) {
    // In a real application, you would send this to Google Analytics or similar
    console.log(`Conversion tracked: ${event}`, data);
}

function simulateCall() {
    showNotification('Call functionality simulated. In a real card, this would dial the number.', 'info');
}

function simulateWhatsApp() {
    showNotification('WhatsApp functionality simulated. In a real card, this would open WhatsApp.', 'info');
}

function simulateEmail() {
    showNotification('Email functionality simulated. In a real card, this would open email client.', 'info');
}

function simulateWebsite() {
    showNotification('Website functionality simulated. In a real card, this would open the website.', 'info');
}

function downloadPreview() {
    showNotification('Preview download functionality would be implemented in production.', 'info');
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    showNotification('Something went wrong. Please try again.', 'error');
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.orderViaWhatsApp = orderViaWhatsApp;
window.startCardBuilder = startCardBuilder;
window.simulateCall = simulateCall;
window.simulateWhatsApp = simulateWhatsApp;
window.simulateEmail = simulateEmail;
window.simulateWebsite = simulateWebsite;
window.downloadPreview = downloadPreview;
window.viewSample = viewSample;
