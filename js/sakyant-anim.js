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

        this._splitTitle();
        this._wrapDescriptionChars();
        this._setupScrollObserver();
        this._bindEvents();
        this._startEntrance();     // kick off the title entrance sequence
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

        paragraphs.forEach(p => {
            const wrappedHTML = this._wrapNodeChars(p);
            p.innerHTML = wrappedHTML;
            p.querySelectorAll('.desc-char').forEach(c => this.descChars.push(c));
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

        // Karaoke fills 0 → 0.6 of progress
        const karaokeEnd = 0.6;
        const karaokeProgress = Math.min(progress / karaokeEnd, 1);
        this._revealDescription(karaokeProgress);

        // Fade section 1 content in the last stretch (0.75 → 1.0) as section 2 slides up
        if (this.contentWrap) {
            const fadeStart = 0.75;
            if (progress > fadeStart) {
                const fadeProgress = (progress - fadeStart) / (1 - fadeStart);
                const eased = fadeProgress * fadeProgress;
                this.contentWrap.style.opacity = 1 - eased * 0.7;
            } else {
                this.contentWrap.style.opacity = '';
            }
        }

        if (progress >= 0.95 && !this.karaokeComplete) {
            this.karaokeComplete = true;
        }
    }

    /* ─── Karaoke description reveal (t is already 0→1 within karaoke zone) ─── */
    _revealDescription(t) {
        if (!this.descChars || this.descChars.length === 0) return;
        const total = this.descChars.length;
        const activeCount = Math.min(Math.floor(t * total), total);

        this.descChars.forEach((ch, i) => {
            if (i < activeCount) {
                ch.classList.add('active');
            } else {
                ch.classList.remove('active');
            }
        });
    }

    /* ─── Yantra glow effect ─── */
    _glowYantras() {
        this.yantras.forEach(img => {
            img.classList.add('glow');
        });
    }

    /* ─── IntersectionObserver for Gao Yord section ─── */
    _setupScrollObserver() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Stagger: papers first, then text
                    if (this.gaoyordPapers) {
                        this.gaoyordPapers.classList.add('visible');
                    }
                    if (this.gaoyordText) {
                        setTimeout(() => {
                            this.gaoyordText.classList.add('visible');
                        }, 300);
                    }
                } else {
                    // Reset when leaving viewport so animation replays on re-enter
                    if (this.gaoyordPapers) {
                        this.gaoyordPapers.classList.remove('visible');
                    }
                    if (this.gaoyordText) {
                        this.gaoyordText.classList.remove('visible');
                    }
                }
            });
        }, observerOptions);

        if (this.gaoyordSection) {
            observer.observe(this.gaoyordSection);
        }
    }
}
