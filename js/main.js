// Main JavaScript - Handles page interactions
class MuayVerse {
    constructor() {
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.addAnimations();
    }

    attachEventListeners() {
        // Future event listeners can be added here
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
        window.showNotification = MuayVerse.showNotification;
    });
} else {
    window.muayverseApp = new MuayVerse();
    window.showNotification = MuayVerse.showNotification;
}
