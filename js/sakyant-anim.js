/**
 * SakYantAnim — Title fly-in + scroll-locked karaoke description + Gao Yord reveal
 * The first section stays sticky while scrolling reveals text character-by-character.
 * Once all text is revealed, the section unlocks and user can scroll to Gao Yord.
 */
class SakYantAnim {
    constructor() {
        this.bg = document.querySelector('.sakyant-bg');
        this.title = document.querySelector('.main-title');
        this.descSection = document.querySelector('.description-section');
        this.yantras = document.querySelectorAll('.yantra-img');
        this.section = document.querySelector('.sakyant-section');
        this.contentWrap = document.querySelector('.sakyant-content');
        this.scrollLock = document.querySelector('.sakyant-scroll-lock');

        // Gao Yord section elements
        this.gaoyordPapers = document.querySelector('.gaoyord-papers');
        this.gaoyordText = document.querySelector('.gaoyord-text');
        this.gaoyordSection = document.querySelector('.gaoyord-section');

        this.scrollY = 0;
        this.lastScrollY = 0;
        this.scrollDirection = 0; // 1 = down, -1 = up
        this.ticking = false;
        this.karaokeComplete = false;
        this.isSnapScrolling = false;

        // Mouse parallax state
        this.mouse = { x: 0, y: 0 };
        this.parallaxTicking = false;
        this.decoLeft = document.querySelector('.gaoyord-deco-left');
        this.decoRight = document.querySelector('.gaoyord-deco-right');

        // Sound effects - Lazy loaded for performance
        this.pickupSound = null;
        this.swipeSound = null;
        this.slidePaperSound = null;
        this.typingSound = null;
        this.soundsLoaded = false;
        
        this.isTypingSoundPlaying = false;
        this.typingStopTimeout = null;

        // ── เช็คสถานะเสียงจาก navbar ──
        this.pageAudio = document.querySelector('.page-audio');

        // ── ใช้ getter แทน cache — เช็คทุกครั้งที่เรียกใช้ ──
        this._seQuery = window.matchMedia('(max-width: 430px) and (orientation: portrait)');

        // ── karaokeEnd: ค่าน้อย = karaoke จบเร็ว + pause นานขึ้น ──
        this._isTablet = window.innerWidth >= 769 && window.innerWidth <= 1367;
        this.karaokeEnd = this._isTablet ? 0.25 : 0.25;
        this.snapTriggered = false;

        console.log(`[SE] init: w=${window.innerWidth} h=${window.innerHeight} isSE=${this._seQuery.matches} isTablet=${this._isTablet} karaokeEnd=${this.karaokeEnd}`);

        this._splitTitle();
        this._wrapDescriptionChars();
        this._wrapYantDescWords();
        this._setupScrollObserver();
        this._setupPaperSwitch();
        this._bindEvents();
        this._startEntrance();
        this.wordHoverEnabled = true;

        // ── FIX: ยึดความสูง gaoyord-section ตาม Hah Taew (slide ที่ยาวสุด) ──
        // รอ fonts โหลดเสร็จก่อนวัด
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                this._fixGaoyordHeight();
            });
        } else {
            // fallback: วัดหลัง 500ms
            setTimeout(() => this._fixGaoyordHeight(), 500);
        }

        // วัดใหม่เมื่อ resize (debounced)
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this._fixGaoyordHeight();
                // อัปเดต karaokeEnd เมื่อ resize เปลี่ยน breakpoint
                this._isTablet = window.innerWidth >= 769 && window.innerWidth <= 1367;
                this.karaokeEnd = this._isTablet ? 0.25 : 0.25;
                this.snapTriggered = false;
            }, 150);
        });
    }

    /* ─────────────────────────────────────────────────────────────
       FIX: ล็อค min-height ตาม Hah Taew — เฉพาะ mobile/tablet
       Desktop (>1024px) ใช้ normal flow เหมือนเดิม ไม่แตะ
       ───────────────────────────────────────────────────────────── */
    _fixGaoyordHeight() {
        const textContainer = this.gaoyordText;
        const section = this.gaoyordSection;
        if (!textContainer || !section) return;

        // Desktop: reset กลับให้ natural flow ทำงานปกติ
        if (window.matchMedia('(min-width: 1025px)').matches) {
            textContainer.style.removeProperty('min-height');
            section.style.removeProperty('min-height');
            return;
        }

        const hateaw = section.querySelector('[data-text="hateaw"]');
        if (!hateaw) return;

        textContainer.style.minHeight = '';
        section.style.minHeight = '';

        // ชั่วคราว force Hah Taew เป็น relative เพื่อวัด
        const saved = {
            position:      hateaw.style.position,
            opacity:       hateaw.style.opacity,
            visibility:    hateaw.style.visibility,
            pointerEvents: hateaw.style.pointerEvents,
            filter:        hateaw.style.filter,
        };
        hateaw.style.setProperty('position',       'relative', 'important');
        hateaw.style.setProperty('opacity',        '0',        'important');
        hateaw.style.setProperty('visibility',     'hidden',   'important');
        hateaw.style.setProperty('pointer-events', 'none',     'important');
        hateaw.style.setProperty('filter',         'none',     'important');

        const hateawH = hateaw.offsetHeight;

        // restore
        hateaw.style.position      = saved.position;
        hateaw.style.opacity       = saved.opacity;
        hateaw.style.visibility    = saved.visibility;
        hateaw.style.pointerEvents = saved.pointerEvents;
        hateaw.style.filter        = saved.filter;

        if (hateawH <= 0) return;

        const textMinH = hateawH + 8;
        textContainer.style.setProperty('min-height', textMinH + 'px', 'important');

        requestAnimationFrame(() => {
            const contentEl = section.querySelector('.gaoyord-content');
            if (contentEl) {
                section.style.setProperty('min-height', (contentEl.offsetHeight + 40) + 'px', 'important');
            }
            console.log(`[fixHeight] mobile hateawH=${hateawH} textMinH=${textMinH}`);
        });
    }

    /* ── วัด top ของ title แล้ว set top ของ papers ให้ตรงกัน ── */
    /* ─── Split title into individual <span class="char">, preserving <br> ─── */
    _splitTitle() {
        if (!this.title) return;
        this.titleChars = [];

        const nodes = Array.from(this.title.childNodes);
        this.title.innerHTML = '';

        nodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
                this.title.appendChild(document.createElement('br'));
            } else if (node.nodeType === Node.TEXT_NODE) {
                for (const ch of node.textContent) {
                    if (ch === ' ') {
                        const space = document.createElement('span');
                        space.className = 'char-space';
                        space.innerHTML = '&nbsp;';
                        this.title.appendChild(space);
                    } else {
                        const span = document.createElement('span');
                        span.className = 'char';
                        span.textContent = ch;
                        this.title.appendChild(span);
                        this.titleChars.push(span);
                    }
                }
            }
        });
    }

    /* ─── Wrap every character in description paragraphs ─── */
    _wrapDescriptionChars() {
        if (!this.descSection) return;
        const paragraphs = this.descSection.querySelectorAll('p');
        this.descChars = [];
        this.descWords = [];

        paragraphs.forEach(p => {
            const wrappedHTML = this._wrapNodeChars(p);
            p.innerHTML = wrappedHTML;
            p.querySelectorAll('.desc-char').forEach(c => this.descChars.push(c));
            p.querySelectorAll('.word').forEach(w => this.descWords.push(w));
        });
    }

    _wrapNodeChars(node) {
        let html = '';
        node.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                const words = child.textContent.split(/(\s+)/);
                words.forEach(word => {
                    if (/^\s+$/.test(word)) {
                        html += word;
                    } else {
                        html += '<span class="word">';
                        for (const ch of word) {
                            html += `<span class="desc-char">${ch}</span>`;
                        }
                        html += '</span>';
                    }
                });
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                if (child.tagName === 'BR') {
                    html += '<br>';
                } else {
                    const tag = child.tagName.toLowerCase();
                    const attrs = child.attributes;
                    let attrStr = '';
                    for (let i = 0; i < attrs.length; i++) {
                        attrStr += ` ${attrs[i].name}="${attrs[i].value}"`;
                    }
                    html += `<${tag}${attrStr}>${this._wrapNodeChars(child)}</${tag}>`;
                }
            }
        });
        return html;
    }

    /* ─── เช็คว่าเสียงเปิดหรือปิดจาก navbar ─── */
    _isMusicEnabled() {
        // เช็คจาก localStorage ก่อน
        const isMusicPlaying = localStorage.getItem('muayverse_music_playing') === 'true';
        if (isMusicPlaying) return true;
        
        // เช็คจาก pageAudio.muted
        if (this.pageAudio && !this.pageAudio.muted) return true;
        
        return false;
    }

    /* ─── Lazy load sound effects (performance optimization) ─── */
    _loadSounds() {
        if (this.soundsLoaded) return;
        
        this.pickupSound = new Audio('SFX/Sakyant SFX/Pickuppaper.MP3');
        this.swipeSound = new Audio('SFX/Sakyant SFX/Swipe Paper.MP3');
        this.slidePaperSound = new Audio('SFX/Sakyant SFX/Slide Paper.MP3');
        this.typingSound = new Audio('SFX/Sakyant SFX/typing.MP3');
        
        this.pickupSound.volume = 0.5;
        this.swipeSound.volume = 0.5;
        this.slidePaperSound.volume = 0.6;
        this.typingSound.volume = 0.6;
        this.typingSound.loop = true;
        
        this.soundsLoaded = true;
        console.log('[Performance] Sound effects loaded');
    }

    /* ─── Event bindings ─── */
    _bindEvents() {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY || window.pageYOffset;
            this.scrollDirection = currentScrollY > this.lastScrollY ? 1 : -1;
            this.lastScrollY = currentScrollY;
            this.scrollY = currentScrollY;
            
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this._onScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX / window.innerWidth;
            this.mouse.y = e.clientY / window.innerHeight;
            
            if (!this.parallaxTicking) {
                requestAnimationFrame(() => {
                    this._updateParallax();
                    this.parallaxTicking = false;
                });
                this.parallaxTicking = true;
            }
        }, { passive: true });

        this._setupYantWordHover();
    }

    /* ─── Mouse parallax effect on yellow deco yantras ─── */
    _updateParallax() {
        if (!this.decoLeft || !this.decoRight) return;

        const moveX = (this.mouse.x - 0.5) * 40;
        const moveY = (this.mouse.y - 0.5) * 40;

        this.decoLeft.style.transform = `rotate(18.66deg) translate3d(${-moveX}px, ${-moveY}px, 0)`;
        this.decoRight.style.transform = `rotate(31.94deg) translate3d(${moveX * 0.8}px, ${moveY * 0.8}px, 0)`;
    }

    /* ─── Entrance animation — stagger title chars ─── */
    _startEntrance() {
        if (!this.titleChars) return;
        this.titleChars.forEach((char, i) => {
            setTimeout(() => {
                char.classList.add('visible');
            }, 80 + i * 35);
        });

        const titleDuration = 80 + this.titleChars.length * 35 + 400;
        setTimeout(() => {
            this._glowYantras();
        }, titleDuration);
    }

    /* ─── Scroll handler ─── */
    _onScroll() {
        if (!this.scrollLock || !this.section) return;

        const lockRect = this.scrollLock.getBoundingClientRect();
        const navbarH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 96;
        const sectionH = this.section.offsetHeight;
        const scrollableDistance = this.scrollLock.offsetHeight - sectionH;

        const scrolled = -(lockRect.top - navbarH);
        const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

        // ── karaokeEnd ปรับตาม breakpoint (0.9 สำหรับ iPad, 0.5 สำหรับ desktop/mobile) ──
        const karaokeProgress = Math.min(progress / this.karaokeEnd, 1);
        this._revealDescription(karaokeProgress);

        if (this.contentWrap) {
            const fadeStart = 0.7;
            if (progress > fadeStart) {
                const fadeProgress = (progress - fadeStart) / (1 - fadeStart);
                const eased = fadeProgress * fadeProgress;
                this.contentWrap.style.opacity = 1 - eased * 0.85;
            } else {
                this.contentWrap.style.opacity = '';
            }
        }

        // ── Scroll Snap: แม่เหล็กดึงไป Section 2 หรือกลับ Section 1 ──
        // Down scroll: ถ้า progress > 85% และกำลัง scroll ลง → snap ไป Section 2
        if (progress >= 0.85 && this.scrollDirection > 0 && !this.snapTriggered && !this.isSnapScrolling) {
            this.snapTriggered = true;
            this.karaokeComplete = true;
            this._smoothScrollToSection2();
        }
        // Up scroll: เช็คว่าอยู่ระหว่าง Section 1 และ Section 2 และกำลัง scroll ขึ้น → snap กลับ Section 1
        else if (progress > 0.88 && progress < 1 && this.scrollDirection < 0 && this.snapTriggered && !this.isSnapScrolling) {
            this.snapTriggered = false;
            this._smoothScrollToSection1();
        }
        // Reset snap trigger
        else if (progress < 0.05) {
            this.karaokeComplete = false;
            this.snapTriggered = false;
        } else if (progress >= 0.95) {
            this.karaokeComplete = true;
        }
    }

    /* ─── Karaoke description reveal ─── */
    _revealDescription(t) {
        if (!this.descWords || this.descWords.length === 0) return;
        const total = this.descWords.length;
        const activeCount = Math.min(Math.floor(t * total), total);

        if (t > 0 && t < 1) {
            if (!this.isTypingSoundPlaying && this._isMusicEnabled()) {
                this._loadSounds(); // Lazy load sounds when first needed
                if (this.typingSound) {
                    this.typingSound.play().catch(e => console.log('Typing sound failed:', e));
                    this.isTypingSoundPlaying = true;
                }
            }
            if (this.typingStopTimeout) clearTimeout(this.typingStopTimeout);
            this.typingStopTimeout = setTimeout(() => {
                if (this.typingSound) {
                    this.typingSound.pause();
                    this.isTypingSoundPlaying = false;
                }
            }, 300);
        } else if (t >= 1 || t <= 0) {
            if (this.isTypingSoundPlaying && this.typingSound) {
                this.typingSound.pause();
                this.isTypingSoundPlaying = false;
            }
            if (this.typingStopTimeout) clearTimeout(this.typingStopTimeout);
        }

        this.descWords.forEach((word, i) => {
            if (i < activeCount) {
                word.classList.add('active');
            } else {
                word.classList.remove('active');
            }
        });
    }

    /* ─── Yantra glow effect ─── */
    _glowYantras() {
        this.yantras.forEach(img => {
            img.classList.add('glow');
        });
    }

    /* ─── 5-slide swipe carousel ─── */
    _setupPaperSwitch() {
        const papersContainer = document.querySelector('.gaoyord-papers');
        if (!papersContainer) return;

        this.slideOrder = ['kaoyod', 'hateaw', 'hanuman', 'sueku', 'padtid'];
        this.currentSlide = 0;
        this.isAnimating = false;

        this.paperSlides = {};
        this.textSlides = {};
        this.slideOrder.forEach(key => {
            this.paperSlides[key] = papersContainer.querySelector(`[data-yant="${key}"]`);
            this.textSlides[key] = document.querySelector(`[data-text="${key}"]`);
        });

        this._applySlideState();

        this._swipeState = {
            isDragging: false,
            startX: 0,
            startY: 0,
            currentX: 0,
            threshold: 60,
        };

        papersContainer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this._onSwipeStart(e.clientX, e.clientY, e);
        });
        window.addEventListener('mousemove', (e) => {
            if (this._swipeState.isDragging) e.preventDefault();
            this._onSwipeMove(e.clientX, e.clientY);
        });
        window.addEventListener('mouseup', () => this._onSwipeEnd());

        papersContainer.addEventListener('touchstart', (e) => {
            const t = e.touches[0];
            this._onSwipeStart(t.clientX, t.clientY, e);
        }, { passive: true });
        window.addEventListener('touchmove', (e) => {
            const t = e.touches[0];
            this._onSwipeMove(t.clientX, t.clientY);
        }, { passive: true });
        window.addEventListener('touchend', () => this._onSwipeEnd());
    }

    _onSwipeStart(x, y, e) {
        if (this.isAnimating) return;
        const s = this._swipeState;
        s.isDragging = true;
        s.startX = x;
        s.startY = y;
        s.currentX = 0;

        if (this._isMusicEnabled()) {
            this._loadSounds(); // Lazy load sounds when first needed
            if (this.pickupSound) {
                this.pickupSound.currentTime = 0;
                this.pickupSound.play().catch(e => console.log('Audio play failed:', e));
            }
        }

        this.wordHoverEnabled = false;
        document.querySelectorAll('.yant-word').forEach(word => {
            word.classList.remove('glow');
            word.style.removeProperty('color');
            word.style.removeProperty('text-shadow');
        });

        const frontKey = this.slideOrder[this.currentSlide];
        const frontPaper = this.paperSlides[frontKey];
        if (frontPaper) {
            frontPaper.classList.add('paper-dragging');
            frontPaper.classList.remove('paper-front');
        }
    }

    _onSwipeMove(x, y) {
        const s = this._swipeState;
        if (!s.isDragging) return;

        const dx = x - s.startX;
        s.currentX = dx;

        const frontKey = this.slideOrder[this.currentSlide];
        const frontPaper = this.paperSlides[frontKey];
        if (!frontPaper) return;

        const maxRotate = 15;
        const containerW = frontPaper.parentElement.offsetWidth || 500;
        const progress = dx / containerW;
        const rotate = -6.92 + progress * maxRotate;
        const opacity = Math.max(1 - Math.abs(progress) * 0.6, 0.3);

        frontPaper.style.transform = `translateX(${dx}px) rotate(${rotate}deg)`;
        frontPaper.style.opacity = opacity;
    }

    _onSwipeEnd() {
        const s = this._swipeState;
        if (!s.isDragging) return;
        s.isDragging = false;

        const frontKey = this.slideOrder[this.currentSlide];
        const frontPaper = this.paperSlides[frontKey];
        if (!frontPaper) return;

        const dx = s.currentX;

        if (Math.abs(dx) > s.threshold) {
            const direction = dx < 0 ? 'left' : 'right';
            this.isAnimating = true;

            if (this._isMusicEnabled()) {
                this._loadSounds(); // Lazy load sounds when first needed
                if (this.swipeSound) {
                    this.swipeSound.currentTime = 0;
                    this.swipeSound.play().catch(e => console.log('Audio play failed:', e));
                }
            }

            const flingX = direction === 'left' ? -600 : 600;
            const flingRotate = direction === 'left' ? -30 : 20;
            frontPaper.classList.remove('paper-dragging');
            frontPaper.classList.add('paper-exit');
            frontPaper.style.transform = `translateX(${flingX}px) rotate(${flingRotate}deg)`;
            frontPaper.style.opacity = '0';

            const prevSlide = this.currentSlide;
            if (direction === 'right') {
                this.currentSlide = (this.currentSlide + 1) % this.slideOrder.length;
            } else {
                this.currentSlide = (this.currentSlide - 1 + this.slideOrder.length) % this.slideOrder.length;
            }

            this._animateSlideTransition(prevSlide);
        } else {
            frontPaper.classList.remove('paper-dragging');
            frontPaper.classList.add('paper-front');
            frontPaper.style.transform = '';
            frontPaper.style.opacity = '';
            this.wordHoverEnabled = true;
        }
    }

    _applySlideState() {
        const total = this.slideOrder.length;
        const frontKey = this.slideOrder[this.currentSlide];
        const backKey = this.slideOrder[(this.currentSlide + 1) % total];

        this.slideOrder.forEach(key => {
            const paper = this.paperSlides[key];
            const text = this.textSlides[key];
            if (!paper) return;

            paper.classList.remove('paper-front', 'paper-back', 'paper-exit', 'paper-dragging', 'paper-promoting');
            paper.style.transform = '';
            paper.style.opacity = '';

            if (key === frontKey) {
                paper.classList.add('paper-front');
                text?.classList.add('active');
            } else if (key === backKey) {
                paper.classList.add('paper-back');
                text?.classList.remove('active');
            } else {
                text?.classList.remove('active');
            }
        });
    }

    _animateSlideTransition(prevIndex) {
        const total = this.slideOrder.length;
        const exitKey = this.slideOrder[prevIndex];
        const frontKey = this.slideOrder[this.currentSlide];
        const backKey = this.slideOrder[(this.currentSlide + 1) % total];

        this.slideOrder.forEach(key => {
            if (key === exitKey) return;
            const paper = this.paperSlides[key];
            if (!paper) return;
            paper.classList.remove('paper-front', 'paper-back', 'paper-exit', 'paper-dragging', 'paper-promoting');
            paper.style.transform = '';
            paper.style.opacity = '0';
        });

        const frontPaper = this.paperSlides[frontKey];
        if (frontPaper) {
            frontPaper.classList.add('paper-back');
            frontPaper.style.opacity = '1';
            requestAnimationFrame(() => {
                frontPaper.classList.remove('paper-back');
                frontPaper.classList.add('paper-promoting');
                frontPaper.style.opacity = '';
            });
        }

        // Switch text
        this.slideOrder.forEach(key => {
            const text = this.textSlides[key];
            if (key === frontKey) {
                text?.classList.add('active');
            } else {
                text?.classList.remove('active');
            }
        });

        setTimeout(() => {
            const exitPaper = this.paperSlides[exitKey];
            if (exitPaper) {
                exitPaper.classList.remove('paper-exit');
                exitPaper.style.transform = '';
                exitPaper.style.opacity = '';
            }

            if (frontPaper) {
                frontPaper.classList.remove('paper-promoting');
                frontPaper.style.opacity = '';
                frontPaper.classList.add('paper-front');
            }

            const backPaper = this.paperSlides[backKey];
            if (backPaper) {
                backPaper.style.opacity = '';
                backPaper.classList.add('paper-back');
            }

            this.slideOrder.forEach(key => {
                if (key === frontKey || key === backKey) return;
                const p = this.paperSlides[key];
                if (p) p.style.opacity = '';
            });

            this.wordHoverEnabled = true;
            this.isAnimating = false;
        }, 370);
    }

    /* ─── IntersectionObserver for Gao Yord section ─── */
    _setupScrollObserver() {
        this.gaoyordDecos = document.querySelectorAll('.gaoyord-deco');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (this._isMusicEnabled()) {
                        this._loadSounds(); // Lazy load sounds when first needed
                        if (this.slidePaperSound) {
                            this.slidePaperSound.currentTime = 0;
                            this.slidePaperSound.play().catch(e => console.log('Slide paper sound failed:', e));
                        }
                    }
                    
                    if (this.gaoyordPapers) this.gaoyordPapers.classList.add('visible');
                    if (this.gaoyordText) this.gaoyordText.classList.add('visible');
                    this.gaoyordDecos.forEach(deco => deco.classList.add('visible'));

                    // ── FIX SE: After visible added, override inline transform/opacity ──
                    if (this._seQuery.matches) {
                        if (this.gaoyordPapers) {
                            this.gaoyordPapers.style.setProperty('transform', 'none', 'important');
                            this.gaoyordPapers.style.setProperty('opacity', '1', 'important');
                            this.gaoyordPapers.style.setProperty('transition', 'none', 'important');
                        }
                        if (this.gaoyordText) {
                            this.gaoyordText.style.setProperty('transform', 'none', 'important');
                            this.gaoyordText.style.setProperty('opacity', '1', 'important');
                            this.gaoyordText.style.setProperty('transition', 'none', 'important');
                        }
                    }
                } else {
                    if (this._seQuery.matches) {
                        // Only remove deco visible — keep papers and text visible
                        this.gaoyordDecos.forEach(deco => deco.classList.remove('visible'));
                    } else {
                        if (this.gaoyordPapers) this.gaoyordPapers.classList.remove('visible');
                        if (this.gaoyordText) this.gaoyordText.classList.remove('visible');
                        this.gaoyordDecos.forEach(deco => deco.classList.remove('visible'));
                    }
                }
            });
        }, observerOptions);

        if (this.gaoyordSection) {
            observer.observe(this.gaoyordSection);
        }
    }

    /* ─── Custom Smooth scroll to Section 2 (magnetic snap) ─── */
    _smoothScrollToSection2() {
        if (!this.gaoyordSection || this.isSnapScrolling) return;
        
        this.isSnapScrolling = true;
        const navbarH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 96;
        const targetY = this.gaoyordSection.offsetTop - navbarH;
        const startY = window.scrollY;
        const distance = targetY - startY;
        const duration = 800; // ms - ปรับความเร็ว
        let startTime = null;

        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animateScroll = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startY + (distance * ease));

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                this.isSnapScrolling = false;
            }
        };

        requestAnimationFrame(animateScroll);
    }

    /* ─── Custom Smooth scroll to Section 1 (magnetic snap back) ─── */
    _smoothScrollToSection1() {
        if (!this.scrollLock || this.isSnapScrolling) return;
        
        this.isSnapScrolling = true;
        const targetY = 0; // scroll กลับไปด้านบนสุด
        const startY = window.scrollY;
        const distance = targetY - startY;
        const duration = 800; // ms
        let startTime = null;

        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animateScroll = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startY + (distance * ease));

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                this.isSnapScrolling = false;
            }
        };

        requestAnimationFrame(animateScroll);
    }

    /* ─── Wrap each word in gaoyord-desc ─── */
    _wrapYantDescWords() {
        const descs = document.querySelectorAll('.gaoyord-desc');
        this.yantWords = [];

        descs.forEach(desc => {
            const originalHTML = desc.innerHTML;
            let wrappedHTML = '';

            const parser = new DOMParser();
            const doc = parser.parseFromString(originalHTML, 'text/html');
            
            const processNode = (node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const words = node.textContent.split(/(\s+)/);
                    return words.map(word => {
                        if (/^\s+$/.test(word)) return word;
                        return `<span class="yant-word">${word}</span>`;
                    }).join('');
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.tagName === 'BR') return '<br>';
                    const tag = node.tagName.toLowerCase();
                    let attrs = '';
                    if (node.attributes) {
                        Array.from(node.attributes).forEach(attr => {
                            attrs += ` ${attr.name}="${attr.value}"`;
                        });
                    }
                    const children = Array.from(node.childNodes).map(child => processNode(child)).join('');
                    return `<${tag}${attrs}>${children}</${tag}>`;
                }
                return '';
            };

            wrappedHTML = Array.from(doc.body.childNodes).map(node => processNode(node)).join('');
            desc.innerHTML = wrappedHTML;
            desc.querySelectorAll('.yant-word').forEach(word => this.yantWords.push(word));
        });
    }

    /* ─── Setup gradient hover effect on words ─── */
    _setupYantWordHover() {
        const descs = document.querySelectorAll('.gaoyord-desc');
        let hoverTicking = false;
        let throttleDelay = 0;
        
        descs.forEach(desc => {
            desc.addEventListener('mousemove', (e) => {
                if (!this.wordHoverEnabled) return;
                const now = Date.now();
                if (now - throttleDelay < 32) return;
                throttleDelay = now;
                
                if (!hoverTicking) {
                    requestAnimationFrame(() => {
                        this._updateWordGlow(desc, e.clientX, e.clientY);
                        hoverTicking = false;
                    });
                    hoverTicking = true;
                }
            }, { passive: true });

            desc.addEventListener('mouseleave', () => {
                desc.querySelectorAll('.yant-word').forEach(word => {
                    word.classList.remove('glow');
                    word.style.removeProperty('color');
                    word.style.removeProperty('text-shadow');
                });
            });
        });
    }

    /* ─── Update word glow based on mouse position ─── */
    _updateWordGlow(desc, mouseX, mouseY) {
        const words = desc.querySelectorAll('.yant-word');
        const threshold = 100;

        words.forEach(word => {
            const rect = word.getBoundingClientRect();
            const wordCenterX = rect.left + rect.width / 2;
            const wordCenterY = rect.top + rect.height / 2;

            const dx = mouseX - wordCenterX;
            const dy = mouseY - wordCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < threshold) {
                const intensity = 1 - (distance / threshold);
                word.classList.add('glow');
                
                if (intensity > 0.7) {
                    word.style.color = '#ECE342';
                    word.style.textShadow = `0 0 ${20 * intensity}px rgba(236, 227, 66, ${0.8 * intensity}),
                                            0 0 ${35 * intensity}px rgba(236, 227, 66, ${0.4 * intensity})`;
                } else if (intensity > 0.3) {
                    const mixColor = this._interpolateColor(
                        [253, 240, 213],
                        [236, 227, 66],
                        intensity
                    );
                    word.style.color = `rgb(${mixColor[0]}, ${mixColor[1]}, ${mixColor[2]})`;
                    word.style.textShadow = `0 0 ${15 * intensity}px rgba(236, 227, 66, ${0.5 * intensity})`;
                } else {
                    word.classList.remove('glow');
                    word.style.removeProperty('color');
                    word.style.removeProperty('text-shadow');
                }
            } else {
                word.classList.remove('glow');
                word.style.removeProperty('color');
                word.style.removeProperty('text-shadow');
            }
        });
    }

    /* ─── Helper: Interpolate between two RGB colors ─── */
    _interpolateColor(color1, color2, factor) {
        return [
            Math.round(color1[0] + (color2[0] - color1[0]) * factor),
            Math.round(color1[1] + (color2[1] - color1[1]) * factor),
            Math.round(color1[2] + (color2[2] - color1[2]) * factor)
        ];
    }
}