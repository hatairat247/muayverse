// Loading Page JavaScript
class LoadingPage {
    constructor() {
        this.progressFill = document.getElementById('progressFill');
        this.viewer = document.getElementById('viewer');
        this.preloadContainer = document.getElementById('preloadContainer');
        this.loadingTime = 3000; // 3 seconds
        this.init();
    }

    init() {
        // บังคับให้ VR ซ่อนตัวก่อนเสมอ
        if (this.viewer) {
            this.viewer.style.opacity = '0';
            this.viewer.style.pointerEvents = 'none';
            this.viewer.style.transition = 'opacity 1.5s ease-in-out'; // เพิ่มเวลา Transition  (1.5s)
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

        // สั่งโชว์หน้า VR (Viewer) ขึ้นมา
        if (this.viewer) {
            this.viewer.style.opacity = '1';
            this.viewer.style.pointerEvents = 'auto'; // เปิดให้กดได้
        }

        // ถ้า script.js ของ 3DVista ไม่ได้สั่งปิด เราสั่งปิดเองที่นี่เพื่อความชัวร์
        if (this.preloadContainer) {
            // รอให้ Animation fade-out จบ (0.5s) แล้วค่อยซ่อน display
            setTimeout(() => {
                this.preloadContainer.style.display = 'none';
            }, 500);
        }
    }

    updateProgress(percentage) {
        if (this.progressFill) {
            this.progressFill.style.width = `${percentage}%`;
        }
    }
}

// Add completion styles
const completionStyles = `
    /* แก้ไข CSS Selector ให้เล็งไปที่ ID preloadContainer โดยตรง */
    .loading-complete #preloadContainer {
        animation: fade-out 0.5s ease-out forwards;
        pointer-events: none; /* สำคัญ! เพื่อให้เมาส์คลิกทะลุไปโดน VR ได้ทันทีระหว่างที่กำลังจาง */
    }
    
    @keyframes fade-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;

const style = document.createElement('style');
style.textContent = completionStyles;
document.head.appendChild(style);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new LoadingPage();
    });
} else {
    new LoadingPage();
}