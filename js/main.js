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

// ==========================================
// Smart Paper Tear Transition (History Only)
// ==========================================
// FIX: กระดาษถูก Hardcode ใน HTML แล้ว ไม่ต้องสร้างใหม่
// FIX: ใช้ html.paper-entering class (เซ็ตโดย inline <script> ใน <head>)
//      เพื่อบังหน้าจอตั้งแต่ 0ms แก้ปัญหา Navbar FOUC
document.addEventListener('DOMContentLoaded', () => {
    // 1. ดึง wrapper ที่ Hardcode ไว้ใน HTML แล้ว
    const paperWrapper = document.getElementById('paper-transition-wrapper');
    if (!paperWrapper) return; // Safety: ถ้าไม่มีก็ข้ามไป

    // 2. เช็คว่าเพิ่งกดลิงก์มาจาก/ไปหน้า History หรือไม่
    const isPaperTransitionPending = sessionStorage.getItem('paperTransition') === 'true';

    if (isPaperTransitionPending) {
        // กระดาษถูกแสดงอยู่แล้วตั้งแต่ Frame แรก (ผ่าน html.paper-entering ใน CSS)
        // แค่สั่งให้ "ฉีกออก" เพื่อโชว์เนื้อหาหน้าใหม่
        void paperWrapper.offsetWidth; // Force Reflow

        setTimeout(() => {
            paperWrapper.classList.add('torn-apart');
        }, 50);

        // พอฉีกเสร็จ (0.85s) ให้ลบ class ออกเพื่อซ่อนกระดาษ
        setTimeout(() => {
            document.documentElement.classList.remove('paper-entering');
            paperWrapper.classList.remove('torn-apart', 'is-transitioning');
        }, 850);

        sessionStorage.removeItem('paperTransition');
    }

    // 3. ดักจับการคลิกลิงก์ทั้งหมด
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');

            if (target === '_blank' || href.startsWith('http') || href.startsWith('#')) return;

            // *** หัวใจสำคัญ: ทำงานเฉพาะเข้า-ออก หน้า history.html เท่านั้น ***
            const isGoingToHistory = href.includes('history.html');
            const isComingFromHistory = window.location.pathname.includes('history.html');

            if (isGoingToHistory || isComingFromHistory) {
                e.preventDefault(); // หยุดการโหลดหน้าชั่วคราว

                // แสดงกระดาษ + เซ็ตให้อยู่สภาพ "ฉีกออก" ก่อน
                document.documentElement.classList.add('paper-entering');
                paperWrapper.classList.add('torn-apart');

                void paperWrapper.offsetWidth; // Force Reflow

                // สั่งให้กระดาษ 2 ข้างเลื่อนมา "ประกบกัน (Merge)"
                paperWrapper.classList.remove('torn-apart');
                paperWrapper.classList.add('is-transitioning');

                // บันทึกสถานะ transition ไว้สำหรับหน้าถัดไป
                sessionStorage.setItem('paperTransition', 'true');

                // รอ 0.8 วินาทีให้กระดาษชนกันสนิท ค่อยย้ายไปหน้าใหม่
                setTimeout(() => {
                    window.location.href = href;
                }, 800);
            }
        });
    });

    // 4. กันเหนียวกรณีผู้ใช้กดปุ่ม Back/Forward ของบราวเซอร์
    window.addEventListener('pageshow', (event) => {
        if (event.persisted && sessionStorage.getItem('paperTransition') === 'true') {
            sessionStorage.removeItem('paperTransition');
            document.documentElement.classList.remove('paper-entering');
            paperWrapper.classList.remove('torn-apart', 'is-transitioning');
        }
    });
});