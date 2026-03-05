// Navbar Component
class Navbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.isMusicPlaying = false;
        
        // ลำดับความสำคัญ: page-audio > bg-video > default audio
        this.pageAudio = document.querySelector('.page-audio');
        this.bgVideo = document.querySelector('.bg-video');
        this.audioElement = null;

        if (this.pageAudio) {
            // ใช้เสียงเฉพาะหน้า
            this.pageAudio.volume = 0.4;
            this.pageAudio.muted = true;
            this.pageAudio.loop = true;
            console.log('Using page-specific audio');
        } else if (this.bgVideo) {
            // ใช้ bg-video (หน้า home)
            this.bgVideo.volume = 0.4;
            this.bgVideo.muted = true;
            this.bgVideo.loop = true;
            console.log('Using bg-video audio');
        } else {
            // สำรองสำหรับหน้าอื่นๆ
            this.audioElement = new Audio('https://res.cloudinary.com/muayverse/video/upload/v1767956196/8sec_9_1_iczxae.mp4');
            this.audioElement.loop = true;
            this.audioElement.volume = 0.4;
            this.audioElement.muted = true;
            console.log('Using default audio');
        }

        this.init();
        this.checkAutoPlayConsent();
        // restoreMusicState is called after pageLoadComplete to prevent early audio during overlays
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.navbar.innerHTML = `
            <div class="navbar">
                <div class="navbar-logo">
                    <a href="index.html?return=true">
                        <img src="img/logo_nav.png" alt="MuayVerse Logo" class="logo-nav">
                    </a>
                </div>
                <div class="navbar-controls">
                    <div class="nav-btn music-btn muted" id="musicBtn" title="Background Music">
                        <img src="icon/Bell.svg" alt="Music" class="btn-icon">
                    </div>

                    <div class="nav-btn menu-btn" id="menuBtn" title="Menu">
                        <img src="icon/Menu.svg" alt="Menu" class="btn-icon">
                    </div>
                </div>
            </div>
        `;

        // Add navbar styles
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .navbar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 80px;
                background-color: var(--color-primary);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 var(--spacing-2xl);
                z-index: 999;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }

            .navbar-logo {
                height: 100%;
                display: flex;
                align-items: center;
            }

            .navbar-logo a {
                height: 100%;
                display: flex;
                align-items: center;
                text-decoration: none;
                transition: transform 0.3s ease;
            }

            .navbar-logo a:hover {
                transform: scale(1.05);
            }

            .logo-nav {
                max-height: var(--navbar-height);
                width: auto;
                object-fit: contain;
                filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
            }

            .navbar-controls {
                display: flex;
                gap: var(--spacing-2xl);
                align-items: center;
            }

            .nav-btn {
                width: 38px;
                height: 38px;
                border: none;
                background: transparent;
                color: var(--color-text-light);
                font-size: 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                transition: all 0.3s ease;
                position: relative;
            }

            /* เพิ่มขนาด music button */
            .music-btn {
                width: 52px;
                height: 52px;
            }

            /* เพิ่ม CSS ให้รูปภาพข้างในเต็มกล่อง */
            .btn-icon {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: block;
                pointer-events: none; /* ให้คลิกทะลุรูปไปโดนปุ่ม */
            }

            .nav-btn:hover {
                background-color: rgba(253, 240, 213, 0.1);
                transform: scale(1.1);
            }

            .nav-btn:active {
                transform: scale(0.95);
            }

            .menu-btn.active {
                background-color: var(--color-secondary);
                width: 42px;
                height: 42px;
            }

            .music-btn.playing {
                animation: pulse 2s ease-in-out infinite;
            }

            .music-btn.muted {
                opacity: 1;
            }

            .music-btn.muted .btn-icon {
                opacity: 0.5;
            }

            .music-btn.muted::before {
                content: '';
                position: absolute;
                width: 130%;
                height: 4px; /* ความหนาเส้น */
                border-radius: 4px; 
                /* สีเส้น  */
                background-color: var(--color-secondary); 
                top: 50%;
                left: 50%;
    
                /* หมุน 45 องศา (ใช้ -45 ให้เป็นแนวขวางลง) */
                transform: translate(-50%, -50%) rotate(-45deg);
    
                /* ให้เส้นอยู่เหนือไอคอน */
                z-index: 10; 
                pointer-events: none;
            }

            @keyframes pulse {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.7;
                }
            }

            @keyframes ripple {
                0% {
                    transform: scale(1);
                    opacity: 1;
                }
                100% {
                    transform: scale(1.5);
                    opacity: 0;
                }
            }

            /* Responsive Navbar */
            @media screen and (max-width: 768px) {
                .navbar {
                    padding: 0 20px;
                    height: 70px;
                }

                :root {
                    --navbar-height: 70px;
                }

                .logo-nav {
                    max-height: 60px;
                }

                .nav-btn {
                    width: 28px;
                    height: 28px;
                    font-size: 16px;
                }

                /* music button on tablet */
                .music-btn {
                    width: 44px;
                    height: 44px;
                }

                .navbar-controls {
                    gap: 16px;
                }
            }

            @media screen and (max-width: 480px) {
                .navbar {
                    padding: 0 15px;
                    height: 60px;
                }

                :root {
                    --navbar-height: 60px;
                }

                .logo-nav {
                    max-height: 50px;
                }

                .nav-btn {
                    width: 24px;
                    height: 24px;
                    font-size: 14px;
                }

                /* music button on small screens */
                .music-btn {
                    width: 32px;
                    height: 32px;
                }

                .menu-btn.active{
                    width: 36px;
                    height: 36px;
                }
                
                .menu-content{
                    gap: 4px;
                }
                
                .menu-item{
                    font-size: 12px;
                }

                .navbar-controls {
                    gap: 12px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    attachEventListeners() {
        // Music button - เช็คว่ามีปุ่มหรือไม่ (อาจไม่มีในบางหน้า)
        const musicBtn = document.getElementById('musicBtn');
        if (musicBtn) {
            musicBtn.addEventListener('click', () => this.toggleMusic());
        }

        // Menu button
        const menuBtn = document.getElementById('menuBtn');
        if (menuBtn) {
            menuBtn.addEventListener('click', () => this.toggleMenu());
        }

        // --- ดักจับ Event เมื่อผู้ใช้คลิก icon เข้าเว็บ ---
        window.addEventListener('musicConsentGiven', () => {
            console.log("อนุญาตให้เล่นเพลง");
            // ไม่เล่นทันที รอจนกว่า loading จะเสร็จ
        });

        // --- ดักจับ Event เมื่อ loading เสร็จแล้ว ---
        window.addEventListener('pageLoadComplete', () => {
            console.log('Page load complete - เริ่มเล่นเพลง');
            // Restore previous music state first, then autoplay if consent given
            this.restoreMusicState();
            this.startAutoPlayMusic();
        });
    }

    toggleMusic() {
        const mediaElement = this.pageAudio || this.bgVideo || this.audioElement;
        if (!mediaElement) return;

        const musicBtn = document.getElementById('musicBtn');

        if (this.isMusicPlaying) {
            // Mute media
            mediaElement.muted = true;
            // Pause only audio elements (not videos which may have visual component)
            if (mediaElement.tagName === 'AUDIO') {
                mediaElement.pause();
            }
            musicBtn.classList.remove('playing');
            musicBtn.classList.add('muted');
            this.isMusicPlaying = false;
            localStorage.setItem('muayverse_music_playing', 'false');
            console.log('Media muted');
        } else {
            // Unmute media
            mediaElement.muted = false;
            musicBtn.classList.remove('muted');
            musicBtn.classList.add('playing');
            this.isMusicPlaying = true;
            localStorage.setItem('muayverse_music_playing', 'true');
            console.log('Media unmuted');

            // ถ้า media หยุดเล่นไปแล้ว ให้เล่นใหม่
            if (mediaElement.paused) {
                mediaElement.play().catch(error => {
                    console.error('Error playing media:', error);
                    this.showNotification('ไม่สามารถเล่นเสียงได้');
                });
            }
        }
    }

    toggleMenu() {
        // Get MuayVerse app instance and toggle menu
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const menuBtn = document.getElementById('menuBtn');

        if (hamburgerMenu) {
            hamburgerMenu.classList.toggle('show');
            menuBtn.classList.toggle('active');
        }
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background-color: var(--color-secondary);
            color: var(--color-text-light);
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-size: 14px;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ตรวจสอบการยินยอมเล่นเพลงอัตโนมัติ
    checkAutoPlayConsent() {
        // ตรวจสอบ URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const autoPlay = urlParams.get('autoplay');

        // ตรวจสอบการยินยอมจาก localStorage
        const musicConsent = localStorage.getItem('muayverse_music_consent');
        const autoPlaySetting = localStorage.getItem('muayverse_autoplay');

        if (autoPlay === 'true' || (musicConsent === 'true' && autoPlaySetting === 'true')) {
            console.log('Auto-play consent detected - will start after loading completes');
            // ไม่เรียก startAutoPlayMusic() ทันที - จะเรียกหลัง pageLoadComplete event
        }

        // ล้าง URL parameter (ใช้แค่ครั้งเดียว)
        if (autoPlay === 'true') {
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        }
    }

    // เริ่มเล่นเพลงอัตโนมัติ
    startAutoPlayMusic() {
        const mediaElement = this.pageAudio || this.bgVideo || this.audioElement;
        if (!mediaElement) {
            console.log('Media element not found');
            return;
        }

        const musicBtn = document.getElementById('musicBtn');

        mediaElement.volume = 0.4;
        mediaElement.muted = false;

        // If already playing (started by page-flow), just unmute — don't restart
        if (!mediaElement.paused) {
            this.isMusicPlaying = true;
            if (musicBtn) {
                musicBtn.classList.remove('muted');
                musicBtn.classList.add('playing');
            }
            localStorage.setItem('muayverse_music_playing', 'true');
            return;
        }

        const playPromise = mediaElement.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Auto-play media started successfully');
                this.isMusicPlaying = true;
                if (musicBtn) {
                    musicBtn.classList.remove('muted');
                    musicBtn.classList.add('playing');
                }
                localStorage.setItem('muayverse_music_playing', 'true');
            }).catch(error => {
                console.log('Auto-play prevented by browser:', error);
                if (musicBtn) {
                    musicBtn.style.animation = 'pulse 1.5s ease-in-out 3';
                }
            });
        }
    }

    // เรียกคืนสถานะเสียงจาก localStorage
    restoreMusicState() {
        const musicPlaying = localStorage.getItem('muayverse_music_playing');
        const mediaElement = this.pageAudio || this.bgVideo || this.audioElement;
        const musicBtn = document.getElementById('musicBtn');

        if (!mediaElement || !musicBtn) return;

        if (musicPlaying === 'true') {
            setTimeout(() => {
                mediaElement.volume = 0.4;
                mediaElement.muted = false;
                if (mediaElement.paused) {
                    mediaElement.play().catch(error => {
                        console.log('Could not restore music state:', error);
                    });
                }
                this.isMusicPlaying = true;
                musicBtn.classList.remove('muted');
                musicBtn.classList.add('playing');
                console.log('Music state restored: playing');
            }, 500);
        } else if (musicPlaying === 'false') {
            mediaElement.muted = true;
            // Pause only audio elements
            if (mediaElement.tagName === 'AUDIO') {
                mediaElement.pause();
            }
            this.isMusicPlaying = false;
            musicBtn.classList.remove('playing');
            musicBtn.classList.add('muted');
            console.log('Music state restored: muted');
        }
    }

    // Fade volume from 0 to targetVolume over duration (ms) using rAF
    fadeInVolume(mediaElement, targetVolume, duration) {
        const startTime = performance.now();
        mediaElement.volume = 0;
        const tick = (now) => {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / duration, 1);
            mediaElement.volume = t * targetVolume;
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }
}

// Initialize Navbar when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new Navbar());
} else {
    new Navbar();
}
