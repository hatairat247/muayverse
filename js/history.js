// History Page - Horizontal Scrolling Timeline
// Using GSAP ScrollTrigger

// Store the horizontal scroll tween for containerAnimation references
let horizontalScrollTween = null;
let isInitialized = false;

// Use 'load' instead of 'DOMContentLoaded' to ensure CSS is fully loaded
window.addEventListener('load', () => {
    // Initialize GSAP & ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    initHorizontalScroll();
    initTextReveal();
    initFighterStagger();
    initChaiyaBounceReveal();
    initKaraokeBox10();
    initChaiyaFighterReveal();
    initChaiyaFighterScrubReveal();
    isInitialized = true;
});

// ===== Horizontal Scroll Setup =====
function initHorizontalScroll() {
    const timelineTrack = document.querySelector('#timeline-track');

    if (!timelineTrack) {
        console.error('Timeline track not found');
        return;
    }

    // Calculate total width based on timeline-track width
    const totalWidth = timelineTrack.offsetWidth;
    console.log('Timeline total width:', totalWidth, 'px');

    // Create horizontal scroll animation and store the tween
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

    // Refresh ScrollTrigger after a brief delay to ensure layout is complete
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
}

// ===== Karaoke – text-box-10 only =====
function wrapCharsInNode(node) {
    Array.from(node.childNodes).forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            Array.from(child.textContent).forEach(char => {
                if (/\s/.test(char)) {
                    frag.appendChild(document.createTextNode(char));
                } else {
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

function initKaraokeBox10() {
    if (!horizontalScrollTween) return;
    const box = document.querySelector('.text-box-10');
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
                start: 'left 85%',
                end: 'left 45%',
                scrub: 0.3,
                containerAnimation: horizontalScrollTween
            }
        }
    );
}

// ===== Text Reveal Animation =====
function initTextReveal() {
    if (!horizontalScrollTween) return;

    const textBoxes = document.querySelectorAll('.text-box');

    textBoxes.forEach((textBox) => {
        // Use the stored tween as containerAnimation (not ScrollTrigger.getById)
        ScrollTrigger.create({
            trigger: textBox,
            start: 'left 80%',
            end: 'right 20%',
            onEnter: () => {
                textBox.classList.add('revealed');
            },
            onLeaveBack: () => {
                textBox.classList.remove('revealed');
            },
            containerAnimation: horizontalScrollTween
        });
    });
}

// ===== Fighter Stagger Animation =====
function initFighterStagger() {
    if (!horizontalScrollTween) return;

    const fighters = document.querySelectorAll('.fighter');

    fighters.forEach((fighter, index) => {
        // Stagger delay: each fighter appears 0.1s after the previous one
        const delay = index * 0.1;

        ScrollTrigger.create({
            trigger: fighter,
            start: 'left 70%',
            onEnter: () => {
                setTimeout(() => {
                    fighter.classList.add('revealed');
                }, delay * 1000);
            },
            onLeaveBack: () => {
                fighter.classList.remove('revealed');
            },
            containerAnimation: horizontalScrollTween
        });
    });
}

// ===== Resize Handler (debounced) =====
let resizeTimer;
window.addEventListener('resize', () => {
    if (!isInitialized) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        try {
            ScrollTrigger.refresh();
        } catch (e) {
            console.warn('ScrollTrigger refresh error on resize:', e.message);
        }
    }, 250);
});

// ===== Chaiya Background Bounce Reveal (Scrub) =====
function initChaiyaBounceReveal() {
    if (!horizontalScrollTween) return;

    // ลำดับ: Left → Right → Center → Back
    const chaiyaLayers = [
        ".chaiya-left",
        ".chaiya-right",
        ".chaiya-center",
        ".chaiya-back"
    ];

    chaiyaLayers.forEach((selector, index) => {
        const el = document.querySelector(selector);
        if (!el) return;

        gsap.to(el, {
            keyframes: [
                // ช่วงแรก: พุ่งขึ้นเกินจุดหมายนิดนึง (overshoot = เด้ง)
                { y: -30, scale: 1.08, opacity: 1, duration: 0.65 },
                // ช่วงสอง: เด้งกลับลงมาตำแหน่งปกติ
                { y: 0, scale: 1, duration: 0.35 }
            ],
            scrollTrigger: {
                trigger: ".chaiya-background",
                containerAnimation: horizontalScrollTween,
                start: `left+=${index * 10}% 85%`,
                end: `left+=${index * 8 + 8}% 45%`,
                scrub: 0.5,   // ← ผูกกับ scroll ตลอด
            }
        });
    });
}

function initChaiyaFighterReveal() {
    if (!horizontalScrollTween) return;

    const fighters = [
        { selector: ".chaiya-fighter-1", offset: 0 },
        { selector: ".chaiya-fighter-2", offset: 3 },
        { selector: ".wai-kru-swap", offset: 5 },
        { selector: ".chaiya-fighter-4", offset: 7 },
        { selector: ".chaiya-fighter-5", offset: 9 },
        { selector: ".chaiya-fighter-6", offset: 11 },
        { selector: ".chaiya-fighter-7", offset: 13 },
    ];

    // === label ขึ้นช้ากว่ารูป 1.5% ===
    const labels = [
        { selector: ".label-chaiya-1", offset: 1.5 },
        { selector: ".label-chaiya-2", offset: 4.5 },
        { selector: ".label-chaiya-3", offset: 6.5 },
        { selector: ".label-chaiya-4", offset: 8.5 },
        { selector: ".label-chaiya-5", offset: 10.5 },
        { selector: ".label-chaiya-6", offset: 12.5 },
        { selector: ".label-chaiya-7", offset: 14.5 },
    ];

    const fighter6Elements = [
        { selector: ".chaiya-fighter-6", isLabel: false },
        { selector: ".label-chaiya-6", isLabel: true },

    ];

    fighter6Elements.forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;

        const startY = item.isLabel ? 60 : 120;
        const startScale = item.isLabel ? 1 : 0.8;

        gsap.set(el, { opacity: 0, y: startY, scale: startScale });

        gsap.to(el, {
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".text-box-11",              // ← ใช้ text-box-11 เป็น trigger
                containerAnimation: horizontalScrollTween,
                start: "left 30%",                     // ← เริ่มหลัง karaoke เสร็จ
                end: "left 10%",
                scrub: 1,
                onEnter: () => {
                    gsap.to(el, {
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "power2.out",
                    });
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
                        opacity: 0,
                        duration: 0.3,
                        ease: "power1.in",
                        onComplete: () => {
                            gsap.set(el, { y: startY, scale: startScale });
                        }
                    });
                },
            }
        });
    });

    fighters.forEach((fighter) => {
        const el = document.querySelector(fighter.selector);
        if (!el) return;

        gsap.set(el, { opacity: 0, y: 120, scale: 0.8 });

        ScrollTrigger.create({
            trigger: el,
            containerAnimation: horizontalScrollTween,
            start: "left 85%",
            end: "left 20%",
            onEnter: () => {
                el.classList.remove('idle');
                gsap.to(el, {
                    y: -25,
                    scale: 1.05,
                    opacity: 1,
                    duration: 0.5,
                    delay: fighter.delay,    // ← fighter-2 เด้งหลัง fighter-1
                    ease: "power2.out",
                    onComplete: () => {
                        gsap.to(el, {
                            y: 0,
                            scale: 1,
                            duration: 0.4,
                            ease: "bounce.out",
                            onComplete: () => {
                                el.classList.add('idle');
                            }
                        });
                    }
                });
            },
            onLeaveBack: () => {
                el.classList.remove('idle');
                gsap.killTweensOf(el);
                gsap.to(el, {
                    y: 120,
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power1.inOut",
                });
            }
        });
    });
}

// ===== Chaiya Fighter 4 & 5 Scrub Reveal =====
function initChaiyaFighterScrubReveal() {
    if (!horizontalScrollTween) return;

    const fighters = [
        { selector: ".chaiya-fighter-4", offset: 0 },
        { selector: ".chaiya-fighter-5", offset: 5 },
    ];

    fighters.forEach((fighter) => {
        const el = document.querySelector(fighter.selector);
        if (!el) return;

        gsap.set(el, { opacity: 0, y: 120, scale: 0.8 });

        // ค่อยๆ ขึ้นมาตาม scroll
        gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                containerAnimation: horizontalScrollTween,
                start: `left+=${fighter.offset}% 85%`,
                end: `left+=${fighter.offset}% 40%`,
                scrub: 0.8,
                onEnter: () => el.classList.remove('idle'),
                onLeave: () => el.classList.add('idle'),       // ขึ้นเสร็จ → ขยับ
                onEnterBack: () => el.classList.remove('idle'),
                onLeaveBack: () => {
                    el.classList.remove('idle');
                    gsap.set(el, { opacity: 0, y: 120, scale: 0.8 });
                },
            }
        });
    });
}