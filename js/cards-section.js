// Cards Section Interactions
class CardsSection {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.init();
    }

    init() {
        // Add click handlers to all cards
        this.cards.forEach(card => {
            card.addEventListener('click', (e) => this.handleCardClick(e, card));
        });

        // Initialize scroll animations
        this.initScrollAnimations();
    }

    handleCardClick(event, card) {
        const link = card.getAttribute('data-link');

        if (!link) return;

        // Check if it's an external link or internal anchor
        if (link.startsWith('#')) {
            // Internal anchor - smooth scroll
            event.preventDefault();
            const target = document.querySelector(link);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else if (link.startsWith('/') || link.startsWith('http')) {
            // External link
            window.location.href = link;
        }
    }

    initScrollAnimations() {
        // Intersection Observer for scroll-triggered animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation delay
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        }, observerOptions);

        // Observe each card
        this.cards.forEach(card => {
            // Set initial state
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

            observer.observe(card);
        });

        // Parallax effect on scroll
        this.initParallaxScroll();
    }

    initParallaxScroll() {
        const cardsSection = document.querySelector('.cards-section');
        const cardsBackground = document.querySelector('.cards-background');

        if (!cardsSection || !cardsBackground) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = cardsSection.getBoundingClientRect();
                    const scrolled = window.pageYOffset;

                    // Only apply parallax when section is in view
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const parallaxSpeed = 0.5;
                        const yPos = -(scrolled - cardsSection.offsetTop) * parallaxSpeed;
                        cardsBackground.style.transform = `translateY(${yPos}px)`;
                    }

                    ticking = false;
                });

                ticking = true;
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CardsSection();
    });
} else {
    new CardsSection();
}
