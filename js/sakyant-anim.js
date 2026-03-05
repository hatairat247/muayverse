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
        this.ticking = false;
        this.karaokeComplete = false;

        // Mouse parallax state
        this.mouse = { x: 0, y: 0 };
        this.parallaxTicking = false;
        this.decoLeft = document.querySelector('.gaoyord-deco-left');
        this.decoRight = document.querySelector('.gaoyord-deco-right');

        // Sound effects
        this.pickupSound = new Audio('SFX/Sakyant SFX/Pickuppaper.MP3');
        this.swipeSound = new Audio('SFX/Sakyant SFX/Swipe Paper.MP3');
        this.slidePaperSound = new Audio('SFX/Sakyant SFX/Slide Paper.MP3');
        this.typingSound = new Audio('SFX/Sakyant SFX/typing.MP3');
        this.pickupSound.volume = 0.5;
        this.swipeSound.volume = 0.5;
        this.slidePaperSound.volume = 0.6;
        this.typingSound.volume = 0.6;
        this.typingSound.loop = true; // Loop continuously
        
        this.isTypingSoundPlaying = false; // Track typing sound state
        this.typingStopTimeout = null; // Timeout to stop sound when scroll stops

        this._splitTitle();
        this._wrapDescriptionChars();
        this._wrapYantDescWords();
        this._setupScrollObserver();
        this._setupPaperSwitch();
        this._bindEvents();
        this._startEntrance();     // kick off the title entrance sequence
        this.wordHoverEnabled = true; // Enable word hover by default
    }

    /* ─── Split title into individual <span class="char">, preserving <br> ─── */
    _splitTitle() {
        if (!this.title) return;
        this.titleChars = [];

        // Collect child nodes (text + <br>)
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

    /**
     * Recursively wrap text nodes inside an element, preserving <strong>, <br>, etc.
     */
    _wrapNodeChars(node) {
        let html = '';
        node.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                // Split into words then chars
                const words = child.textContent.split(/(\s+)/);
                words.forEach(word => {
                    if (/^\s+$/.test(word)) {
                        // whitespace — keep as-is
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
                    // Preserve the element wrapper (e.g. <strong>)
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

    /* ─── Event bindings ─── */
    _bindEvents() {
        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY || window.pageYOffset;
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this._onScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });

        // Mouse parallax for deco elements
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

        // Setup word hover gradient effect
        this._setupYantWordHover();
    }

    /* ─── Mouse parallax effect on yellow deco yantras ─── */
    _updateParallax() {
        if (!this.decoLeft || !this.decoRight) return;

        // Smooth parallax movement: center = 0.5, edges = 0 or 1
        const moveX = (this.mouse.x - 0.5) * 40; // max ±20px
        const moveY = (this.mouse.y - 0.5) * 40;

        // Use translate3d for GPU acceleration
        // Left deco moves opposite direction for depth
        this.decoLeft.style.transform = `rotate(18.66deg) translate3d(${-moveX}px, ${-moveY}px, 0)`;

        // Right deco moves with cursor
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

        // After title finishes, glow yantras (description stays hidden until scroll)
        const titleDuration = 80 + this.titleChars.length * 35 + 400;
        setTimeout(() => {
            this._glowYantras();
        }, titleDuration);
    }

    /* ─── Scroll handler — drives karaoke from scroll-lock progress ─── */
    _onScroll() {
        if (!this.scrollLock || !this.section) return;

        const lockRect = this.scrollLock.getBoundingClientRect();
        const navbarH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 96;
        const sectionH = this.section.offsetHeight;
        const scrollableDistance = this.scrollLock.offsetHeight - sectionH;

        // How far we've scrolled within the scroll-lock zone (0 → 1)
        const scrolled = -(lockRect.top - navbarH);
        const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

        // Karaoke word-by-word reveal: fills 0 → 0.5 of progress
        const karaokeEnd = 0.5;
        const karaokeProgress = Math.min(progress / karaokeEnd, 1);
        this._revealDescription(karaokeProgress);

        // Pause zone: 0.5 → 0.7 — text stays fully visible, no fade
        // Fade section 1 content smoothly (0.7 → 1.0) before sliding to section 2
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

        // Track karaoke completion / reset
        if (progress >= 0.95) {
            this.karaokeComplete = true;
        } else if (progress < 0.05) {
            this.karaokeComplete = false;
        }
    }

    /* ─── Karaoke description reveal — word by word (t is 0→1) ─── */
    _revealDescription(t) {
        if (!this.descWords || this.descWords.length === 0) return;
        const total = this.descWords.length;
        const activeCount = Math.min(Math.floor(t * total), total);

        // Start typing sound when revealing and not yet complete
        if (t > 0 && t < 1) {
            if (!this.isTypingSoundPlaying) {
                this.typingSound.play().catch(e => console.log('Typing sound failed:', e));
                this.isTypingSoundPlaying = true;
            }
            
            // Clear any existing timeout
            if (this.typingStopTimeout) {
                clearTimeout(this.typingStopTimeout);
            }
            
            // Set timeout to stop sound if no more scroll activity
            this.typingStopTimeout = setTimeout(() => {
                this.typingSound.pause();
                this.isTypingSoundPlaying = false;
            }, 300); // Stop after 300ms of no scroll - longer for smoother experience
        } else if (t >= 1 || t <= 0) {
            // Stop sound when complete or at start
            if (this.isTypingSoundPlaying) {
                this.typingSound.pause();
                this.isTypingSoundPlaying = false;
            }
            if (this.typingStopTimeout) {
                clearTimeout(this.typingStopTimeout);
            }
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

    /* ─── 5-slide swipe carousel: gaoyod → hateaw → hanuman → sueku → padtid ─── */
    _setupPaperSwitch() {
        const papersContainer = document.querySelector('.gaoyord-papers');
        if (!papersContainer) return;

        // Slide order (matches data-yant / data-text attributes)
        this.slideOrder = ['kaoyod', 'hateaw', 'hanuman', 'sueku', 'padtid'];
        this.currentSlide = 0;
        this.isAnimating = false;

        // Cache paper & text elements
        this.paperSlides = {};
        this.textSlides = {};
        this.slideOrder.forEach(key => {
            this.paperSlides[key] = papersContainer.querySelector(`[data-yant="${key}"]`);
            this.textSlides[key] = document.querySelector(`[data-text="${key}"]`);
        });

        // Set initial state (slide 0)
        this._applySlideState();

        // ── Swipe / drag handling ──
        this._swipeState = {
            isDragging: false,
            startX: 0,
            startY: 0,
            currentX: 0,
            threshold: 60, // min px to trigger swipe
        };

        // Mouse events
        papersContainer.addEventListener('mousedown', (e) => {
            e.preventDefault(); // prevent native image drag
            this._onSwipeStart(e.clientX, e.clientY, e);
        });
        window.addEventListener('mousemove', (e) => {
            if (this._swipeState.isDragging) e.preventDefault();
            this._onSwipeMove(e.clientX, e.clientY);
        });
        window.addEventListener('mouseup', () => this._onSwipeEnd());

        // Touch events
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

        // Play pickup sound
        this.pickupSound.currentTime = 0;
        this.pickupSound.play().catch(e => console.log('Audio play failed:', e));

        // Disable word hover during swipe for performance
        this.wordHoverEnabled = false;
        
        // Clear any existing word glows
        document.querySelectorAll('.yant-word').forEach(word => {
            word.classList.remove('glow');
            word.style.removeProperty('color');
            word.style.removeProperty('text-shadow');
        });

        // Mark front paper as dragging (disable CSS transition)
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

        // Calculate rotation + movement for Tinder-like feel
        const maxRotate = 15;
        const containerW = frontPaper.parentElement.offsetWidth || 500;
        const progress = dx / containerW; // -1 to 1
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
            // Swipe accepted — determine direction
            const direction = dx < 0 ? 'left' : 'right';
            this.isAnimating = true;

            // Play swipe sound
            this.swipeSound.currentTime = 0;
            this.swipeSound.play().catch(e => console.log('Audio play failed:', e));

            // Fling the paper out
            const flingX = direction === 'left' ? -600 : 600;
            const flingRotate = direction === 'left' ? -30 : 20;
            frontPaper.classList.remove('paper-dragging');
            frontPaper.classList.add('paper-exit');
            frontPaper.style.transform = `translateX(${flingX}px) rotate(${flingRotate}deg)`;
            frontPaper.style.opacity = '0';

            // Advance slide: swipe right → next, swipe left → previous
            const prevSlide = this.currentSlide;
            if (direction === 'right') {
                this.currentSlide = (this.currentSlide + 1) % this.slideOrder.length;
            } else {
                this.currentSlide = (this.currentSlide - 1 + this.slideOrder.length) % this.slideOrder.length;
            }

            this._animateSlideTransition(prevSlide);
        } else {
            // Snap back — didn't swipe far enough
            frontPaper.classList.remove('paper-dragging');
            frontPaper.classList.add('paper-front');
            frontPaper.style.transform = '';
            frontPaper.style.opacity = '';
            
            // Re-enable word hover
            this.wordHoverEnabled = true;
        }
    }

    /* Apply current slide state: front = current, back = next, rest hidden */
    _applySlideState() {
        const total = this.slideOrder.length;
        const frontKey = this.slideOrder[this.currentSlide];
        const backKey = this.slideOrder[(this.currentSlide + 1) % total];

        this.slideOrder.forEach(key => {
            const paper = this.paperSlides[key];
            const text = this.textSlides[key];
            if (!paper) return;

            // Remove all role classes & inline styles
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

    /* Animate from prevSlide to currentSlide */
    _animateSlideTransition(prevIndex) {
        const total = this.slideOrder.length;
        const exitKey = this.slideOrder[prevIndex];
        const frontKey = this.slideOrder[this.currentSlide];
        const backKey = this.slideOrder[(this.currentSlide + 1) % total];

        // Step 1: Instantly hide ALL papers except the exiting one
        this.slideOrder.forEach(key => {
            if (key === exitKey) return;
            const paper = this.paperSlides[key];
            if (!paper) return;
            paper.classList.remove('paper-front', 'paper-back', 'paper-exit', 'paper-dragging', 'paper-promoting');
            paper.style.transform = '';
            paper.style.opacity = '0';
        });

        // Step 2: Promote the new front paper from back position to front
        const frontPaper = this.paperSlides[frontKey];
        if (frontPaper) {
            // Set it at back position first (no transition)
            frontPaper.classList.add('paper-back');
            frontPaper.style.opacity = '1';
            // Use RAF instead of force reflow for better performance
            requestAnimationFrame(() => {
                // Now animate to front
                frontPaper.classList.remove('paper-back');
                frontPaper.classList.add('paper-promoting');
                frontPaper.style.opacity = '';
            });
        }

        // Step 3: Switch text
        this.slideOrder.forEach(key => {
            const text = this.textSlides[key];
            if (key === frontKey) {
                text?.classList.add('active');
            } else {
                text?.classList.remove('active');
            }
        });

        // Step 4: After transition done, finalize everything
        setTimeout(() => {
            // Clean up exit paper
            const exitPaper = this.paperSlides[exitKey];
            if (exitPaper) {
                exitPaper.classList.remove('paper-exit');
                exitPaper.style.transform = '';
                exitPaper.style.opacity = '';
            }

            // Finalize front paper
            if (frontPaper) {
                frontPaper.classList.remove('paper-promoting');
                frontPaper.style.opacity = '';
                frontPaper.classList.add('paper-front');
            }

            // Now show back paper (only after transition is done)
            const backPaper = this.paperSlides[backKey];
            if (backPaper) {
                backPaper.style.opacity = '';
                backPaper.classList.add('paper-back');
            }

            // Reset all other papers
            this.slideOrder.forEach(key => {
                if (key === frontKey || key === backKey) return;
                const p = this.paperSlides[key];
                if (p) p.style.opacity = '';
            });

            // Re-enable word hover after animation
            this.wordHoverEnabled = true;
            this.isAnimating = false;
        }, 370); // Match 0.35s transition + 20ms buffer
    }

    /* ─── IntersectionObserver for Gao Yord section ─── */
    _setupScrollObserver() {
        // Grab deco elements for animation
        this.gaoyordDecos = document.querySelectorAll('.gaoyord-deco');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Play slide paper sound when section comes into view
                    this.slidePaperSound.currentTime = 0;
                    this.slidePaperSound.play().catch(e => console.log('Slide paper sound failed:', e));
                    
                    // Stagger: papers → text → deco
                    if (this.gaoyordPapers) {
                        this.gaoyordPapers.classList.add('visible');
                    }
                    if (this.gaoyordText) {
                        this.gaoyordText.classList.add('visible');
                    }
                    this.gaoyordDecos.forEach(deco => {
                        deco.classList.add('visible');
                    });
                } else {
                    // Reset when leaving viewport so animation replays on re-enter
                    if (this.gaoyordPapers) {
                        this.gaoyordPapers.classList.remove('visible');
                    }
                    if (this.gaoyordText) {
                        this.gaoyordText.classList.remove('visible');
                    }
                    this.gaoyordDecos.forEach(deco => {
                        deco.classList.remove('visible');
                    });
                }
            });
        }, observerOptions);

        if (this.gaoyordSection) {
            observer.observe(this.gaoyordSection);
        }
    }

    /* ─── Wrap each word in gaoyord-desc for hover gradient effect ─── */
    _wrapYantDescWords() {
        const descs = document.querySelectorAll('.gaoyord-desc');
        this.yantWords = [];

        descs.forEach(desc => {
            // Store original HTML
            const originalHTML = desc.innerHTML;
            let wrappedHTML = '';

            // Parse and wrap words
            const parser = new DOMParser();
            const doc = parser.parseFromString(originalHTML, 'text/html');
            
            const processNode = (node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const words = node.textContent.split(/(\s+)/);
                    return words.map(word => {
                        if (/^\s+$/.test(word)) {
                            return word; // preserve whitespace
                        }
                        return `<span class="yant-word">${word}</span>`;
                    }).join('');
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.tagName === 'BR') {
                        return '<br>';
                    }
                    const tag = node.tagName.toLowerCase();
                    // Preserve all attributes (especially class)
                    let attrs = '';
                    if (node.attributes) {
                        Array.from(node.attributes).forEach(attr => {
                            attrs += ` ${attr.name}="${attr.value}"`;
                        });
                    }
                    const children = Array.from(node.childNodes)
                        .map(child => processNode(child))
                        .join('');
                    return `<${tag}${attrs}>${children}</${tag}>`;
                }
                return '';
            };

            wrappedHTML = Array.from(doc.body.childNodes)
                .map(node => processNode(node))
                .join('');
            
            desc.innerHTML = wrappedHTML;
            
            // Collect all word spans
            desc.querySelectorAll('.yant-word').forEach(word => {
                this.yantWords.push(word);
            });
        });
    }

    /* ─── Setup gradient hover effect on words ─── */
    _setupYantWordHover() {
        const descs = document.querySelectorAll('.gaoyord-desc');
        let hoverTicking = false;
        let throttleDelay = 0;
        
        descs.forEach(desc => {
            desc.addEventListener('mousemove', (e) => {
                // Skip if word hover is disabled (during animation)
                if (!this.wordHoverEnabled) return;
                
                // Throttle more aggressively for performance
                const now = Date.now();
                if (now - throttleDelay < 32) return; // ~30fps max
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
                // Clear ALL inline styles to ensure no color remains
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
        const threshold = 100; // Reduced from 120 for less calculation

        words.forEach(word => {
            const rect = word.getBoundingClientRect();
            const wordCenterX = rect.left + rect.width / 2;
            const wordCenterY = rect.top + rect.height / 2;

            // Calculate distance from mouse to word center
            const dx = mouseX - wordCenterX;
            const dy = mouseY - wordCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < threshold) {
                // Apply gradient effect based on distance
                const intensity = 1 - (distance / threshold);
                word.classList.add('glow');
                
                // Use CSS custom property for smooth gradient
                if (intensity > 0.7) {
                    word.style.color = '#ECE342';
                    word.style.textShadow = `0 0 ${20 * intensity}px rgba(236, 227, 66, ${0.8 * intensity}),
                                            0 0 ${35 * intensity}px rgba(236, 227, 66, ${0.4 * intensity})`;
                } else if (intensity > 0.3) {
                    // Partial glow
                    const mixColor = this._interpolateColor(
                        [253, 240, 213], // cream
                        [236, 227, 66],   // bright yellow #ECE342
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
