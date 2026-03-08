class ParallaxScroll {
    constructor() {
        this.heroVideo = document.getElementById('heroVideo');
        this.videoWrapper = document.getElementById('video-wrapper');
        this.heroFigma = document.getElementById('heroFigma');
        this.cardsSection = document.getElementById('cardsSection');
        this.heroDescription = document.querySelector('.hero-description-figma');

        this.originalText = '';
        this.words = [];
        this.currentSection = 1;
        this.isKaraokeStarted = false;

        // Lerp state
        this.targetProgress = 0;
        this.lerpedProgress = 0;

        // Parallax bag
        this.punchingBag = document.querySelector('.punching-bag-wrapper');
        this.lastScrollY = 0;
        this.bagExtraRot = 0;
        this.bagExtraTarget = 0;
        this.bagSpringAngle = 0;
        this.bagSpringVel = 0;
        this.bagIsPunching = false;

        // Hero Figma slide-up
        this.figmaYTarget = 1;
        this.figmaYLerped = 1;

        // Continue Journey parallax
        this.continueJourney = document.querySelector('.continue-journey');
        this.cjParallaxLerped = 0;

        // Stadium background parallax
        this.cardsBackground = document.querySelector('.cards-background');

        this.init();
    }

    init() {
        if (this.heroDescription) {
            this.originalText = this.heroDescription.textContent.trim();
            this.setupKaraokeText();
        }

        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

        this.sandbagSFX = new Audio('SFX/sandbag.MP3');
        this.sandbagSFX.preload = 'auto';
        this.sandbagSFX.volume = 0.7;

        if (this.punchingBag) {
            this.punchingBag.addEventListener('click', () => {
                this.bagSpringVel -= 15;
                this.bagIsPunching = true;
                this.punchingBag.classList.add('bag-punched');

                this.sandbagSFX.currentTime = 0;
                this.sandbagSFX.play().catch(() => { });

                const shockwave = document.createElement('div');
                const flash = document.createElement('div');
                shockwave.className = 'bag-shockwave';
                flash.className = 'bag-flash';
                this.punchingBag.appendChild(flash);
                this.punchingBag.appendChild(shockwave);
                shockwave.addEventListener('animationend', () => shockwave.remove());
                flash.addEventListener('animationend', () => flash.remove());
            });
        }

        this.setupSections();
        this.handleScroll();
        this.startRenderLoop();
    }

    setupSections() {
        if (this.heroVideo) {
            this.heroVideo.style.position = 'relative';
            this.heroVideo.style.display = 'block';
        }

        if (this.heroFigma) {
            this.heroFigma.style.transform = 'translateY(80vh)';
            this.heroFigma.style.opacity = '0';
            this.heroFigma.style.transition = 'none';
            this.heroFigma.style.willChange = 'transform, opacity';
        }

        if (this.heroFigma) {
            this.heroFigma.style.minHeight = '100vh';
            this.heroFigma.style.opacity = '0';
            this.heroFigma.style.transition = 'opacity 0.8s ease-out';
        }

        if (this.cardsSection) {
            this.cardsSection.style.minHeight = '100vh';
        }
        if (this.cardsBackground) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.cardsBackground.classList.add('in-view');
                    }
                });
            }, { threshold: 0.05 });
            observer.observe(this.cardsSection || this.cardsBackground);
        }
    }

    setupKaraokeText() {
        const text = this.originalText;
        const tokens = text.split(/(\s+)/);

        const karaokeHTML = tokens.map(token => {
            if (/^\s+$/.test(token)) {
                return ' ';
            }
            const chars = Array.from(token).map((char, i) => {
                return `<span class="karaoke-char">${char}</span>`;
            }).join('');
            return `<span class="karaoke-word">${chars}</span>`;
        }).join('');

        this.heroDescription.innerHTML = karaokeHTML;
        this.addKaraokeStyles();
    }

    addKaraokeStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .hero-description-figma {
                line-height: 1.6;
            }
            .karaoke-word {
                display: inline;
                white-space: nowrap;
            }
            .karaoke-char {
                display: inline;
                opacity: 0.2;
                filter: blur(4px);
                transition: 
                    opacity 0.5s cubic-bezier(0.2, 0, 0.2, 1),
                    filter 0.5s cubic-bezier(0.2, 0, 0.2, 1);
            }
            .karaoke-char.active {
                opacity: 1;
                filter: blur(0px);
            }
        `;
        document.head.appendChild(style);
    }

    startRenderLoop() {
        const navbarH = 80;
        const LERP_FACTOR = 0.065;
        const MAX_BLUR = 7;
        const BLUR_VELOCITY_SCALE = 60;
        const isMobile = () => window.innerWidth <= 767;

        const tick = () => {
            const prev = this.lerpedProgress;
            this.lerpedProgress += (this.targetProgress - this.lerpedProgress) * LERP_FACTOR;
            const velocity = Math.abs(this.lerpedProgress - prev);
            const blurAmount = Math.min(velocity * BLUR_VELOCITY_SCALE, MAX_BLUR);

            if (this.videoWrapper) {
                const t = this.lerpedProgress;

                if (isMobile()) {
                    // ===== Mobile: หดตัวคล้าย desktop แต่ปรับสัดส่วนให้เหมาะกับจอเล็ก =====
                    const topClip = t * (navbarH + 10);                    // 0 → ~90px
                    const sideClip = t * 20;                                // 0 → 20px
                    const bottomClip = t * (window.innerHeight * 0.25);       // 0 → 25vh
                    const radius = t * 14;                                // 0 → 14px

                    this.videoWrapper.style.clipPath =
                        `inset(${topClip.toFixed(2)}px ${sideClip.toFixed(2)}px ${bottomClip.toFixed(2)}px ${sideClip.toFixed(2)}px round ${radius.toFixed(2)}px)`;
                    this.videoWrapper.style.filter =
                        blurAmount > 0.15 ? `blur(${blurAmount.toFixed(2)}px)` : 'none';
                    this.videoWrapper.style.zIndex = this.targetProgress >= 1 ? '997' : '1000';

                } else {
                    // ===== Desktop =====
                    const topClip = t * (navbarH + 20);
                    const sideClip = t * 40;
                    const bottomClip = t * (window.innerHeight * 0.28);
                    const radius = t * 16;

                    this.videoWrapper.style.clipPath =
                        `inset(${topClip.toFixed(2)}px ${sideClip.toFixed(2)}px ${bottomClip.toFixed(2)}px ${sideClip.toFixed(2)}px round ${radius.toFixed(2)}px)`;
                    this.videoWrapper.style.filter =
                        blurAmount > 0.15 ? `blur(${blurAmount.toFixed(2)}px)` : 'none';
                    this.videoWrapper.style.zIndex = this.targetProgress >= 1 ? '997' : '1000';
                }
            }

            // ===== Hero Figma slide-up =====
            this.figmaYLerped += (this.figmaYTarget - this.figmaYLerped) * 0.07;
            if (this.heroFigma) {
                const translateY = this.figmaYLerped * 80;
                const opacity = 1 - this.figmaYLerped;
                this.heroFigma.style.transform = `translateY(${translateY.toFixed(2)}vh)`;
                this.heroFigma.style.opacity = Math.max(0, opacity).toFixed(3);
            }

            // ===== Punching Bag Parallax =====
            if (this.punchingBag) {
                this.bagExtraTarget *= 0.85;
                this.bagExtraRot += (this.bagExtraTarget - this.bagExtraRot) * 0.08;

                const springForce = -0.055 * this.bagSpringAngle;
                const dragForce = -0.10 * this.bagSpringVel;
                this.bagSpringVel += springForce + dragForce;
                this.bagSpringAngle += this.bagSpringVel;

                if (this.bagIsPunching &&
                    Math.abs(this.bagSpringAngle) < 0.08 &&
                    Math.abs(this.bagSpringVel) < 0.08) {
                    this.bagSpringAngle = 0;
                    this.bagSpringVel = 0;
                    this.bagIsPunching = false;
                    this.punchingBag.classList.remove('bag-punched');
                }

                const totalRot = this.bagExtraRot + this.bagSpringAngle;
                this.punchingBag.style.setProperty('--bag-rot', `${totalRot.toFixed(2)}deg`);
            }

            // ===== Continue Journey Parallax =====
            if (this.continueJourney) {
                const shrinkEndPx = window.innerHeight * 0.55;
                const pauseEndPx = shrinkEndPx + (window.innerHeight * 0.30);
                const rawCJ = Math.max(window.scrollY - pauseEndPx, 0);
                const cjTarget = rawCJ * -0.12;
                this.cjParallaxLerped += (cjTarget - this.cjParallaxLerped) * 0.05;
                this.continueJourney.style.setProperty('--cj-parallax', `${this.cjParallaxLerped.toFixed(2)}px`);
            }

            requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }

    handleScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const shrinkEnd = windowHeight * 0.55;

        this.targetProgress = Math.min(Math.max(scrollY / shrinkEnd, 0), 1);

        const scrollDelta = scrollY - this.lastScrollY;
        this.bagExtraTarget += scrollDelta * 0.04;
        this.bagExtraTarget = Math.max(-10, Math.min(10, this.bagExtraTarget));
        this.lastScrollY = scrollY;

        // Mobile: fade out video เมื่อ scroll เข้าใกล้ cards section

        const shrinkEndPx = windowHeight * 0.55;
        const pauseEndPx = shrinkEndPx + (windowHeight * 0.30);
        const videoBottom = this.heroVideo ? this.heroVideo.offsetHeight : windowHeight;
        const figmaBottom = videoBottom + (this.heroFigma ? this.heroFigma.offsetHeight : windowHeight);

        const pauseStart = shrinkEndPx + (windowHeight * 0.10);
        const rawFigma = (scrollY - pauseStart) / (pauseEndPx - pauseStart);
        this.figmaYTarget = 1 - Math.min(Math.max(rawFigma, 0), 1);

        if (scrollY < pauseEndPx) {
            this.currentSection = 1;
        }
        else if (scrollY >= pauseEndPx && scrollY < figmaBottom) {
            if (this.currentSection !== 2) {
                this.currentSection = 2;
                this.showHeroFigma();
            }
            const sectionProgress = (scrollY - pauseEndPx) / (this.heroFigma.offsetHeight);
            this.animateKaraokeText(sectionProgress);
        }
        else if (scrollY >= figmaBottom * 0.95) {
            if (this.currentSection !== 3) {
                this.currentSection = 3;
                this.showCardsSection();
            }
        }
    }

    showHeroFigma() { }

    animateKaraokeText(progress) {
        if (!this.heroDescription) return;
        const charElements = this.heroDescription.querySelectorAll('.karaoke-char');
        const totalChars = charElements.length;
        const activeCharCount = Math.min(Math.floor(progress * totalChars * 1.8), totalChars);

        charElements.forEach((char, index) => {
            if (index < activeCharCount) {
                char.classList.add('active');
            } else {
                char.classList.remove('active');
            }
        });
    }

    showCardsSection() {
        const charElements = this.heroDescription?.querySelectorAll('.karaoke-char');
        if (charElements) {
            charElements.forEach(char => char.classList.add('active'));
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => new ParallaxScroll(), 500);
    });
} else {
    setTimeout(() => new ParallaxScroll(), 500);
}