// Main JavaScript - Handles hamburger menu and page interactions
class MuayVerse {
    constructor() {
        this.hamburgerMenu = document.getElementById('hamburgerMenu');
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.addAnimations();
    }

    attachEventListeners() {
        // Monitor menu state changes
        const observer = new MutationObserver(() => {
            this.isMenuOpen = this.hamburgerMenu.classList.contains('show');
        });

        observer.observe(this.hamburgerMenu, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Close menu when clicking menu items
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                this.closeHamburgerMenu();
            });
        });
    }

    toggleHamburgerMenu() {
        this.isMenuOpen = !this.isMenuOpen;

        if (this.isMenuOpen) {
            this.openHamburgerMenu();
        } else {
            this.closeHamburgerMenu();
        }
    }

    openHamburgerMenu() {
        this.hamburgerMenu.classList.add('show');
        this.isMenuOpen = true;
    }

    closeHamburgerMenu() {
        this.hamburgerMenu.classList.remove('show');
        const menuBtn = document.getElementById('menuBtn');
        if (menuBtn) {
            menuBtn.classList.remove('active');
        }
        this.isMenuOpen = false;
    }

    handleOutsideClick(e) {
        // Close menu if clicking outside hamburger menu
        if (this.isMenuOpen &&
            !this.hamburgerMenu.contains(e.target) &&
            !e.target.closest('.menu-btn')) {
            this.closeHamburgerMenu();
        }
    }

    addAnimations() {
        // Add entrance animations to elements
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.8s ease forwards';
                }
            });
        }, observerOptions);

        // Observe elements that need animation
        const animatedElements = document.querySelectorAll('.logo-container');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Utility function to show notifications
    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        const colors = {
            info: 'var(--color-primary)',
            success: '#28a745',
            warning: '#ffc107',
            error: '#dc3545'
        };

        notification.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background-color: ${colors[type] || colors.info};
            color: var(--color-text-light);
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-size: 14px;
            max-width: 300px;
        `;

        // Add animation styles if not exists
        if (!document.querySelector('#notification-animations')) {
            const style = document.createElement('style');
            style.id = 'notification-animations';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.muayverseApp = new MuayVerse();

        // Make notification function globally accessible
        window.showNotification = MuayVerse.showNotification;

        // Welcome message (optional)
        console.log('MuayVerse - ยินดีต้อนรับสู่โลกแห่งมวยไทย',
            'font-size: 16px; color: #780000; font-weight: bold;');
    });
} else {
    window.muayverseApp = new MuayVerse();
    window.showNotification = MuayVerse.showNotification;
}

// Handle page visibility for music control
document.addEventListener('visibilitychange', () => {
    const bgMusic = document.getElementById('bgMusic');
    if (document.hidden && bgMusic && !bgMusic.paused) {
        // Optionally pause music when tab is hidden
        // bgMusic.pause();
    }
});
