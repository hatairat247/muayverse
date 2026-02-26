class ParallaxScroll {
    constructor() {
        this.heroVideo = document.getElementById('heroVideo');
        this.heroFigma = document.getElementById('heroFigma');
        this.cardsSection = document.getElementById('cardsSection');
        this.heroDescription = document.querySelector('.hero-description-figma');

        this.originalText = '';
        this.words = [];
        this.currentSection = 1;
        this.isKaraokeStarted = false;

        this.init();
    }

    init() {
        // เก็บข้อความเดิมและแบ่งเป็นตัวอักษร
        if (this.heroDescription) {
            this.originalText = this.heroDescription.textContent.trim();
            this.setupKaraokeText();
        }

        // Setup scroll event
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

        // Setup sections
        this.setupSections();

        // Initial check
        this.handleScroll();
    }

    setupSections() {
        // Hero 1 (Video) - default visible
        if (this.heroVideo) {
            this.heroVideo.style.position = 'relative';
            this.heroVideo.style.height = '100vh';
        }

        // Hero 2 (Figma) - initially hidden
        if (this.heroFigma) {
            this.heroFigma.style.minHeight = '100vh';
            this.heroFigma.style.opacity = '0';
            this.heroFigma.style.transition = 'opacity 0.8s ease-out';
        }

        // Hero 3 (Cards) - with fixed background
        if (this.cardsSection) {
            this.cardsSection.style.minHeight = '100vh';

            const cardsBackground = this.cardsSection.querySelector('.cards-background');
            if (cardsBackground) {
                cardsBackground.style.position = 'fixed';
                cardsBackground.style.top = '0';
                cardsBackground.style.left = '0';
                cardsBackground.style.width = '100%';
                cardsBackground.style.height = '100vh';
                cardsBackground.style.backgroundAttachment = 'fixed';
                cardsBackground.style.transform = 'translateY(100%)';
                cardsBackground.style.opacity = '0';
                cardsBackground.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
            }
        }
    }

    setupKaraokeText() {
        // แบ่งข้อความเป็นตัวอักษร (character splitting)
        const text = this.originalText;
        const characters = Array.from(text);

        const karaokeHTML = characters.map((char, index) => {
            // ถ้าเป็นช่องว่าง ให้ใส่ &nbsp; เพื่อคงระยะห่าง
            const displayChar = char === ' ' ? '&nbsp;' : char;
            return `<span class="karaoke-char" data-index="${index}">${displayChar}</span>`;
        }).join('');

        this.heroDescription.innerHTML = karaokeHTML;

        // เพิ่ม CSS สำหรับ karaoke effect
        this.addKaraokeStyles();
    }

    addKaraokeStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .hero-description-figma {
                line-height: 1.6;
            }

            .karaoke-char {
                display: inline-block;
                opacity: 0.2;
                filter: blur(5px);
                transform: translateY(10px);
                transition: 
                    opacity 0.6s cubic-bezier(0.2, 0, 0.2, 1),
                    filter 0.6s cubic-bezier(0.2, 0, 0.2, 1),
                    transform 0.6s cubic-bezier(0.2, 0, 0.2, 1);
            }

            .karaoke-char.active {
                opacity: 1;
                filter: blur(0px);
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    handleScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Calculate which section we're in
        const videoBottom = this.heroVideo ? this.heroVideo.offsetHeight : windowHeight;
        const figmaBottom = videoBottom + (this.heroFigma ? this.heroFigma.offsetHeight : windowHeight);

        // Section 1: Video (0 - 100vh)
        if (scrollY < videoBottom * 0.8) {
            this.currentSection = 1;
            if (this.heroFigma) this.heroFigma.style.opacity = '0';
        }
        // Section 2: Figma (100vh - 200vh)
        else if (scrollY >= videoBottom * 0.8 && scrollY < figmaBottom) {
            if (this.currentSection !== 2) {
                this.currentSection = 2;
                this.showHeroFigma();
            }

            // Calculate progress within section 2
            const sectionProgress = (scrollY - videoBottom * 0.8) / (this.heroFigma.offsetHeight);
            this.animateKaraokeText(sectionProgress);
        }
        // Section 3: Cards (200vh+) - เปลี่ยนจาก 0.8 เป็น 0.95 เพื่อให้มีเวลาแสดงตัวอักษรให้ครบก่อน
        else if (scrollY >= figmaBottom * 0.95) {
            if (this.currentSection !== 3) {
                this.currentSection = 3;
                this.showCardsSection();
            }
        }
    }

    showHeroFigma() {
        if (this.heroFigma) {
            this.heroFigma.style.opacity = '1';
        }
    }

    animateKaraokeText(progress) {
        if (!this.heroDescription) return;

        // คำนวณจำนวนตัวอักษรที่จะแสดงตาม scroll progress
        const charElements = this.heroDescription.querySelectorAll('.karaoke-char');
        const totalChars = charElements.length;
        // เพิ่ม multiplier จาก 1.2 เป็น 1.8 เพื่อให้ตัวอักษรแสดงครบเร็วขึ้น
        const activeCharCount = Math.floor(progress * totalChars * 1.8);

        charElements.forEach((char, index) => {
            if (index < activeCharCount) {
                char.classList.add('active');
            } else {
                char.classList.remove('active');
            }
        });
    }

    showCardsSection() {
        const cardsBackground = this.cardsSection?.querySelector('.cards-background');
        if (cardsBackground) {
            cardsBackground.style.transform = 'translateY(0)';
            cardsBackground.style.opacity = '1';
        }

        // Make sure all characters are visible when reaching cards section
        const charElements = this.heroDescription?.querySelectorAll('.karaoke-char');
        if (charElements) {
            charElements.forEach(char => char.classList.add('active'));
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait a bit for page flow to complete
        setTimeout(() => new ParallaxScroll(), 500);
    });
} else {
    setTimeout(() => new ParallaxScroll(), 500);
}