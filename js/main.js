// JK Digital Cards - Main Script
const WHATSAPP_NUMBER = '923459016204';

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    initializeSamples();
    initializeScrollEffects();
    initializeAnimations();
    initializeMobileMenu();
});

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// WhatsApp ordering
function orderViaWhatsApp(packageType) {
    const packageNames = {
        essential: 'Essential Package (PKR 1500)',
        professional: 'Professional Package (PKR 2500)',
        business: 'Business Package (PKR 5000/year)'
    };

    const message = `Hello! I would like to order the ${packageNames[packageType]} from JK Digital Cards. Please provide me with more details.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

// Load work samples dynamically
function initializeSamples() {
    const samplesContainer = document.getElementById('samples-container');
    if (!samplesContainer) return;

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
        {
            name: 'Freelancer Portfolio',
            category: 'Creative',
            image: 'assets/images/samples/freelancer-sample.jpg',
            description: 'Modern design for online professionals'
        }
    ];

    samples.forEach(sample => {
        const sampleElement = document.createElement('div');
        sampleElement.className = 'sample-item';
        sampleElement.innerHTML = `
            <div class="sample-image">
                <img src="${sample.image}" alt="${sample.name}" loading="lazy">
                <div class="sample-overlay">
                    <div class="sample-category">${sample.category}</div>
                    <h4>${sample.name}</h4>
                    <p>${sample.description}</p>
                </div>
            </div>
        `;
        samplesContainer.appendChild(sampleElement);
    });
}

// Header scroll and back-to-top effect
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Animation effects on scroll
function initializeAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .package-card, .testimonial-card, .sample-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Scroll to card builder section
function startCardBuilder() {
    scrollToSection('card-builder');
}

// Mobile menu toggle
function initializeMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');

    if (!navContainer || !navLinks) return;

    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    navContainer.insertBefore(mobileMenuToggle, navContainer.firstChild);

    // Toggle open/close
    mobileMenuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}
