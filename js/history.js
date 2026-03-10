// =============================================
// History Page - MERGED Horizontal Scrolling Timeline
// Combines: Tiger's Chaiya animations + Friend's Parallax/Karaoke system
// =============================================

let horizontalScrollTween = null;
let isInitialized = false;

window.addEventListener('load', () => {
    gsap.registerPlugin(ScrollTrigger);

    // === Friend's setup (must run before horizontal scroll) ===
    setupKaraokeText();

    // === Core ===
    initHorizontalScroll();
    initTextReveal();
    initFighterStagger();
    initThaSaoParallax();
    initRemainingKaraokeBoxes();

    // === Friend's animations (Sukhothai, Ayutthaya, Regional) ===
    initRuinsParallax();
    initAyutthayaParallax();
    initAyutthayaTextAnimation();
    initRegionalFightersAnimation();
    initKaraokeAnimation();       // text-box-1, 2, 4
    initKickAnimation();
    initMouseParallax();

    // === Animations (Chaiya section) ===
    initChaiyaBounceReveal();
    initChaiyaKaraokeBoxes();     // text-box-10, 11, 12
    initChaiyaFighterScrubReveal();
    initWaiKruHoverSwap();


    // === Animations (ThaSao section) ===
    initThaSaoFighters();
    initThaSaoHoverSwap();

    isInitialized = true;
});

// =============================================
// CORE: Horizontal Scroll Setup
// =============================================
function initHorizontalScroll() {
    const timelineTrack = document.querySelector('#timeline-track');
    if (!timelineTrack) { console.error('Timeline track not found'); return; }

    const totalWidth = timelineTrack.offsetWidth;
    console.log('Timeline total width:', totalWidth, 'px');

    horizontalScrollTween = gsap.to(timelineTrack, {
        x: () => -(totalWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
            trigger: '.history-wrapper',
            start: 'top top',
            end: () => `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            id: 'horizontal-scroll'
        }
    });

    setTimeout(() => { ScrollTrigger.refresh(); }, 100);
}

// =============================================
// CORE: Text Reveal Animation
// =============================================
function initTextReveal() {
    if (!horizontalScrollTween) return;
    const textBoxes = document.querySelectorAll('.text-box');
    textBoxes.forEach((textBox) => {
        ScrollTrigger.create({
            trigger: textBox,
            start: 'left 80%',
            end: 'right 20%',
            onEnter: () => { textBox.classList.add('revealed'); },
            onLeaveBack: () => { textBox.classList.remove('revealed'); },
            containerAnimation: horizontalScrollTween
        });
    });
}

// =============================================
// CORE: Fighter Stagger Animation
// =============================================
function initFighterStagger() {
    if (!horizontalScrollTween) return;
    const fighters = document.querySelectorAll('.fighter');
    fighters.forEach((fighter, index) => {
        const delay = index * 0.1;
        ScrollTrigger.create({
            trigger: fighter,
            start: 'left 70%',
            onEnter: () => { setTimeout(() => { fighter.classList.add('revealed'); }, delay * 1000); },
            onLeaveBack: () => { fighter.classList.remove('revealed'); },
            containerAnimation: horizontalScrollTween
        });
    });
}

// =============================================
// CORE: Resize Handler
// =============================================
let resizeTimer;
window.addEventListener('resize', () => {
    if (!isInitialized) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        try { ScrollTrigger.refresh(); } catch (e) { console.warn('ScrollTrigger refresh error:', e.message); }
    }, 250);
});


// =============================================================================
// FRIEND'S ANIMATIONS (Sukhothai / Ayutthaya / Regional / Karaoke / Kick)
// =============================================================================

// ===== Setup Karaoke Text Structure (for text-box-1, 2, 4) =====
function setupKaraokeText() {
    const karaokeTextElements = document.querySelectorAll('.karaoke-text');
    if (karaokeTextElements.length === 0) return;

    karaokeTextElements.forEach(karaokeTextElement => {
        const html = karaokeTextElement.innerHTML;
        const temp = document.createElement('div');
        temp.innerHTML = html;

        const processNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                const tokens = text.split(/(\s+)/);
                const fragment = document.createDocumentFragment();
                tokens.forEach(token => {
                    if (/^\s+$/.test(token)) {
                        fragment.appendChild(document.createTextNode(' '));
                    } else {
                        const wordSpan = document.createElement('span');
                        wordSpan.className = 'karaoke-word';
                        Array.from(token).forEach(char => {
                            const charSpan = document.createElement('span');
                            charSpan.className = 'karaoke-char';
                            charSpan.textContent = char;
                            wordSpan.appendChild(charSpan);
                        });
                        fragment.appendChild(wordSpan);
                    }
                });
                return fragment;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.classList && node.classList.contains('highlight')) {
                    const text = node.textContent;
                    const tokens = text.split(/(\s+)/);
                    const fragment = document.createDocumentFragment();
                    tokens.forEach(token => {
                        if (/^\s+$/.test(token)) {
                            fragment.appendChild(document.createTextNode(' '));
                        } else {
                            const wordSpan = document.createElement('span');
                            wordSpan.className = 'karaoke-word';
                            Array.from(token).forEach(char => {
                                const charSpan = document.createElement('span');
                                charSpan.className = 'karaoke-char highlight';
                                charSpan.textContent = char;
                                wordSpan.appendChild(charSpan);
                            });
                            fragment.appendChild(wordSpan);
                        }
                    });
                    return fragment;
                }
            }
            return node.cloneNode(true);
        };

        const newContent = document.createDocumentFragment();
        Array.from(temp.childNodes).forEach(node => {
            newContent.appendChild(processNode(node));
        });
        karaokeTextElement.innerHTML = '';
        karaokeTextElement.appendChild(newContent);
    });
}

// ===== Ruins Parallax Animation =====
function initRuinsParallax() {
    if (!horizontalScrollTween) return;

    const ruinsBack = document.querySelector('.ruins-back');
    const ruinsMiddle = document.querySelector('.ruins-middle');
    const ruinsFront = document.querySelector('.ruins-front');
    if (!ruinsBack || !ruinsMiddle || !ruinsFront) return;

    // Slide up with fade in
    gsap.fromTo(ruinsBack, { y: 120, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.bg-ruins', start: 'left 80%', end: 'right 20%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' }
    });
    gsap.fromTo(ruinsMiddle, { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.1,
        scrollTrigger: { trigger: '.bg-ruins', start: 'left 80%', end: 'right 20%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' }
    });
    gsap.fromTo(ruinsFront, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.0, ease: 'power2.out', delay: 0.2,
        scrollTrigger: { trigger: '.bg-ruins', start: 'left 80%', end: 'right 20%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' }
    });

    // Horizontal parallax
    gsap.to(ruinsBack, { x: -80, ease: 'none', scrollTrigger: { trigger: '.bg-ruins', start: 'left right', end: 'right left', scrub: 2, containerAnimation: horizontalScrollTween } });
    gsap.to(ruinsMiddle, { x: -120, ease: 'none', scrollTrigger: { trigger: '.bg-ruins', start: 'left right', end: 'right left', scrub: 1.5, containerAnimation: horizontalScrollTween } });
    gsap.to(ruinsFront, { x: -160, ease: 'none', scrollTrigger: { trigger: '.bg-ruins', start: 'left right', end: 'right left', scrub: 1, containerAnimation: horizontalScrollTween } });
}

// ===== Ayutthaya Temple Parallax =====
function initAyutthayaParallax() {
    if (!horizontalScrollTween) return;

    const templeRight = document.querySelector('.temple-right');
    const templeLeft = document.querySelector('.temple-left');
    const templeCenter = document.querySelector('.temple-center');
    if (!templeRight || !templeLeft || !templeCenter) return;

    // Slide down with fade in
    gsap.fromTo(templeRight, { y: -120, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.ayutthaya-temples', start: 'left 80%', end: 'right 20%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' }
    });
    gsap.fromTo(templeLeft, { y: -80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.1,
        scrollTrigger: { trigger: '.ayutthaya-temples', start: 'left 80%', end: 'right 20%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' }
    });
    gsap.fromTo(templeCenter, { y: -40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.0, ease: 'power2.out', delay: 0.2,
        scrollTrigger: { trigger: '.ayutthaya-temples', start: 'left 80%', end: 'right 20%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' }
    });

    // Horizontal parallax
    gsap.to(templeRight, { x: -80, ease: 'none', scrollTrigger: { trigger: '.ayutthaya-temples', start: 'left right', end: 'right left', scrub: 2, containerAnimation: horizontalScrollTween } });
    gsap.to(templeLeft, { x: -120, ease: 'none', scrollTrigger: { trigger: '.ayutthaya-temples', start: 'left right', end: 'right left', scrub: 1.5, containerAnimation: horizontalScrollTween } });
    gsap.to(templeCenter, { x: -160, ease: 'none', scrollTrigger: { trigger: '.ayutthaya-temples', start: 'left right', end: 'right left', scrub: 1, containerAnimation: horizontalScrollTween } });
}

// ===== Ayutthaya Text Box Animation =====
function initAyutthayaTextAnimation() {
    if (!horizontalScrollTween) return;
    ['.text-box-3', '.text-box-4', '.text-box-5'].forEach((selector, index) => {
        const textBox = document.querySelector(selector);
        if (!textBox) return;
        gsap.fromTo(textBox, { y: 100, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.2, ease: 'power2.out', delay: index * 0.1,
            scrollTrigger: { trigger: selector, start: 'left 75%', end: 'right 25%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' }
        });
    });
}

// ===== Mouse Parallax Effect =====
function initMouseParallax() {
    const textBoxes = [
        document.querySelector('.text-box-3'),
        document.querySelector('.text-box-4'),
        document.querySelector('.text-box-5')
    ].filter(el => el !== null);
    if (textBoxes.length === 0) return;

    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;
        textBoxes.forEach((textBox, index) => {
            const multiplier = (index + 1) * 10;
            gsap.to(textBox, { x: mouseX * multiplier, y: mouseY * multiplier, duration: 0.6, ease: 'power2.out' });
        });
    });
}

// ===== Regional Fighters 3D Billboard Animation =====
function initRegionalFightersAnimation() {
    if (!horizontalScrollTween) return;
    const regionalFighters = document.querySelectorAll('.regional-fighter');
    const fighterLabels = document.querySelectorAll('.fighter-label');
    if (regionalFighters.length === 0) return;

    ScrollTrigger.create({
        trigger: '.regional-fighters',
        start: 'left 70%',
        end: 'right 30%',
        containerAnimation: horizontalScrollTween,
        onEnter: () => {
            regionalFighters.forEach((fighter, i) => { setTimeout(() => { fighter.classList.add('revealed'); }, i * 100); });
            fighterLabels.forEach((label, i) => { setTimeout(() => { label.classList.add('revealed'); }, i * 100 + 200); });
        },
        onLeaveBack: () => {
            regionalFighters.forEach(f => f.classList.remove('revealed'));
            fighterLabels.forEach(l => l.classList.remove('revealed'));
        },
        onLeave: () => {
            regionalFighters.forEach(f => f.classList.remove('revealed'));
            fighterLabels.forEach(l => l.classList.remove('revealed'));
        },
        onEnterBack: () => {
            regionalFighters.forEach((fighter, i) => { setTimeout(() => { fighter.classList.add('revealed'); }, i * 100); });
            fighterLabels.forEach((label, i) => { setTimeout(() => { label.classList.add('revealed'); }, i * 100 + 200); });
        }
    });
}

// ===== Karaoke Animation for text-box-1, 2, 4 =====
function initKaraokeAnimation() {
    if (!horizontalScrollTween) return;

    const karaokeTextBoxes = [
        { selector: '.text-box-1', multiplier: 1.5 },
        { selector: '.text-box-2', multiplier: 1.5 },
        { selector: '.text-box-4', multiplier: 1.5 }
    ];

    karaokeTextBoxes.forEach(({ selector, multiplier }) => {
        const textBox = document.querySelector(selector);
        if (!textBox) return;
        const karaokeTextElement = textBox.querySelector('.karaoke-text');
        if (!karaokeTextElement) return;
        const charElements = karaokeTextElement.querySelectorAll('.karaoke-char');
        if (charElements.length === 0) return;

        ScrollTrigger.create({
            trigger: selector,
            start: 'left 70%',
            end: 'right 30%',
            containerAnimation: horizontalScrollTween,
            onUpdate: (self) => {
                const progress = self.progress;
                const totalChars = charElements.length;
                const activeCharCount = Math.min(Math.floor(progress * totalChars * multiplier), totalChars);
                charElements.forEach((char, index) => {
                    if (index < activeCharCount) { char.classList.add('active'); }
                    else { char.classList.remove('active'); }
                });
            }
        });
    });
}

// ===== Kick Animation Sequence (frame swap on hover) =====
function initKickAnimation() {
    const kickPose = document.querySelector('.kick-pose');
    if (!kickPose) return;
    const framesData = kickPose.getAttribute('data-frames');
    if (!framesData) return;

    const frames = framesData.split(',');
    let currentFrame = 0;
    let animationInterval = null;

    kickPose.addEventListener('mouseenter', () => {
        currentFrame = 0;
        animationInterval = setInterval(() => {
            currentFrame = (currentFrame + 1) % frames.length;
            kickPose.src = frames[currentFrame];
        }, 150);
    });

    kickPose.addEventListener('mouseleave', () => {
        if (animationInterval) { clearInterval(animationInterval); animationInterval = null; }
        currentFrame = 0;
        kickPose.src = frames[0];
    });
}


// =============================================================================
// TIGER'S ANIMATIONS (Chaiya section)
// =============================================================================

// ===== Chaiya Background Bounce Reveal (Scrub) =====
function initChaiyaBounceReveal() {
    if (!horizontalScrollTween) return;

    const chaiyaLayers = [".chaiya-left", ".chaiya-right", ".chaiya-center", ".chaiya-back"];

    chaiyaLayers.forEach((selector, index) => {
        const el = document.querySelector(selector);
        if (!el) return;

        gsap.to(el, {
            keyframes: [
                { y: -30, scale: 1.08, opacity: 1, duration: 0.65 },
                { y: 0, scale: 1, duration: 0.35 }
            ],
            scrollTrigger: {
                trigger: ".chaiya-background",
                containerAnimation: horizontalScrollTween,
                start: `left+=${index * 10}% 85%`,
                end: `left+=${index * 8 + 8}% 45%`,
                scrub: 0.5,
            }
        });
    });
}

// ===== Chaiya Karaoke (text-box-10, 11, 12) =====
function wrapCharsInNode(node) {
    Array.from(node.childNodes).forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            Array.from(child.textContent).forEach(char => {
                if (/\s/.test(char)) { frag.appendChild(document.createTextNode(char)); }
                else {
                    const s = document.createElement('span');
                    s.className = 'karaoke-char';
                    s.textContent = char;
                    frag.appendChild(s);
                }
            });
            node.replaceChild(frag, child);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
            wrapCharsInNode(child);
        }
    });
}

function initChaiyaKaraokeBoxes() {
    if (!horizontalScrollTween) return;

    const boxes = ['.text-box-10', '.text-box-11', '.text-box-12'];

    boxes.forEach((boxSelector) => {
        const box = document.querySelector(boxSelector);
        if (!box) return;

        box.querySelectorAll('p').forEach(p => wrapCharsInNode(p));
        const chars = Array.from(box.querySelectorAll('.karaoke-char'));
        if (!chars.length) return;

        gsap.fromTo(chars,
            { opacity: 0.15, filter: 'blur(4px)' },
            {
                opacity: 1,
                filter: 'blur(0px)',
                stagger: 0.04,
                ease: 'none',
                duration: 0.6,
                scrollTrigger: {
                    trigger: box,
                    start: 'left 85%',
                    end: 'left 45%',
                    scrub: 0.3,
                    containerAnimation: horizontalScrollTween
                }
            }
        );
    });
}

// ===== Chaiya Fighters Scrub Reveal + Idle =====
function initChaiyaFighterScrubReveal() {
    if (!horizontalScrollTween) return;

    // === Fighters 1-5 (scrub reveal + bounce + idle) ===
    const fighters = [
        { selector: ".chaiya-fighter-1", offset: 0 },
        { selector: ".chaiya-fighter-2", offset: 3 },
        { selector: ".wai-kru-swap", offset: 5 },
        { selector: ".chaiya-fighter-4", offset: 7 },
        { selector: ".chaiya-fighter-5", offset: 9 },
    ];

    // === Labels 1-5 (appear slightly after fighters) ===
    const labels = [
        { selector: ".label-chaiya-1", offset: 1.5 },
        { selector: ".label-chaiya-2", offset: 4.5 },
        { selector: ".label-chaiya-3", offset: 6.5 },
        { selector: ".label-chaiya-4", offset: 8.5 },
        { selector: ".label-chaiya-5", offset: 10.5 },
    ];

    // Fighter reveal
    fighters.forEach((fighter) => {
        const el = document.querySelector(fighter.selector);
        if (!el) return;

        gsap.set(el, { opacity: 0, y: 120, scale: 0.8 });

        gsap.to(el, {
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                containerAnimation: horizontalScrollTween,
                start: `left+=${fighter.offset}% 90%`,
                end: `left+=${fighter.offset}% 50%`,
                scrub: 1.2,
                onEnter: () => {
                    gsap.to(el, { y: 0, scale: 1, duration: 0.8, ease: "power2.out" });
                },
                onUpdate: (self) => {
                    if (self.progress > 0.5 && !el.classList.contains('idle')) {
                        el.classList.add('idle');
                    }
                },
                onEnterBack: () => el.classList.remove('idle'),
                onLeaveBack: () => {
                    el.classList.remove('idle');
                    gsap.to(el, {
                        opacity: 0, duration: 0.3, ease: "power1.in",
                        onComplete: () => { gsap.set(el, { y: 120, scale: 0.8 }); }
                    });
                },
            }
        });
    });

    // Label reveal
    labels.forEach((label) => {
        const el = document.querySelector(label.selector);
        if (!el) return;

        gsap.set(el, { opacity: 0, y: 60 });

        gsap.to(el, {
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                containerAnimation: horizontalScrollTween,
                start: `left+=${label.offset}% 90%`,
                end: `left+=${label.offset}% 55%`,
                scrub: 1,
                onEnter: () => {
                    gsap.to(el, { y: 0, duration: 0.6, ease: "power2.out" });
                },
                onLeaveBack: () => {
                    gsap.to(el, {
                        opacity: 0, duration: 0.3, ease: "power1.in",
                        onComplete: () => { gsap.set(el, { y: 60 }); }
                    });
                },
            }
        });
    });

    // === Fighter-6 + Label-6: เด้งแบบ attack (หมุนเข้ามา) ===
    [
        { selector: ".chaiya-fighter-6", isLabel: false },
        { selector: ".label-chaiya-6", isLabel: true },
    ].forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;

        if (item.isLabel) {
            gsap.set(el, { opacity: 0, y: 60 });
        } else {
            gsap.set(el, { opacity: 0, y: 200, scale: 0.5, rotation: -15 });
        }

        gsap.to(el, {
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".text-box-11",
                containerAnimation: horizontalScrollTween,
                start: "left 30%",
                end: "left 10%",
                scrub: 1,
                onEnter: () => {
                    if (item.isLabel) {
                        gsap.to(el, { y: 0, duration: 0.6, ease: "power2.out" });
                    } else {
                        gsap.to(el, {
                            y: 0, scale: 1, rotation: 0, duration: 1,
                            ease: "elastic.out(1, 0.5)"
                        });
                    }
                },
                onUpdate: (self) => {
                    if (self.progress > 0.5 && !el.classList.contains('idle')) {
                        el.classList.add('idle');
                    }
                },
                onEnterBack: () => el.classList.remove('idle'),
                onLeaveBack: () => {
                    el.classList.remove('idle');
                    const resetProps = item.isLabel
                        ? { opacity: 0, y: 60, duration: 0.3, ease: "power1.in" }
                        : { opacity: 0, y: 200, scale: 0.5, rotation: -15, duration: 0.3, ease: "power1.in" };
                    gsap.to(el, resetProps);
                },
            }
        });
    });

    // === Fighter-7 + Label-7: เด้งแบบ attack (หมุนจากอีกทาง) ===
    [
        { selector: ".chaiya-fighter-7", isLabel: false },
        { selector: ".label-chaiya-7", isLabel: true },
    ].forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;

        if (item.isLabel) {
            gsap.set(el, { opacity: 0, y: 60 });
        } else {
            gsap.set(el, { opacity: 0, y: 200, scale: 0.5, rotation: 15 });
        }

        gsap.to(el, {
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".text-box-12",
                containerAnimation: horizontalScrollTween,
                start: "left 70%",
                end: "left 40%",
                scrub: 1,
                onEnter: () => {
                    if (item.isLabel) {
                        gsap.to(el, { y: 0, duration: 0.6, ease: "power2.out" });
                    } else {
                        gsap.to(el, {
                            y: 0, scale: 1, rotation: 0, duration: 1,
                            ease: "elastic.out(1, 0.5)"
                        });
                    }
                },
                onUpdate: (self) => {
                    if (self.progress > 0.5 && !el.classList.contains('idle')) {
                        el.classList.add('idle');
                    }
                },
                onEnterBack: () => el.classList.remove('idle'),
                onLeaveBack: () => {
                    el.classList.remove('idle');
                    const resetProps = item.isLabel
                        ? { opacity: 0, y: 60, duration: 0.3, ease: "power1.in" }
                        : { opacity: 0, y: 200, scale: 0.5, rotation: 15, duration: 0.3, ease: "power1.in" };
                    gsap.to(el, resetProps);
                },

            }
        });
    });
    // === Fighters 8-11 + Labels: เลื่อนถึงตัวไหน ตัวนั้นเด้งขึ้น ===
    const defenseGroup = [
        { fighter: ".chaiya-fighter-8", label: ".label-chaiya-8", rotDir: -8 },
        { fighter: ".chaiya-fighter-9", label: ".label-chaiya-9", rotDir: 8 },
        { fighter: ".chaiya-fighter-10", label: ".label-chaiya-10", rotDir: -8 },
        { fighter: ".chaiya-fighter-11", label: ".label-chaiya-11", rotDir: 8 },
    ];

    defenseGroup.forEach((item) => {
        const fighterEl = document.querySelector(item.fighter);
        const labelEl = document.querySelector(item.label);
        if (!fighterEl) return;

        // Fighter
        gsap.set(fighterEl, { opacity: 0, y: 150, scale: 0.6, rotation: item.rotDir });

        gsap.to(fighterEl, {
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: fighterEl,
                containerAnimation: horizontalScrollTween,
                start: "left 75%",
                end: "left 45%",
                scrub: 1,
                onEnter: () => {
                    gsap.to(fighterEl, { y: 0, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(2)" });
                },
                onUpdate: (self) => {
                    if (self.progress > 0.6 && !fighterEl.classList.contains('idle')) {
                        fighterEl.classList.add('idle');
                    }
                },
                onEnterBack: () => fighterEl.classList.remove('idle'),
                onLeaveBack: () => {
                    fighterEl.classList.remove('idle');
                    gsap.to(fighterEl, { opacity: 0, y: 150, scale: 0.6, rotation: item.rotDir, duration: 0.3, ease: "power1.in" });
                },
            }
        });

        // Label - เด้งแรง
        if (!labelEl) return;
        gsap.set(labelEl, { opacity: 0, y: 80, scale: 0.5, rotation: item.rotDir * 0.5 });

        gsap.to(labelEl, {
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: fighterEl,
                containerAnimation: horizontalScrollTween,
                start: "left 65%",
                end: "left 40%",
                scrub: 1,
                onEnter: () => {
                    gsap.to(labelEl, {
                        y: 0, scale: 1, rotation: 0, duration: 0.6,
                        ease: "elastic.out(1.2, 0.4)"
                    });
                },
                onLeaveBack: () => {
                    gsap.to(labelEl, { opacity: 0, y: 80, scale: 0.5, rotation: item.rotDir * 0.5, duration: 0.3, ease: "power1.in" });
                },
            }
        });
    });
}

// ===== Wai Kru Hover Swap =====
function initWaiKruHoverSwap() {
    const img = document.querySelector('.wai-kru-swap');
    if (!img) return;

    const originalSrc = img.src;
    const hoverSrc = img.getAttribute('data-hover-src');
    if (!hoverSrc) return;

    img.addEventListener('mouseenter', () => {
        img.src = hoverSrc;
    });

    img.addEventListener('mouseleave', () => {
        img.src = originalSrc;
    });
}

function initThaSaoParallax() {
    if (!horizontalScrollTween) return;

    // under — เด้งขึ้นจากล่าง
    const under = document.querySelector('.tha-sao-under');
    if (under) {
        gsap.set(under, { opacity: 0, y: 100, scale: 0.8 });

        ScrollTrigger.create({
            trigger: ".tha-sao-background",
            containerAnimation: horizontalScrollTween,
            start: "left 40%",
            onEnter: () => {
                gsap.to(under, {
                    opacity: 1, y: 0, scale: 1, duration: 0.4,
                    ease: "back.out(1.7)"
                });
            },
            onLeaveBack: () => {
                gsap.to(under, {
                    opacity: 0, y: 100, scale: 0.8, duration: 0.2,
                    ease: "power1.in"
                });
            },
        });
    }

    // above — หล่นลงมาจากบน
    const above = document.querySelector('.tha-sao-above');
    if (above) {
        gsap.set(above, { opacity: 0, y: -120, scale: 0.8 });

        ScrollTrigger.create({
            trigger: ".tha-sao-background",
            containerAnimation: horizontalScrollTween,
            start: "left 30%",
            onEnter: () => {
                gsap.to(above, {
                    opacity: 1, y: 0, scale: 1, duration: 0.4,
                    ease: "back.out(1.7)"
                });
            },
            onLeaveBack: () => {
                gsap.to(above, {
                    opacity: 0, y: -120, scale: 0.8, duration: 0.2,
                    ease: "power1.in"
                });
            },
        });
    }
}

function initRemainingKaraokeBoxes() {
    if (!horizontalScrollTween) return;

    const boxes = [
        '.text-box-13', '.text-box-14', '.text-box-15',
        '.text-box-16', '.text-box-17', '.text-box-18',
        '.text-box-19', '.text-box-20', '.text-box-21', '.text-box-22'
    ];

    boxes.forEach((boxSelector) => {
        const box = document.querySelector(boxSelector);
        if (!box) return;

        box.querySelectorAll('p').forEach(p => wrapCharsInNode(p));
        const chars = Array.from(box.querySelectorAll('.karaoke-char'));
        if (!chars.length) return;

        gsap.fromTo(chars,
            { opacity: 0.15, filter: 'blur(4px)' },
            {
                opacity: 1,
                filter: 'blur(0px)',
                stagger: 0.02,
                ease: 'none',
                duration: 0.6,
                scrollTrigger: {
                    trigger: box,
                    start: 'left 70%',
                    end: 'left 30%',
                    scrub: 0.3,
                    containerAnimation: horizontalScrollTween
                }
            }
        );
    });
}

function initThaSaoFighters() {
    if (!horizontalScrollTween) return;

    const group1 = [
        { selector: ".tha-sao-kick", dir: -1 },
        { selector: ".tha-sao-elbow", dir: 1 },
    ];

    const group2 = [
        { selector: ".tha-sao-fighter2-1", dir: -1 },
    ];

    const group3 = [
        { selector: ".tha-sao-defend", dir: -1 },
        { selector: ".tha-sao-parry", dir: 1 },
        { selector: ".tha-sao-attacks", dir: -1 },
    ];

    const groupLabels = [
        { selector: ".tha-sao-group-label", trigger: ".tha-sao-fighters" },
        { selector: ".tha-sao-group-label-2", trigger: ".tha-sao-fighters-2" },
        { selector: ".tha-sao-group-label-3", trigger: ".tha-sao-fighters-3" },
    ];

    const allFighters = [
        { items: group1, trigger: ".tha-sao-fighters" },
        { items: group2, trigger: ".tha-sao-fighters-2" },
        { items: group3, trigger: ".tha-sao-fighters-3" },
    ];

    allFighters.forEach((group) => {
        group.items.forEach((item, i) => {
            const el = document.querySelector(item.selector);
            if (!el) return;

            const startX = 150 * item.dir;

            gsap.set(el, {
                opacity: 0,
                x: startX,
                scale: 0.7,
                rotation: 8 * item.dir
            });

            ScrollTrigger.create({
                trigger: group.trigger,
                containerAnimation: horizontalScrollTween,
                start: `left+=${i * 10}% 70%`,
                onEnter: () => {
                    gsap.to(el, {
                        opacity: 1, x: 0, scale: 1, rotation: 0,
                        duration: 0.6,
                        ease: "power3.out"
                    });
                },
                onLeaveBack: () => {
                    gsap.to(el, {
                        opacity: 0, x: startX, scale: 0.7,
                        rotation: 8 * item.dir,
                        duration: 0.3, ease: "power1.in"
                    });
                },
            });
        });
    });

    groupLabels.forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;

        gsap.set(el, { opacity: 0, y: 30 });

        ScrollTrigger.create({
            trigger: item.trigger,
            containerAnimation: horizontalScrollTween,
            start: "left 75%",
            onEnter: () => {
                gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
            },
            onLeaveBack: () => {
                gsap.to(el, { opacity: 0, y: 30, duration: 0.2, ease: "power1.in" });
            },
        });
    });
}

function initThaSaoHoverSwap() {
    const img = document.querySelector('.tha-sao-swap');
    if (!img) return;

    const framesData = img.getAttribute('data-frames');
    if (!framesData) return;

    const frames = framesData.split(',');
    let currentFrame = 0;
    let animationInterval = null;

    img.addEventListener('mouseenter', () => {
        currentFrame = 0;
        animationInterval = setInterval(() => {
            currentFrame = (currentFrame + 1) % frames.length;
            img.src = frames[currentFrame];
        }, 900);
    });

    img.addEventListener('mouseleave', () => {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
        currentFrame = 0;
        img.src = frames[0];
    });
}