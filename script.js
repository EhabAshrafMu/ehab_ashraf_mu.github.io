// script.js - Enhanced with better error handling and performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Utility function for safe element selection
    const safeQuerySelector = (selector, parent = document) => {
        try {
            return parent.querySelector(selector);
        } catch (error) {
            console.warn(`Failed to select element: ${selector}`, error);
            return null;
        }
    };

    const safeQuerySelectorAll = (selector, parent = document) => {
        try {
            return parent.querySelectorAll(selector);
        } catch (error) {
            console.warn(`Failed to select elements: ${selector}`, error);
            return [];
        }
    };

    // Mobile menu toggle
    const hamburger = safeQuerySelector('#hamburger');
    const navMenu = safeQuerySelector('#nav-menu');
    const navLinks = safeQuerySelectorAll('.nav-link');

    const toggleMenu = () => {
        if (!navMenu || !hamburger) return;
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        const isExpanded = navMenu.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    };

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
        
        // Keyboard accessibility
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Smooth active link highlight on scroll with throttling
    const sections = safeQuerySelectorAll('section[id]');
    let ticking = false;

    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                let current = '';
                const scrollPosition = window.pageYOffset + 100; // Offset for better detection

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });

                // Update active navigation link
                const navLinks = safeQuerySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (current && link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', onScroll, { passive: true });

    // Enhanced counter animation with better performance
    const counters = safeQuerySelectorAll('.stat-number');
    const speed = 160; // smaller = faster

    const animateCount = (counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0', 10);
        const start = 0;
        const step = Math.max(1, Math.floor(target / (speed / 10)));

        let current = start;
        const update = () => {
            current += step;
            if (current >= target) {
                counter.innerText = target;
            } else {
                counter.innerText = current;
                requestAnimationFrame(update);
            }
        };
        update();
    };

    // Enhanced skill animations with intersection observer
    const animateSkills = (root = document) => {
        const skillItems = Array.from(root.querySelectorAll('.skill-item'));
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });
    };

    // Skills category switching with improved UX
    const skillCategories = safeQuerySelectorAll('.skill-category');
    const skillGroups = safeQuerySelectorAll('.skill-group');

    skillCategories.forEach(cat => {
        cat.addEventListener('click', () => {
            // Remove active class from all categories
            skillCategories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked category
            cat.classList.add('active');
            
            const selected = cat.getAttribute('data-category');
            
            // Hide all skill groups
            skillGroups.forEach(g => {
                g.classList.remove('active');
            });
            
            // Show selected skill group
            skillGroups.forEach(g => {
                if (g.getAttribute('data-group') === selected) {
                    g.classList.add('active');
                    // Animate skills in the selected group
                    animateSkills(g);
                }
            });
        });
    });

    // Enhanced intersection observer with better performance
    const observerOptions = { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;

            if (el.classList.contains('hero-stats')) {
                counters.forEach(c => animateCount(c));
            }
            
            if (el.classList.contains('skills-display')) {
                animateSkills();
            }
            if (el.classList.contains('languages')) {
                fillBars();
            }
            
            // Unobserve to avoid repeated triggers
            observer.unobserve(el);
        });
    }, observerOptions);

    // Observe elements for animations
    const heroStats = safeQuerySelector('.hero-stats');
    const skillsDisplay = safeQuerySelector('.skills-display');
    const languages = safeQuerySelector('.languages');

    if (heroStats) observer.observe(heroStats);
    if (skillsDisplay) observer.observe(skillsDisplay);
    if (languages) observer.observe(languages);

    // Initial animations for skills visible on load
    animateSkills();

    // Ensure nav highlight runs once on load
    onScroll();

    // Add smooth scrolling for anchor links
    const anchorLinks = safeQuerySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = safeQuerySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading animation for images (if any are added later)
    const images = safeQuerySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });

    // Add keyboard navigation for skill categories
    skillCategories.forEach(cat => {
        cat.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                cat.click();
            }
        });
    });

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    const debouncedScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(onScroll, 10);
    };
    
    // Replace the original scroll listener with debounced version
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', debouncedScroll, { passive: true });

    // Add error handling for missing elements
    const requiredElements = [
        { selector: '#hamburger', name: 'Hamburger menu' },
        { selector: '#nav-menu', name: 'Navigation menu' },
        { selector: '.hero-stats', name: 'Hero stats' }
    ];

    requiredElements.forEach(({ selector, name }) => {
        if (!safeQuerySelector(selector)) {
            console.warn(`${name} element not found: ${selector}`);
        }
    });

    // Add console log for successful initialization
    console.log('Portfolio website initialized successfully');
});
  