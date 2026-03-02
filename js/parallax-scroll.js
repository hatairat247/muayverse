class ParallaxScroll {
    constructor() {
        this.heroVideo    = document.getElementById('heroVideo');
        this.videoWrapper = document.getElementById('video-wrapper');
        this.heroFigma    = document.getElementById('heroFigma');
        this.cardsSection = document.getElementById('cardsSection');
        this.heroDescription = document.querySelector('.hero-description-figma');

        this.originalText = '';
        this.words        = [];
        this.currentSection = 1;
        this.isKaraokeStarted = false;

        // Lerp state — animation chases scroll smoothly
        this.targetProgress = 0;
        this.lerpedProgress = 0;

        // Parallax bag
        this.punchingBag     = document.querySelector('.punching-bag-wrapper');
        this.lastScrollY     = 0;
        this.bagExtraRot     = 0;
        this.bagExtraTarget  = 0;
        // Spring physics for click-punch
        this.bagSpringAngle  = 0;
        this.bagSpringVel    = 0;
        this.bagIsPunching   = false;

        // Hero Figma slide-up
        this.figmaYTarget  = 1;   // 1 = off-screen below, 0 = in place
        this.figmaYLerped  = 1;

        // Continue Journey parallax
        this.continueJourney = document.querySelector('.continue-journey');
        this.cjParallaxLerped = 0;

        // Stadium background parallax
        this.cardsBackground = document.querySelector('.cards-background');

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

        // Preload sandbag SFX
        this.sandbagSFX = new Audio('SFX/sandbag.MP3');
        this.sandbagSFX.preload = 'auto';
        this.sandbagSFX.volume = 0.7;

        // Click-to-punch bag interaction
        if (this.punchingBag) {
            this.punchingBag.addEventListener('click', () => {
                // Spring impulse kick
                this.bagSpringVel -= 15;
                this.bagIsPunching = true;
                this.punchingBag.classList.add('bag-punched');

                // Play sandbag SFX (restart if already playing)
                this.sandbagSFX.currentTime = 0;
                this.sandbagSFX.play().catch(() => {});

                // Spawn shockwave + flash impact behind bag
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

        // Initial check
        this.handleScroll();

        // Start smooth render loop
        this.startRenderLoop();
    }

    setupSections() {
        // Hero 1 (Video) - sticky shrink animation
        if (this.heroVideo) {
            this.heroVideo.style.position = 'relative';
            this.heroVideo.style.display  = 'block';
            // Height is controlled by CSS (260vh) — don't override
        }
        // videoWrapper clip-path is handled by startRenderLoop

        // Hero 2 (Figma) - start off-screen below, slide up during pause
        if (this.heroFigma) {
            this.heroFigma.style.transform  = 'translateY(80vh)';
            this.heroFigma.style.opacity    = '0';
            this.heroFigma.style.transition = 'none'; // JS-driven, no CSS transition
            this.heroFigma.style.willChange = 'transform, opacity';
        }

        // Hero 2 (Figma) - initially hidden
        if (this.heroFigma) {
            this.heroFigma.style.minHeight = '100vh';
            this.heroFigma.style.opacity = '0';
            this.heroFigma.style.transition = 'opacity 0.8s ease-out';
        }

        // Hero 3 (Cards) - background handled by JS parallax
        if (this.cardsSection) {
            this.cardsSection.style.minHeight = '100vh';
        }
        if (this.cardsBackground) {
            // IntersectionObserver triggers slide-up CSS transition
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
        // Split into words, keep spaces as separate tokens
        const tokens = text.split(/(\s+)/);

        const karaokeHTML = tokens.map(token => {
            if (/^\s+$/.test(token)) {
                // Whitespace — render as plain space between words
                return ' ';
            }
            // Wrap each character inside a word-span so line breaks only happen between words
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

            /* word wrapper — keeps characters together, allows break between words */
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
        const navbarH        = 80;
        const LERP_FACTOR    = 0.065;  // lower = more lag/float, higher = snappier
        const MAX_BLUR       = 7;      // px
        const BLUR_VELOCITY_SCALE = 60;

        const tick = () => {
            // Lerp toward scroll target — this IS the easing
            const prev = this.lerpedProgress;
            this.lerpedProgress += (this.targetProgress - this.lerpedProgress) * LERP_FACTOR;

            // Velocity drives the motion blur naturally
            const velocity   = Math.abs(this.lerpedProgress - prev);
            const blurAmount = Math.min(velocity * BLUR_VELOCITY_SCALE, MAX_BLUR);

            if (this.videoWrapper) {
                const t = this.lerpedProgress;

                // clip-path values
                const topClip    = t * (navbarH + 20);                        // 0 → 100px (gap below navbar)
                const sideClip   = t * 40;                                    // 0 → 40px
                const bottomClip = t * (window.innerHeight * 0.28);          // 0 → 28vh
                const radius     = t * 16;                                    // 0 → 16px

                this.videoWrapper.style.clipPath =
                    `inset(${topClip.toFixed(2)}px ${sideClip.toFixed(2)}px ${bottomClip.toFixed(2)}px ${sideClip.toFixed(2)}px round ${radius.toFixed(2)}px)`;

                this.videoWrapper.style.filter =
                    blurAmount > 0.15 ? `blur(${blurAmount.toFixed(2)}px)` : 'none';

                // Drop below navbar once fully shrunk
                this.videoWrapper.style.zIndex = this.targetProgress >= 1 ? '997' : '1000';
            }

            // ===== Hero Figma slide-up =====
            this.figmaYLerped += (this.figmaYTarget - this.figmaYLerped) * 0.07;
            if (this.heroFigma) {
                const translateY = this.figmaYLerped * 80;  // 0 → 80vh
                const opacity    = 1 - this.figmaYLerped;
                this.heroFigma.style.transform = `translateY(${translateY.toFixed(2)}vh)`;
                this.heroFigma.style.opacity   = Math.max(0, opacity).toFixed(3);
            }

            // ===== Punching Bag Parallax =====
            if (this.punchingBag) {
                // Scroll-driven rotation (decays to 0)
                this.bagExtraTarget *= 0.85;
                this.bagExtraRot += (this.bagExtraTarget - this.bagExtraRot) * 0.08;

                // Spring physics for click-punch (runs every frame, blends smoothly)
                const springForce = -0.055 * this.bagSpringAngle;
                const dragForce   = -0.10 * this.bagSpringVel;
                this.bagSpringVel   += springForce + dragForce;
                this.bagSpringAngle += this.bagSpringVel;

                // Detect settled → remove bag-punched class
                if (this.bagIsPunching &&
                    Math.abs(this.bagSpringAngle) < 0.08 &&
                    Math.abs(this.bagSpringVel) < 0.08) {
                    this.bagSpringAngle = 0;
                    this.bagSpringVel   = 0;
                    this.bagIsPunching  = false;
                    this.punchingBag.classList.remove('bag-punched');
                }

                // Combine scroll + spring into one CSS variable
                const totalRot = this.bagExtraRot + this.bagSpringAngle;
                this.punchingBag.style.setProperty('--bag-rot', `${totalRot.toFixed(2)}deg`);
            }

            // ===== Continue Journey Parallax =====
            if (this.continueJourney) {
                const shrinkEndPx = window.innerHeight * 0.55;
                const pauseEndPx  = shrinkEndPx + (window.innerHeight * 0.30);
                const rawCJ = Math.max(window.scrollY - pauseEndPx, 0);
                const cjTarget = rawCJ * -0.12;  // scrolling down = floats up
                this.cjParallaxLerped += (cjTarget - this.cjParallaxLerped) * 0.05;
                this.continueJourney.style.setProperty('--cj-parallax', `${this.cjParallaxLerped.toFixed(2)}px`);
            }

            requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }

    handleScroll() {
        const scrollY      = window.scrollY;
        const windowHeight = window.innerHeight;
        const shrinkEnd = windowHeight * 0.55;  // animation spans 55vh

        // Update lerp target (raw, clamped — lerp handles easing)
        this.targetProgress = Math.min(Math.max(scrollY / shrinkEnd, 0), 1);

        // Punching bag: kick extra rotation from scroll velocity
        const scrollDelta = scrollY - this.lastScrollY;
        this.bagExtraTarget += scrollDelta * 0.04;  // scale scroll speed → degrees
        this.bagExtraTarget  = Math.max(-10, Math.min(10, this.bagExtraTarget)); // clamp ±10deg
        this.lastScrollY = scrollY;

        // Calculate which section we're in
        const shrinkEndPx  = windowHeight * 0.55;
        const pauseEndPx   = shrinkEndPx + (windowHeight * 0.30); // 30vh pause after shrink
        const videoBottom  = this.heroVideo ? this.heroVideo.offsetHeight : windowHeight;
        const figmaBottom  = videoBottom + (this.heroFigma ? this.heroFigma.offsetHeight : windowHeight);

        // Figma slide-up: starts at 40% into pause, fully up by end of pause
        const pauseStart   = shrinkEndPx + (windowHeight * 0.10); // start sliding at 10vh into pause
        const rawFigma     = (scrollY - pauseStart) / (pauseEndPx - pauseStart);
        this.figmaYTarget  = 1 - Math.min(Math.max(rawFigma, 0), 1);

        // Section 1: Video
        if (scrollY < pauseEndPx) {
            this.currentSection = 1;
        }
        // Section 2: Figma
        else if (scrollY >= pauseEndPx && scrollY < figmaBottom) {
            if (this.currentSection !== 2) {
                this.currentSection = 2;
                this.showHeroFigma();
            }

            // Calculate progress within section 2
            const sectionProgress = (scrollY - pauseEndPx) / (this.heroFigma.offsetHeight);
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
        // opacity & transform now driven by rAF loop via figmaYTarget — nothing to do here
    }

    animateKaraokeText(progress) {
        if (!this.heroDescription) return;

        // คำนวณจำนวนตัวอักษรที่จะแสดงตาม scroll progress
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