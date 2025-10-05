// Main JavaScript functionality
const WHATSAPP_NUMBER = '923459016204';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSamples();
    initializeScrollEffects();
    initializeAnimations();
});

// Smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// WhatsApp ordering function
function orderViaWhatsApp(packageType) {
    const packageNames = {
        'essential': 'Essential Package (PKR 1500)',
        'professional': 'Professional Package (PKR 2500)',
        'business': 'Business Package (PKR 5000/year)'
    };
    
    const message = `Hello! I would like to order the ${packageNames[packageType]} from JK Digital Cards. Please provide me with more details.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Initialize samples gallery
function initializeSamples() {
    const samplesContainer = document.getElementById('samples-container');
    if (!samplesContainer) return;
    
    // This would be populated from your actual sample images
    const samples = [
        {
            name: 'Medical Professional',
            category: 'Healthcare',
            image: 'assets/images/samples/medical-sample.jpg',
            description: 'Clean design for healthcare professionals'
        },
        {
            name: 'Real Estate Agent',
            category: 'Real Estate',
            image: 'assets/images/samples/real-estate-sample.jpg',
            description: 'Professional card for property experts'
        },
        // Add more samples...
    ];
    
    samples.forEach(sample => {
        const sampleElement = createSampleElement(sample);
        samplesContainer.appendChild(sampleElement);
    });
}

function createSampleElement(sample) {
    const div = document.createElement('div');
    div.className = 'sample-item';
    div.innerHTML = `
        <div class="sample-image">
            <img src="${sample.image}" alt="${sample.name}" loading="lazy">
            <div class="sample-overlay">
                <div class="sample-category">${sample.category}</div>
                <h4>${sample.name}</h4>
                <p>${sample.description}</p>
            </div>
        </div>
    `;
    return div;
}

// Header scroll effect
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const backToTop = document.getElementById('backToTop');
        
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.9)';
        }
        
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });
}

// Animation initialization
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
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .package-card, .testimonial-card, .sample-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Start card builder
function startCardBuilder() {
    scrollToSection('card-builder');
    // Additional initialization for card builder
}
// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    // Insert mobile menu toggle button
    navContainer.appendChild(mobileMenuToggle);
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navContainer.contains(e.target) && navLinks.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Add to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    // ... other initialization code
});

/* Prevent body scroll when mobile menu is open */
body.menu-open {
    overflow: hidden;
}

/* Mobile menu toggle button (hidden by default) */
.mobile-menu-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
}

.mobile-menu-toggle span {
    width: 20px;
    height: 2px;
    background: var(--light);
    transition: var(--transition);
}

.mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
}