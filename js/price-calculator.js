/* responsive.css */
/* Mobile First Responsive Design */

/* Extra Small Devices (Phones, 320px and up) */
@media (max-width: 575.98px) {
    .container {
        padding: 0 15px;
    }

    /* Header */
    .nav-container {
        padding: 12px 0;
        flex-wrap: wrap;
    }

    .logo {
        flex: 1;
    }

    .logo-text {
        font-size: 18px;
    }

    .nav-links {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(15, 23, 42, 0.98);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 20px;
        border-top: 1px solid var(--glass-border);
        gap: 15px;
    }

    .nav-links.active {
        display: flex;
    }

    .nav-actions {
        gap: 10px;
    }

    .btn {
        padding: 10px 16px;
        font-size: 14px;
    }

    /* Mobile Menu Toggle */
    .mobile-menu-toggle {
        display: flex;
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

    /* Hero Section */
    .hero {
        padding: 120px 0 60px;
    }

    .hero-content {
        flex-direction: column;
        gap: 40px;
        text-align: center;
    }

    .hero-title {
        font-size: 32px;
        line-height: 1.3;
    }

    .hero-subtitle {
        font-size: 16px;
        max-width: 100%;
    }

    .hero-actions {
        flex-direction: column;
        gap: 12px;
    }

    .hero-stats {
        justify-content: center;
        gap: 20px;
    }

    .stat-number {
        font-size: 28px;
    }

    .card-preview {
        width: 280px;
        transform: rotate(0);
    }

    /* Trust Indicators */
    .trust-indicators {
        gap: 20px;
        margin: 30px 0;
    }

    .trust-item {
        flex: 0 0 calc(50% - 10px);
    }

    /* Card Builder */
    .preview-container {
        flex-direction: column;
        gap: 30px;
    }

    .card-builder {
        padding: 25px 20px;
    }

    .builder-steps {
        gap: 10px;
    }

    .step-label {
        font-size: 12px;
    }

    .form-control {
        font-size: 16px; /* Prevents zoom on iOS */
    }

    .builder-actions {
        flex-direction: column;
        gap: 10px;
    }

    .builder-actions .btn {
        width: 100%;
    }

    .live-preview {
        margin-left: 0;
        text-align: center;
    }

    /* Features */
    .features-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .feature-card {
        padding: 25px 20px;
    }

    .feature-icon {
        width: 50px;
        height: 50px;
        font-size: 20px;
    }

    /* Samples Gallery */
    .samples-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .sample-item {
        margin-bottom: 0;
    }

    /* Packages */
    .packages-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .package-card {
        padding: 30px 20px;
    }

    .package-card.popular {
        transform: none;
    }

    .package-card.popular::after {
        top: 15px;
        right: -25px;
        padding: 4px 25px;
        font-size: 10px;
    }

    .package-price {
        font-size: 36px;
    }

    /* WhatsApp Order */
    .whatsapp-order-options {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .order-option {
        padding: 25px 20px;
    }

    /* Testimonials */
    .testimonials-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .testimonial-card {
        padding: 25px 20px;
    }

    /* FAQ */
    .faq-question {
        padding: 16px;
        font-size: 16px;
    }

    .faq-answer {
        padding: 0 16px;
        font-size: 14px;
    }

    .faq-item.active .faq-answer {
        padding: 0 16px 16px;
    }

    /* CTA */
    .cta {
        padding: 40px 25px;
        margin: 60px 0;
        text-align: center;
    }

    .cta-title {
        font-size: 28px;
    }

    .cta-subtitle {
        font-size: 16px;
    }

    /* Footer */
    .footer-content {
        grid-template-columns: 1fr;
        gap: 30px;
        text-align: center;
    }

    .footer-column h3 {
        margin-bottom: 15px;
    }

    /* Pricing Calculator */
    .calculator-options {
        grid-template-columns: 1fr;
        gap: 15px;
    }

    .calculator-option {
        padding: 15px;
    }

    /* Success Stories Carousel */
    .story-content {
        padding: 25px 20px;
    }

    .carousel-nav {
        gap: 8px;
    }

    .carousel-dot {
        width: 10px;
        height: 10px;
    }
}

/* Small Devices (Landscape Phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
    .container {
        padding: 0 20px;
    }

    /* Header */
    .nav-links {
        display: none;
    }

    .mobile-menu-toggle {
        display: flex;
    }

    /* Hero */
    .hero-title {
        font-size: 36px;
    }

    .hero-actions {
        flex-wrap: wrap;
        justify-content: center;
    }

    /* Features */
    .features-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
    }

    /* Samples */
    .samples-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
    }

    /* Packages */
    .packages-grid {
        grid-template-columns: 1fr;
        gap: 25px;
    }

    .package-card.popular {
        transform: none;
    }

    /* WhatsApp Order */
    .whatsapp-order-options {
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
    }

    .order-option:nth-child(3) {
        grid-column: 1 / -1;
        max-width: 300px;
        margin: 0 auto;
    }

    /* Trust Indicators */
    .trust-indicators {
        gap: 30px;
    }

    .trust-item {
        flex: 0 0 calc(25% - 23px);
    }
}

/* Medium Devices (Tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
    .container {
        padding: 0 25px;
    }

    /* Header */
    .nav-links {
        gap: 20px;
    }

    .nav-links a {
        font-size: 14px;
    }

    /* Hero */
    .hero-content {
        gap: 40px;
    }

    .hero-title {
        font-size: 40px;
    }

    /* Features */
    .features-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
    }

    /* Samples */
    .samples-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
    }

    /* Packages */
    .packages-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
    }

    .package-card.popular {
        transform: none;
    }

    .package-card:nth-child(3) {
        grid-column: 1 / -1;
        max-width: 400px;
        margin: 0 auto;
    }

    /* Card Builder */
    .preview-container {
        flex-direction: column;
    }

    .live-preview {
        margin-left: 0;
        margin-top: 40px;
    }

    /* WhatsApp Order */
    .whatsapp-order-options {
        grid-template-columns: repeat(3, 1fr);
        gap: 25px;
    }

    /* Testimonials */
    .testimonials-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
    }
}

/* Large Devices (Desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
    .container {
        padding: 0 30px;
    }

    /* Features */
    .features-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 25px;
    }

    /* Samples */
    .samples-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 25px;
    }

    /* Packages */
    .packages-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 25px;
    }

    .package-card.popular {
        transform: scale(1.03);
    }
}

/* Extra Large Devices (Large Desktops, 1200px and up) */
@media (min-width: 1200px) {
    /* All desktop styles are in main CSS */
}

/* Special Media Queries for Specific Cases */

/* High-resolution displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .logo-img {
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
    }
}

/* Print Styles */
@media print {
    .whatsapp-float,
    .back-to-top,
    .mobile-menu-toggle,
    .btn {
        display: none !important;
    }

    body {
        background: white !important;
        color: black !important;
    }

    .hero,
    .section {
        break-inside: avoid;
    }

    a::after {
        content: " (" attr(href) ")";
    }
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    /* Already using dark theme by default */
}

/* Light mode override */
@media (prefers-color-scheme: light) {
    /* Add light theme variables if needed */
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
    .feature-card:hover,
    .package-card:hover,
    .testimonial-card:hover {
        transform: none;
    }

    .btn:hover {
        transform: none;
    }

    /* Increase tap target sizes */
    .btn,
    .contact-btn,
    .calculator-option,
    .carousel-dot {
        min-height: 44px;
        min-width: 44px;
    }

    .nav-links a {
        padding: 10px 0;
    }
}

/* Orientation specific styles */
@media (max-width: 767.98px) and (orientation: landscape) {
    .hero {
        padding: 100px 0 40px;
        min-height: auto;
    }

    .hero-content {
        flex-direction: row;
        gap: 30px;
    }

    .hero-text {
        flex: 1;
    }

    .hero-visual {
        flex: 0 0 200px;
    }

    .card-preview {
        width: 200px;
    }
}

/* Very small screens */
@media (max-width: 320px) {
    .container {
        padding: 0 10px;
    }

    .hero-title {
        font-size: 28px;
    }

    .hero-stats {
        flex-direction: column;
        gap: 15px;
        align-items: center;
    }

    .stat {
        align-items: center;
    }

    .trust-indicators {
        gap: 15px;
    }

    .trust-item {
        flex: 0 0 100%;
    }
}

/* Large screens */
@media (min-width: 1400px) {
    .container {
        max-width: 1320px;
    }
}

/* Ultra-wide screens */
@media (min-width: 2000px) {
    .container {
        max-width: 1800px;
    }

    .hero-title {
        font-size: 60px;
    }

    .section-title {
        font-size: 48px;
    }
}

/* Mobile menu animation */
@media (max-width: 767.98px) {
    .nav-links {
        transform: translateY(-10px);
        opacity: 0;
        transition: all 0.3s ease;
    }

    .nav-links.active {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Loading states for mobile */
@media (max-width: 767.98px) {
    .loading {
        width: 16px;
        height: 16px;
    }
}

/* Form optimization for mobile */
@media (max-width: 767.98px) {
    input,
    select,
    textarea {
        font-size: 16px; /* Prevents zoom on iOS */
    }
}

/* Card preview responsive adjustments */
@media (max-width: 480px) {
    .card-preview {
        width: 100%;
        max-width: 280px;
        padding: 20px;
    }

    .card-avatar {
        width: 60px;
        height: 60px;
        font-size: 20px;
    }

    .contact-btn {
        min-width: 100px;
        padding: 8px;
        font-size: 12px;
    }

    .qr-placeholder {
        width: 100px;
        height: 100px;
    }
}

/* Builder steps responsive */
@media (max-width: 480px) {
    .builder-steps {
        gap: 5px;
    }

    .step-number {
        width: 35px;
        height: 35px;
        font-size: 14px;
    }

    .step-label {
        font-size: 11px;
    }
}

/* WhatsApp float positioning for very small screens */
@media (max-width: 320px) {
    .whatsapp-float {
        width: 50px;
        height: 50px;
        bottom: 15px;
        right: 15px;
    }

    .back-to-top {
        width: 45px;
        height: 45px;
        bottom: 75px;
        right: 15px;
    }
}