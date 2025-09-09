class WebDevServicePage {
    constructor() {
        this.currentFilter = 'all';
        this.isScrolling = false;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.initAnimations();
        this.initPortfolioFilter();
        this.initContactForm();
        this.initSmoothScrolling();
    }
    
    bindEvents() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        
        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }
        
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
        
        // Header scroll effect
        this.initHeaderScroll();
        
        // Service card interactions
        this.initServiceCards();
        
        // Portfolio interactions
        this.initPortfolioItems();
        
        // CTA button interactions
        this.initCTAButtons();
        
        // Technology item hover effects
        this.initTechItems();
        
        // Floating cards animation
        this.initFloatingCards();
    }
    
    initHeaderScroll() {
        let lastScrollTop = 0;
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            // Add background blur when scrolled
            if (scrollTop > 50) {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.9)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    initAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .process-step, .tech-category');
        animateElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
        
        // Counter animation for hero stats
        this.initCounterAnimation();
    }
    
    initCounterAnimation() {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        this.animateCounter(stat);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            statsObserver.observe(heroStats);
        }
    }
    
    animateCounter(element) {
        const text = element.textContent;
        const target = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 40);
    }
    
    initServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            const serviceBtn = card.querySelector('.service-btn');
            
            serviceBtn.addEventListener('click', () => {
                const serviceTitle = card.querySelector('.service-title').textContent;
                this.showServiceModal(serviceTitle, card);
            });
            
            // Add hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-10px)';
            });
        });
    }
    
    showServiceModal(serviceName, cardElement) {
        const modal = document.createElement('div');
        modal.className = 'service-modal';
        
        const serviceData = this.getServiceData(serviceName);
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${serviceName}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="service-details">
                        <h4>What's Included:</h4>
                        <ul>
                            ${serviceData.includes.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        <h4>Technologies Used:</h4>
                        <div class="tech-tags">
                            ${serviceData.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <h4>Timeline:</h4>
                        <p>${serviceData.timeline}</p>
                        <h4>Starting Price:</h4>
                        <p class="modal-price">${serviceData.price}</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn primary">Get Quote</button>
                    <button class="modal-btn secondary">Schedule Call</button>
                </div>
            </div>
        `;
        
        this.addModalStyles();
        document.body.appendChild(modal);
        
        setTimeout(() => modal.classList.add('show'), 10);
        
        // Close modal events
        const closeBtn = modal.querySelector('.modal-close');
        const primaryBtn = modal.querySelector('.modal-btn.primary');
        const secondaryBtn = modal.querySelector('.modal-btn.secondary');
        
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => document.body.removeChild(modal), 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        primaryBtn.addEventListener('click', () => {
            closeModal();
            this.showNotification(`Quote request sent for ${serviceName}! We'll contact you within 24 hours.`);
        });
        
        secondaryBtn.addEventListener('click', () => {
            closeModal();
            this.showNotification('Redirecting to calendar booking...');
        });
    }
    
    getServiceData(serviceName) {
        const serviceData = {
            'Web Development': {
                includes: [
                    'Custom website design',
                    'Responsive development',
                    'SEO optimization',
                    'Content management system',
                    'Performance optimization',
                    '3 months support'
                ],
                technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
                timeline: '4-8 weeks',
                price: 'Starting at $2,999'
            },
            'Mobile App Development': {
                includes: [
                    'iOS & Android apps',
                    'Cross-platform development',
                    'App store submission',
                    'Push notifications',
                    'Analytics integration',
                    '6 months support'
                ],
                technologies: ['React Native', 'Flutter', 'Firebase', 'API Integration'],
                timeline: '8-16 weeks',
                price: 'Starting at $4,999'
            },
            'E-commerce Development': {
                includes: [
                    'Online store setup',
                    'Payment gateway integration',
                    'Inventory management',
                    'Order management',
                    'Customer dashboard',
                    'Analytics & reporting'
                ],
                technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'React'],
                timeline: '6-12 weeks',
                price: 'Starting at $3,999'
            },
            'Custom Software': {
                includes: [
                    'Requirements analysis',
                    'Custom development',
                    'Database design',
                    'API development',
                    'Cloud deployment',
                    '12 months support'
                ],
                technologies: ['Python', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
                timeline: '12-24 weeks',
                price: 'Starting at $5,999'
            },
            'UI/UX Design': {
                includes: [
                    'User research',
                    'Wireframing',
                    'Visual design',
                    'Prototyping',
                    'Usability testing',
                    'Design system'
                ],
                technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
                timeline: '2-6 weeks',
                price: 'Starting at $1,999'
            },
            'Maintenance & Support': {
                includes: [
                    '24/7 monitoring',
                    'Security updates',
                    'Performance optimization',
                    'Bug fixes',
                    'Content updates',
                    'Monthly reports'
                ],
                technologies: ['Monitoring Tools', 'Security Scanners', 'Performance Tools'],
                timeline: 'Ongoing',
                price: 'Starting at $299/month'
            }
        };
        
        return serviceData[serviceName] || serviceData['Web Development'];
    }
    
    addModalStyles() {
        if (document.querySelector('#service-modal-styles')) return;
        
        const styles = `
            .service-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .service-modal.show {
                opacity: 1;
            }
            
            .modal-content {
                background: rgba(220, 38, 38, 0.1);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(220, 38, 38, 0.2);
                border-radius: 20px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                transform: scale(0.7);
                transition: transform 0.3s ease;
            }
            
            .service-modal.show .modal-content {
                transform: scale(1);
            }
            
            .modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid rgba(220, 38, 38, 0.2);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h3 {
                color: #ffffff;
                margin: 0;
                font-size: 1.5rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: #ffffff;
                font-size: 2rem;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.3s ease;
            }
            
            .modal-close:hover {
                background-color: rgba(220, 38, 38, 0.2);
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .service-details h4 {
                color: #dc2626;
                margin: 1.5rem 0 0.5rem 0;
                font-size: 1.1rem;
            }
            
            .service-details h4:first-child {
                margin-top: 0;
            }
            
            .service-details ul {
                list-style: none;
                margin-bottom: 1rem;
            }
            
            .service-details li {
                color: #d0d0d0;
                margin-bottom: 0.5rem;
                position: relative;
                padding-left: 1.5rem;
            }
            
            .service-details li::before {
                content: '✓';
                color: #dc2626;
                position: absolute;
                left: 0;
                font-weight: bold;
            }
            
            .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .tech-tag {
                background: rgba(220, 38, 38, 0.2);
                color: #dc2626;
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .modal-price {
                color: #dc2626;
                font-size: 1.3rem;
                font-weight: 700;
                margin: 0;
            }
            
            .modal-footer {
                padding: 1.5rem;
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
                border-top: 1px solid rgba(220, 38, 38, 0.2);
            }
            
            .modal-btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .modal-btn.primary {
                background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
                color: #ffffff;
            }
            
            .modal-btn.primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(220, 38, 38, 0.4);
            }
            
            .modal-btn.secondary {
                background: transparent;
                color: #ffffff;
                border: 1px solid rgba(220, 38, 38, 0.3);
            }
            
            .modal-btn.secondary:hover {
                background: rgba(220, 38, 38, 0.1);
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = 'service-modal-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    initPortfolioFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter items
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    initPortfolioItems() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            const viewBtn = item.querySelector('.portfolio-btn');
            const title = item.querySelector('.portfolio-content h4').textContent;
            
            if (viewBtn) {
                viewBtn.addEventListener('click', () => {
                    this.showNotification(`Opening ${title} case study...`);
                });
            }
        });
    }
    
    initCTAButtons() {
        const ctaButtons = document.querySelectorAll('.btn-primary');
        const outlineButtons = document.querySelectorAll('.btn-outline');
        
        ctaButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.textContent.includes('Start') || btn.textContent.includes('Quote')) {
                    this.scrollToContact();
                } else {
                    this.showNotification('Redirecting to project consultation...');
                }
            });
        });
        
        outlineButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.textContent.includes('Portfolio')) {
                    this.scrollToSection('portfolio');
                } else if (btn.textContent.includes('Call')) {
                    this.showNotification('Redirecting to calendar booking...');
                }
            });
        });
    }
    
    initTechItems() {
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-10px) scale(1.05)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(-5px) scale(1)';
            });
        });
    }
    
    initFloatingCards() {
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-30px) scale(1.1)';
                card.style.boxShadow = '0 20px 40px rgba(220, 38, 38, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-20px) scale(1)';
                card.style.boxShadow = 'none';
            });
        });
    }
    
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
        }
    }
    
    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        this.showNotification('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.');
        form.reset();
    }
    
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId.substring(1));
            });
        });
    }
    
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = section.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    scrollToContact() {
        this.scrollToSection('contact');
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'rgba(220, 38, 38, 0.9)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
            maxWidth: '350px',
            fontSize: '0.9rem',
            fontWeight: '500',
            border: '1px solid rgba(220, 38, 38, 0.3)'
        });
        
        document.body.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const webDevPage = new WebDevServicePage();
    
    // Make globally accessible
    window.webDevPage = webDevPage;
    
    // Add loading complete class
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 500);
});

// Performance optimization
const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-viewport');
        }
    });
}, { threshold: 0.1 });

// Observe sections for performance optimization
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    performanceObserver.observe(section);
});

