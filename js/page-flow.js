// ===== Page Flow Management =====
// จัดการ flow: Warning -> Loading -> Main Page

class PageFlow {
    constructor() {
        this.warningOverlay = document.getElementById('warningOverlay');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.acceptBtn = document.getElementById('acceptBtn');
        this.progressFill = document.getElementById('progressFill');

        this.hasAccepted = false;
        this.loadingTime = 3000; // 3 วินาที

        this.init();
    }

    init() {
        console.log('Page Flow initialized');

        // ตรวจสอบว่าผู้ใช้เคยผ่านหน้า warning แล้วหรือไม่
        const hasSeenWarning = sessionStorage.getItem('muayverse_warning_seen');

        // ตรวจสอบว่ากลับมาจากหน้าอื่นหรือไม่
        const urlParams = new URLSearchParams(window.location.search);
        const isReturn = urlParams.get('return') === 'true';

        if (hasSeenWarning === 'true' || isReturn) {
            // ถ้าเคยเห็นแล้ว หรือกลับมาจากหน้าอื่น ข้ามไปหน้าหลักเลย
            sessionStorage.setItem('muayverse_warning_seen', 'true');
            this.hideWarning();
            this.hideLoading();
        } else {
            // แสดง warning ก่อน
            this.showWarning();
            this.setupWarningAccept();
        }
    }

    // แสดงหน้า Warning
    showWarning() {
        if (this.warningOverlay) {
            this.warningOverlay.classList.add('active');
            console.log('Showing warning overlay');
        }
    }

    // ซ่อนหน้า Warning
    hideWarning() {
        if (this.warningOverlay) {
            this.warningOverlay.classList.remove('active');
            this.warningOverlay.style.display = 'none';
        }
    }

    // แสดงหน้า Loading
    showLoading() {
        if (this.loadingOverlay) {
            document.body.classList.add('loading-active');
            this.loadingOverlay.classList.add('active');
            console.log('Showing loading overlay');

            // เริ่ม animation progress bar
            this.startLoadingAnimation();
        }
    }

    // ซ่อนหน้า Loading
    hideLoading() {
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.remove('active');
            this.loadingOverlay.style.display = 'none';
        }
    }

    // Setup การยอมรับ Warning
    setupWarningAccept() {
        if (this.acceptBtn) {
            console.log('Accept button found, attaching event listeners');

            this.acceptBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Accept button clicked!');
                this.handleWarningAccept();
            });

            // เพิ่ม hover effect
            this.acceptBtn.addEventListener('mouseenter', () => {
                this.acceptBtn.style.transform = 'scale(1.2)';
            });

            this.acceptBtn.addEventListener('mouseleave', () => {
                this.acceptBtn.style.transform = 'scale(1)';
            });

            // ให้แน่ใจว่าสามารถคลิกได้
            this.acceptBtn.style.cursor = 'pointer';
            this.acceptBtn.style.pointerEvents = 'auto';
        } else {
            console.error('Accept button not found!');
        }
    }

    // จัดการเมื่อผู้ใช้กด Accept
    handleWarningAccept() {
        if (this.hasAccepted) return;

        this.hasAccepted = true;
        console.log('User accepted warning');

        // เก็บสถานะว่าผู้ใช้เคยเห็น warning แล้ว
        sessionStorage.setItem('muayverse_warning_seen', 'true');

        // บันทึกการยินยอมให้เล่นเพลงอัตโนมัติ
        localStorage.setItem('muayverse_autoplay', 'true');
        localStorage.setItem('muayverse_music_consent', 'true');
        localStorage.setItem('muayverse_music_consent_time', new Date().getTime());
        console.log('Music consent granted');

        // ส่ง event แจ้งว่าผู้ใช้ให้ความยินยอมแล้ว
        window.dispatchEvent(new CustomEvent('musicConsentGiven', {
            detail: {
                method: 'left-click-icon',
                timestamp: new Date().getTime()
            }
        }));

        // Fade out warning
        this.warningOverlay.style.transition = 'opacity 0.5s ease';
        this.warningOverlay.style.opacity = '0';

        // หลังจาก fade out เสร็จ ให้แสดง loading
        setTimeout(() => {
            this.hideWarning();
            this.showLoading();
        }, 500);
    }

    // เริ่ม Loading Animation
    startLoadingAnimation() {
        if (!this.progressFill) return;

        // Animation progress bar
        setTimeout(() => {
            this.progressFill.style.width = '100%';
            this.progressFill.style.transition = `width ${this.loadingTime}ms ease-in-out`;
        }, 100);

        // เมื่อ loading เสร็จ ให้แสดงหน้าหลัก
        setTimeout(() => {
            this.completeLoading();
        }, this.loadingTime + 500);
    }

    // เสร็จสิ้นการ Loading
    completeLoading() {
        console.log('Loading complete!');

        // เริ่มเล่น video และ unmute เสียง
        const video = document.getElementById('bgVideo');
        if (video) {
            video.play().then(() => {
                console.log('Video started playing');
                // Unmute video หลังจาก user ให้ consent แล้ว
                if (localStorage.getItem('muayverse_music_consent') === 'true') {
                    video.muted = false;
                    console.log('Video unmuted - music playing');
                }
            }).catch(err => {
                console.error('Video play error:', err);
            });
        }
        console.log('Loading complete, showing main page');

        // Fade out loading
        this.loadingOverlay.style.transition = 'opacity 0.5s ease';
        this.loadingOverlay.style.opacity = '0';

        // ซ่อน loading overlay และแสดงหน้าหลัก
        setTimeout(() => {
            this.hideLoading();
            document.body.classList.remove('loading-active');

            // แจ้ง navbar ว่าสามารถเล่นเพลงอัตโนมัติได้
            window.dispatchEvent(new Event('pageLoadComplete'));
        }, 500);
    }
}

// เพิ่ม styles สำหรับ overlay
const overlayStyles = `
    .warning-overlay,
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--color-background, #272727);
        display: none;
        opacity: 0;
        transition: opacity 0.5s ease;
    }

    .warning-overlay {
        z-index: 10000;
        overflow-y: auto;
    }

    .loading-overlay {
        z-index: 9999;
    }

    .warning-overlay.active,
    .loading-overlay.active {
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
    }
    
    /* ให้แน่ใจว่า warning content สามารถคลิกได้ */
    .warning-overlay * {
        pointer-events: auto !important;
    }
    
    /* ให้แน่ใจว่า click icon อยู่ด้านบนสุด */
    .warning-overlay .click-icon,
    .warning-overlay .click-image {
        position: relative;
        z-index: 10002 !important;
        pointer-events: auto !important;
        cursor: pointer !important;
    }

    /* ซ่อนเนื้อหาหลักเมื่อ overlay แสดง */
    body:has(.warning-overlay.active) .bg-video,
    body:has(.warning-overlay.active) .navbar,
    body:has(.warning-overlay.active) .main-content,
    body:has(.warning-overlay.active) .hamburger-menu,
    body:has(.loading-overlay.active) .bg-video,
    body:has(.loading-overlay.active) .navbar,
    body:has(.loading-overlay.active) .main-content,
    body:has(.loading-overlay.active) .hamburger-menu {
        visibility: hidden;
        pointer-events: none;
    }
`;

const style = document.createElement('style');
style.textContent = overlayStyles;
document.head.appendChild(style);

// Initialize Page Flow เมื่อ DOM พร้อม
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PageFlow();
    });
} else {
    new PageFlow();
}
