// Loading Page JavaScript
class LoadingPage {
    constructor() {
        this.progressFill = document.getElementById('progressFill');
        this.loadingTime = 3000; // 3 seconds
        this.init();
    }

    init() {
        this.startLoading();
    }

    startLoading() {
        // Animate progress bar to 100%
        setTimeout(() => {
            this.progressFill.style.width = '100%';
            this.progressFill.style.animation = 'progress-loading 3s ease-in-out forwards';
        }, 500);

        // Wait for animation to complete (3s animation + 0.5s delay + 0.5s buffer)
        setTimeout(() => {
            this.completeLoading();
        }, 4000); // 4 seconds total
    }

    completeLoading() {
        // Add completion effect
        document.body.classList.add('loading-complete');

        // Redirect to Warning page
        setTimeout(() => {
            window.location.href = 'warning.html';
        }, 500);
    }

    // Update progress manually (for actual loading scenarios)
    updateProgress(percentage) {
        if (this.progressFill) {
            this.progressFill.style.width = `${percentage}%`;
        }
    }
}

// Add completion styles
const completionStyles = `
    .loading-complete .loading-container {
        animation: fade-out 0.5s ease-out forwards;
    }
    
    @keyframes fade-out {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
`;

const style = document.createElement('style');
style.textContent = completionStyles;
document.head.appendChild(style);

// Initialize Loading Page when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new LoadingPage();
    });
} else {
    new LoadingPage();
}