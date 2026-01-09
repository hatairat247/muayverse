// Loading Page JavaScript
class LoadingPage {
    constructor() {
        this.progressFill = document.getElementById('progressFill');
        this.viewer = document.getElementById('viewer');
        this.loadingTime = 3000; // 3 seconds
        this.init();
    }

    init() {
        //  บังคับให้ VR ซ่อนตัวก่อนเสมอ (เผื่อ CSS ไม่ทำงาน)
        if (this.viewer) {
            this.viewer.style.opacity = '0';
            this.viewer.style.pointerEvents = 'none';
            this.viewer.style.transition = 'opacity 0.5s ease-in-out'; // เพิ่ม Transition ให้ VR ค่อยๆ ชัด
        }
        this.startLoading();
    }

    startLoading() {
        // Animate progress bar to 100%
        setTimeout(() => {
            if (this.progressFill) {
                this.progressFill.style.width = '100%';
                this.progressFill.style.animation = 'progress-loading 2s ease-in-out forwards';
            }
        }, 500);

        // Wait for animation to complete
        setTimeout(() => {
            this.completeLoading();
        }, this.loadingTime);
    }

    completeLoading() {
        // Add completion effect
        document.body.classList.add('loading-complete');

        // โชว์หน้า VR (Viewer) ขึ้นมาตอนนี้
        if (this.viewer) {
            this.viewer.style.opacity = '1';
            this.viewer.style.pointerEvents = 'auto'; // เปิดให้กดได้
        }

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