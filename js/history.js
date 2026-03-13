// =============================================
// History Page - MERGED Horizontal Scrolling Timeline
// Combines: Tiger's Chaiya animations + Friend's Parallax/Karaoke system
// =============================================

let horizontalScrollTween = null;
let isInitialized = false;

// Extra vertical scroll space (px) appended after the pin section.
// Keeps the page bottom far enough from the transition trigger so
// text-box-22 finishes before the user can reach the edge.
const SCROLL_END_BUFFER = 1000;

window.addEventListener('load', () => {
    gsap.registerPlugin(ScrollTrigger);

    setupKaraokeText();
    initHorizontalScroll();
    initSukhothaiTextAnimation();
    initSukhothaiKickAnimation();
    initTextReveal();
    initFighterStagger();
    initThaSaoParallax();
    initRemainingKaraokeBoxes();
    initRuinsParallax();
    initKoratSlideUp();
    initBuffaloSwingClick();
    initLopburiSlideUp();
    initLopburiFightersBillboard();
    initLopburiFighters2();
    initLopburiTextSlideUp();
    initAyutthayaParallax();
    initAyutthayaTextAnimation();
    initRegionalFightersAnimation();
    initAyutthayaImagesAnimation();
    initKaraokeAnimation();
    initKickAnimation();
    initMouseParallax();
    initChaiyaBounceReveal();
    initChaiyaKaraokeBoxes();
    initChaiyaFighterScrubReveal();
    initWaiKruHoverSwap();
    initThonburiParallax();
    initThaSaoFighters();
    initThaSaoHoverSwap();
    initThonburiParallax();
    initThonburiHoverSwap();
    initThonburiFighterReveal();
    initEarlyRatanaParallax();
    initEarlyRatanaFighterReveal();
    initEarlyRatanaClickSwap();
    initMidRatanaParallax();
    initMidRatanaFighters();
    initPresentParallax();
    initPresentFighters();
    initWalkingFighter();

    // ── Bug 1: inject blank spacer so the page has SCROLL_END_BUFFER px
    // of extra height after the pin releases. The karaoke finishes during
    // the pin, and the user must actively scroll the blank zone to trigger
    // the transition. Injected here (not DOMContentLoaded) so scrollHeight
    // is already correct when the ?from=sakyant scroll runs below.
    (function addScrollEndBuffer() {
        const prev = document.getElementById('scroll-end-buffer');
        if (prev) prev.remove();
        const spacer = document.createElement('div');
        spacer.id = 'scroll-end-buffer';
        spacer.style.cssText =
            'width:100%;height:' + SCROLL_END_BUFFER + 'px;pointer-events:none;flex-shrink:0;';
        const wrapper = document.querySelector('.history-wrapper');
        if (wrapper) wrapper.insertAdjacentElement('afterend', spacer);
        else document.body.appendChild(spacer);
    })();

    isInitialized = true;

    // ── Bug 2 (part 2): scroll to the safe position NOW, inside 'load',
    // so scrollHeight already includes the spacer above.
    // DOMContentLoaded locked justReturnedCooldown=true early; here we
    // move the viewport 40 % into the buffer — well above the 10 px trigger.
    if (new URLSearchParams(window.location.search).get('from') === 'sakyant') {
        setTimeout(() => {
            ScrollTrigger.refresh();
            const safeTop = document.body.scrollHeight
                - window.innerHeight
                - Math.round(SCROLL_END_BUFFER * 0.4); // 400 px above max
            window.scrollTo({ top: Math.max(0, safeTop), behavior: 'instant' });
            setTimeout(() => { justReturnedCooldown = false; }, 2000);
        }, 200);
    }
});

// =============================================
// CORE: Horizontal Scroll Setup
// =============================================
function initHorizontalScroll() {
    const timelineTrack = document.querySelector('#timeline-track');
    if (!timelineTrack) { console.error('Timeline track not found'); return; }

    const totalWidth = timelineTrack.offsetWidth;

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
// FRIEND'S ANIMATIONS
// =============================================================================

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

function initRuinsParallax() {
    if (!horizontalScrollTween) return;
    const ruinsBack = document.querySelector('.ruins-back');
    const ruinsMiddle = document.querySelector('.ruins-middle');
    const ruinsFront = document.querySelector('.ruins-front');
    if (!ruinsBack || !ruinsMiddle || !ruinsFront) return;

    gsap.fromTo(ruinsBack, { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: '.bg-ruins', start: 'left 80%', end: 'right 20%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' } });
    gsap.fromTo(ruinsMiddle, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.1, scrollTrigger: { trigger: '.bg-ruins', start: 'left 80%', end: 'right 20%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' } });
    gsap.fromTo(ruinsFront, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: 'power2.out', delay: 0.2, scrollTrigger: { trigger: '.bg-ruins', start: 'left 80%', end: 'right 20%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' } });
    gsap.to(ruinsBack, { x: -80, ease: 'none', scrollTrigger: { trigger: '.bg-ruins', start: 'left right', end: 'right left', scrub: 2, containerAnimation: horizontalScrollTween } });
    gsap.to(ruinsMiddle, { x: -120, ease: 'none', scrollTrigger: { trigger: '.bg-ruins', start: 'left right', end: 'right left', scrub: 1.5, containerAnimation: horizontalScrollTween } });
    gsap.to(ruinsFront, { x: -160, ease: 'none', scrollTrigger: { trigger: '.bg-ruins', start: 'left right', end: 'right left', scrub: 1, containerAnimation: horizontalScrollTween } });
}

function initKoratSlideUp() {
    if (!horizontalScrollTween) return;
    const koratBg = document.querySelector('.korat-bg-layer');
    if (!koratBg) return;

    gsap.fromTo(koratBg,
        { y: 100, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.korat-background',
                start: 'left 80%',
                end: 'right 20%',
                containerAnimation: horizontalScrollTween,
                toggleActions: 'play reverse play reverse'
            }
        }
    );
}

function initBuffaloSwingClick() {
    const buffaloImage = document.querySelector('.buffalo-swing-image');
    const buffaloWrapper = document.querySelector('.buffalo-swing-wrapper');
    if (!buffaloImage || !buffaloWrapper) return;

    // Image sequence for animation (0-4 only)
    const imageSequence = [
        'img/muay-boran/northeast/muay-korat-buffalo-swing.png',
        'img/muay-boran/northeast/muay-korat-buffalo-swing 1 .png',
        'img/muay-boran/northeast/muay-korat-buffalo-swing 2.png',
        'img/muay-boran/northeast/muay-korat-buffalo-swing 3 .png',
        'img/muay-boran/northeast/muay-korat-buffalo-swing 4 .png'
    ];

    let isAnimating = false;

    // Show aura and click hint when in view
    if (horizontalScrollTween) {
        ScrollTrigger.create({
            trigger: '.buffalo-swing-wrapper',
            start: 'left 70%',
            end: 'right 30%',
            containerAnimation: horizontalScrollTween,
            onEnter: () => {
                buffaloWrapper.classList.add('aura-visible');
            },
            onLeaveBack: () => {
                buffaloWrapper.classList.remove('aura-visible');
            },
            onLeave: () => {
                buffaloWrapper.classList.remove('aura-visible');
            }
        });
    }

    buffaloImage.addEventListener('click', async () => {
        if (isAnimating) return;

        isAnimating = true;

        // Play sequence 0 -> 1 -> 2 -> 3 -> 4
        for (let i = 1; i < imageSequence.length; i++) {
            buffaloImage.src = imageSequence[i];
            await new Promise(resolve => setTimeout(resolve, 200)); // Wait 1 second
        }

        // Stay at frame 4 for 1 second
        await new Promise(resolve => setTimeout(resolve, 300));

        // Return to frame 0
        buffaloImage.src = imageSequence[0];

        isAnimating = false;
    });
}


function initLopburiSlideUp() {
    if (!horizontalScrollTween) return;
    const lopburiRight = document.querySelector('.lopburi-right');
    const lopburiLeft = document.querySelector('.lopburi-left');
    const lopburiCenter = document.querySelector('.lopburi-center');
    if (!lopburiRight || !lopburiLeft || !lopburiCenter) return;

    gsap.fromTo(lopburiRight,
        { y: 120, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.lopburi-background',
                start: 'left 80%',
                end: 'right 20%',
                containerAnimation: horizontalScrollTween,
                toggleActions: 'play reverse play reverse'
            }
        }
    );

    gsap.fromTo(lopburiLeft,
        { y: 80, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.1,
            scrollTrigger: {
                trigger: '.lopburi-background',
                start: 'left 80%',
                end: 'right 20%',
                containerAnimation: horizontalScrollTween,
                toggleActions: 'play reverse play reverse'
            }
        }
    );

    gsap.fromTo(lopburiCenter,
        { y: 40, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power2.out',
            delay: 0.2,
            scrollTrigger: {
                trigger: '.lopburi-background',
                start: 'left 80%',
                end: 'right 20%',
                containerAnimation: horizontalScrollTween,
                toggleActions: 'play reverse play reverse'
            }
        }
    );
}

function initLopburiFightersBillboard() {
    if (!horizontalScrollTween) return;
    const fighters = [
        { selector: '.lopburi-fighter-1', delay: 0, floatAmount: -8 },
        { selector: '.lopburi-fighter-2', delay: 0.1, floatAmount: -10 },
        { selector: '.lopburi-fighter-3', delay: 0.2, floatAmount: -7 },
        { selector: '.lopburi-fighter-4', delay: 0.3, floatAmount: -9 }
    ];

    fighters.forEach(({ selector, delay, floatAmount }) => {
        const fighter = document.querySelector(selector);
        if (!fighter) return;

        let floatTween = null;

        // Billboard animation
        gsap.fromTo(fighter,
            {
                rotateX: 90,
                y: 20,
                opacity: 0
            },
            {
                rotateX: 0,
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power2.out',
                delay: delay,
                scrollTrigger: {
                    trigger: '.lopburi-fighters',
                    start: 'left 70%',
                    end: 'right 30%',
                    containerAnimation: horizontalScrollTween,
                    toggleActions: 'play reverse play reverse',
                    onEnter: () => {
                        // Kill any existing float animation
                        if (floatTween) floatTween.kill();
                        // Start floating animation after billboard completes
                        floatTween = gsap.to(fighter, {
                            y: floatAmount,
                            duration: 1.5 + (delay * 0.5),
                            ease: 'sine.inOut',
                            repeat: -1,
                            yoyo: true,
                            delay: 1.2 + delay
                        });
                    },
                    onLeaveBack: () => {
                        // Kill floating animation when scrolling back
                        if (floatTween) {
                            floatTween.kill();
                            floatTween = null;
                        }
                    },
                    onEnterBack: () => {
                        // Restart floating animation when scrolling forward again
                        if (floatTween) floatTween.kill();
                        floatTween = gsap.to(fighter, {
                            y: floatAmount,
                            duration: 1.5 + (delay * 0.5),
                            ease: 'sine.inOut',
                            repeat: -1,
                            yoyo: true,
                            delay: 1.2 + delay
                        });
                    },
                    onLeave: () => {
                        // Kill floating animation when scrolling past
                        if (floatTween) {
                            floatTween.kill();
                            floatTween = null;
                        }
                    }
                }
            }
        );
    });
}
function initLopburiFighters2() {
    if (!horizontalScrollTween) return;

    const fighter5 = document.querySelector('.lopburi-fighter-5');
    if (!fighter5) return;

    let floatTween = null;

    gsap.fromTo(fighter5,
        {
            rotateX: 90,
            y: 20,
            opacity: 0
        },
        {
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.lopburi-fighters-2',
                start: 'left 70%',
                end: 'right 30%',
                containerAnimation: horizontalScrollTween,
                toggleActions: 'play reverse play reverse',
                onEnter: () => {
                    if (floatTween) floatTween.kill();
                    floatTween = gsap.to(fighter5, {
                        y: -10,
                        duration: 1.8,
                        ease: 'sine.inOut',
                        repeat: -1,
                        yoyo: true,
                        delay: 1.2
                    });
                },
                onLeaveBack: () => {
                    if (floatTween) { floatTween.kill(); floatTween = null; }
                },
                onLeave: () => {
                    if (floatTween) { floatTween.kill(); floatTween = null; }
                }
            }
        }
    );
}
function initLopburiTextSlideUp() {
    if (!horizontalScrollTween) return;
    const textBox = document.querySelector('.text-box-8');
    if (!textBox) return;

    gsap.fromTo(textBox,
        {
            y: 60,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.text-box-8',
                start: 'left 70%',
                end: 'right 30%',
                containerAnimation: horizontalScrollTween,
                toggleActions: 'play reverse play reverse'
            }
        }
    );
}

function initAyutthayaParallax() {
    if (!horizontalScrollTween) return;
    const templeRight = document.querySelector('.temple-right');
    const templeLeft = document.querySelector('.temple-left');
    const templeCenter = document.querySelector('.temple-center');
    if (!templeRight || !templeLeft || !templeCenter) return;

    gsap.fromTo(templeRight, { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: '.ayutthaya-temples', start: 'left 80%', end: 'right 20%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' } });
    gsap.fromTo(templeLeft, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.1, scrollTrigger: { trigger: '.ayutthaya-temples', start: 'left 80%', end: 'right 20%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' } });
    gsap.fromTo(templeCenter, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: 'power2.out', delay: 0.2, scrollTrigger: { trigger: '.ayutthaya-temples', start: 'left 80%', end: 'right 20%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' } });
    gsap.to(templeRight, { x: -80, ease: 'none', scrollTrigger: { trigger: '.ayutthaya-temples', start: 'left right', end: 'right left', scrub: 2, containerAnimation: horizontalScrollTween } });
    gsap.to(templeLeft, { x: -120, ease: 'none', scrollTrigger: { trigger: '.ayutthaya-temples', start: 'left right', end: 'right left', scrub: 1.5, containerAnimation: horizontalScrollTween } });
    gsap.to(templeCenter, { x: -160, ease: 'none', scrollTrigger: { trigger: '.ayutthaya-temples', start: 'left right', end: 'right left', scrub: 1, containerAnimation: horizontalScrollTween } });
}

function initAyutthayaTextAnimation() {
    if (!horizontalScrollTween) return;
    ['.text-box-3', '.text-box-4', '.text-box-5'].forEach((selector, index) => {
        const textBox = document.querySelector(selector);
        if (!textBox) return;
        gsap.fromTo(textBox, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out', delay: index * 0.1, scrollTrigger: { trigger: selector, start: 'left 75%', end: 'right 25%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' } });
    });
}

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

function initRegionalFightersAnimation() {
    if (!horizontalScrollTween) return;
    const regionalFighters = document.querySelectorAll('.regional-fighter');
    const fighterLabels = document.querySelectorAll('.fighter-label');
    if (regionalFighters.length === 0) return;

    // ฟังก์ชันสำหรับเล่นแอนิเมชัน 3D Parallax
    const playAnimation = () => {
        // Kill animation เก่าก่อนเพื่อป้องกันการทับซ้อน
        gsap.killTweensOf(regionalFighters);
        gsap.killTweensOf(fighterLabels);

        regionalFighters.forEach((fighter, i) => {
            // Billboarding: rotateX จาก 90deg (แบนราบ) → 0deg (ตั้งฉาก)
            gsap.to(fighter, {
                rotateX: 0,
                opacity: 1,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'back.out(1.2)',
                onComplete: () => {
                    // เมื่อขึ้นมาหมดแล้ว เพิ่ม idle animation
                    fighter.classList.add('idle');
                }
            });
        });

        fighterLabels.forEach((label, i) => {
            // Fade-in + Move up สำหรับข้อความ
            gsap.to(label, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: i * 0.15 + 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    // เมื่อขึ้นมาหมดแล้ว เพิ่ม idle animation
                    label.classList.add('idle');
                }
            });
        });
    };

    // ฟังก์ชันสำหรับ fade out นุ่มนวล
    const resetAnimation = () => {
        // Kill animation เก่าก่อนเพื่อป้องกันการทับซ้อน
        gsap.killTweensOf(regionalFighters);
        gsap.killTweensOf(fighterLabels);

        regionalFighters.forEach((f, i) => {
            f.classList.remove('idle');
            // ใช้ gsap.to() แทน gsap.set() เพื่อให้มี fade out ที่นุ่มนวล
            gsap.to(f, {
                rotateX: 90,
                opacity: 0,
                duration: 0.4,
                delay: i * 0.05,
                ease: 'power2.in'
            });
        });

        fighterLabels.forEach((l, i) => {
            l.classList.remove('idle');
            // Fade out + Move down สำหรับข้อความ
            gsap.to(l, {
                y: 20,
                opacity: 0,
                duration: 0.3,
                delay: i * 0.05,
                ease: 'power2.in'
            });
        });
    };

    ScrollTrigger.create({
        trigger: '.regional-fighters',
        start: 'left 70%',
        end: 'right 30%',
        containerAnimation: horizontalScrollTween,
        onEnter: playAnimation,
        onLeaveBack: resetAnimation,
        onLeave: resetAnimation,
        onEnterBack: playAnimation  // เด้งขึ้นมาใหม่ตอน scroll ย้อนกลับ
    });
}

function initAyutthayaImagesAnimation() {
    if (!horizontalScrollTween) return;
    const khanomTom = document.querySelector('.khanom-tom-fighter');
    const thailandMap = document.querySelector('.boran-thailand-image');
    if (!khanomTom || !thailandMap) return;

    // Set ค่าเริ่มต้นให้ GSAP รับรู้ก่อน
    gsap.set(thailandMap, { y: 300, opacity: 0 });
    gsap.set(khanomTom, { y: -100, opacity: 0 });

    const playAnimation = () => {
        gsap.killTweensOf([khanomTom, thailandMap]);

        gsap.to(khanomTom, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.to(thailandMap, {
            y: -300,
            opacity: 1,
            duration: 1.5,
            delay: 0.2,
            ease: 'power3.out'
        });
    };

    const resetAnimation = () => {
        gsap.killTweensOf([khanomTom, thailandMap]);

        gsap.to(khanomTom, {
            y: -100,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in'
        });

        gsap.to(thailandMap, {
            y: 300,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in'
        });
    };

    ScrollTrigger.create({
        trigger: '.khanom-tom-fighter',
        start: 'left 85%',
        end: 'right -10%',
        containerAnimation: horizontalScrollTween,
        onEnter: playAnimation,
        onLeaveBack: resetAnimation,
        onLeave: resetAnimation,
        onEnterBack: playAnimation
    });
}

function initSukhothaiTextAnimation() {
    if (!horizontalScrollTween) return;
    const textBox = document.querySelector('.text-box-1');
    if (!textBox) return;
    gsap.fromTo(textBox,
        { y: 80, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 1.2, ease: 'power2.out',
            scrollTrigger: {
                trigger: '.text-box-1',
                start: 'left 75%',
                end: 'right 25%',
                containerAnimation: horizontalScrollTween,
                toggleActions: 'play reverse play reverse'
            }
        }
    );
}
function initWalkingFighter() {
    const img = document.getElementById('walking-fighter-img');
    if (!img) return;

    const framesOld = [
        'img/walk/fighter-walk-old-1.png',
        'img/walk/fighter-walk-old-2.png',
        'img/walk/fighter-walk-old-3.png',
        'img/walk/fighter-walk-old-4.png',
        'img/walk/fighter-walk-old-5.png',
        'img/walk/fighter-walk-old-6.png',
        'img/walk/fighter-walk-old-7.png',
    ];

    const framesNew = [
        'img/walk/fighter-walk-new-1.png',
        'img/walk/fighter-walk-new-2.png',
        'img/walk/fighter-walk-new-3.png',
        'img/walk/fighter-walk-new-4.png',
        'img/walk/fighter-walk-new-5.png',
        'img/walk/fighter-walk-new-6.png',
        'img/walk/fighter-walk-new-7.png',
    ];

    let currentFrames = framesOld;
    let currentFrame = 0;
    let isWalking = false;
    let walkInterval = null;
    let scrollStopTimer = null;
    const FRAME_SPEED = 100;

    // ตรวจว่า scroll ถึง Present Day หรือยัง
    function checkEra() {
        const trackEl = document.getElementById('timeline-track');
        if (!trackEl) return;

        const trackX = gsap.getProperty(trackEl, 'x');

        // หา floor-artboard-10 อันแรกที่เจอ
        const floor10 = document.querySelector('img[src="img/floor/floor-artboard-10.png"]');
        if (!floor10) return;

        const floorScreenX = floor10.offsetLeft + trackX;

        if (floorScreenX <= window.innerWidth * 0.5) {
            if (currentFrames !== framesNew) {
                currentFrames = framesNew;
                currentFrame = 0;
                img.src = currentFrames[0];
            }
        } else {
            if (currentFrames !== framesOld) {
                currentFrames = framesOld;
                currentFrame = 0;
                img.src = currentFrames[0];
            }
        }
    }

    function startWalking() {
        if (isWalking) return;
        isWalking = true;
        walkInterval = setInterval(() => {
            currentFrame = (currentFrame + 1) % currentFrames.length;
            img.src = currentFrames[currentFrame];
        }, FRAME_SPEED);
    }

    function stopWalking() {
        isWalking = false;
        clearInterval(walkInterval);
        walkInterval = null;
        currentFrame = 0;
        img.src = currentFrames[0];
    }

    window.addEventListener('scroll', () => {
        checkEra();
        startWalking();

        clearTimeout(scrollStopTimer);
        scrollStopTimer = setTimeout(() => {
            stopWalking();
        }, 800);
    });
}
function initSukhothaiKickAnimation() {
    const container = document.querySelector('.sukhothai-kick-container');
    const kickPose = document.querySelector('.kick-pose');

    if (!container || !kickPose) {
        console.log('Sukhothai kick pose not found');
        return;
    }

    const framesData = kickPose.getAttribute('data-kick-frames');
    if (!framesData) {
        console.log('No frames data');
        return;
    }

    const frames = framesData.split(',');
    const originalSrc = kickPose.src;
    let isHovering = false;

    console.log('Sukhothai kick animation initialized', frames);

    const playOnce = () => {
        let currentFrame = 0;

        const frameInterval = setInterval(() => {
            currentFrame++;
            kickPose.src = frames[currentFrame];

            if (currentFrame >= frames.length - 1) {
                clearInterval(frameInterval);
                setTimeout(() => {
                    if (isHovering) playOnce();
                }, 1500);
            }
        }, 180);
    };

    container.addEventListener('mouseenter', () => {
        console.log('Mouse entered!');
        isHovering = true;
        container.classList.add('hovering');
        kickPose.src = frames[0];
        playOnce();
    });

    container.addEventListener('mouseleave', () => {
        console.log('Mouse left!');
        isHovering = false;
        container.classList.remove('hovering');
        kickPose.src = originalSrc;
    });
}

function initKaraokeAnimation() {
    if (!horizontalScrollTween) return;
    const karaokeTextBoxes = [
        { selector: '.text-box-2', multiplier: 1.5 },
        { selector: '.text-box-4', multiplier: 1.5 },
        { selector: '.text-box-6', multiplier: 1.5 },
        { selector: '.text-box-7', multiplier: 1.5 }
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
// CHAIYA ANIMATIONS
// =============================================================================

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
                end: `left+=${index * 8 + 8}% 35%`,
                scrub: 0.1,
            }
        });
    });
}

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
                opacity: 1, filter: 'blur(0px)', stagger: 0.04, ease: 'none', duration: 0.6,
                scrollTrigger: { trigger: box, start: 'left 75%', end: 'left 45%', scrub: 0.3, containerAnimation: horizontalScrollTween }
            }
        );
    });
}

function initChaiyaFighterScrubReveal() {
    if (!horizontalScrollTween) return;

    const earlyGroup = [
        { fighter: ".chaiya-fighter-1", label: ".label-chaiya-1", rotDir: -8 },
        { fighter: ".chaiya-fighter-2", label: ".label-chaiya-2", rotDir: 8 },
        { fighter: ".wai-kru-swap", label: ".label-chaiya-3", rotDir: -8 },
        { fighter: ".chaiya-fighter-4", label: ".label-chaiya-4", rotDir: 8 },
        { fighter: ".chaiya-fighter-5", label: ".label-chaiya-5", rotDir: -8 },
    ];

    earlyGroup.forEach((item) => {
        const fighterEl = document.querySelector(item.fighter);
        const labelEl = document.querySelector(item.label);
        if (!fighterEl) return;

        const isWaiKru = item.fighter === ".wai-kru-swap";

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

                    if (isWaiKru) {
                        fighterEl.closest('.chaiya-container')?.classList.add('aura-visible');
                    }
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

                    if (isWaiKru) {
                        fighterEl.closest('.chaiya-container')?.classList.remove('aura-visible');
                    }
                },
            }
        });

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
                    gsap.to(labelEl, { y: 0, scale: 1, rotation: 0, duration: 0.6, ease: "elastic.out(1.2, 0.4)" });
                },
                onLeaveBack: () => {
                    gsap.to(labelEl, { opacity: 0, y: 80, scale: 0.5, rotation: item.rotDir * 0.5, duration: 0.3, ease: "power1.in" });
                },
            }
        });
    });

    // === Fighter-6 + Label-6 ===
    [
        { selector: ".chaiya-fighter-6", isLabel: false },
        { selector: ".label-chaiya-6", isLabel: true },
    ].forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;

        if (item.isLabel) { gsap.set(el, { opacity: 0, y: 60 }); }
        else { gsap.set(el, { opacity: 0, y: 200, scale: 0.5, rotation: -15 }); }

        gsap.to(el, {
            opacity: 1, ease: "power2.out",
            scrollTrigger: {
                trigger: ".text-box-11", containerAnimation: horizontalScrollTween,
                start: "left 45%", end: "left 20%", scrub: 1,
                onEnter: () => {
                    if (item.isLabel) { gsap.to(el, { y: 0, duration: 0.6, ease: "power2.out" }); }
                    else { gsap.to(el, { y: 0, scale: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)" }); }
                },
                onUpdate: (self) => {
                    if (self.progress > 0.5 && !el.classList.contains('idle')) { el.classList.add('idle'); }
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

    // === Fighter-7 + Label-7 ===
    [
        { selector: ".chaiya-fighter-7", isLabel: false },
        { selector: ".label-chaiya-7", isLabel: true },
    ].forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;

        if (item.isLabel) { gsap.set(el, { opacity: 0, y: 60 }); }
        else { gsap.set(el, { opacity: 0, y: 200, scale: 0.5, rotation: 15 }); }

        gsap.to(el, {
            opacity: 1, ease: "power2.out",
            scrollTrigger: {
                trigger: ".text-box-11", containerAnimation: horizontalScrollTween,
                start: "left 35%", end: "left 10%", scrub: 1,
                onEnter: () => {
                    if (item.isLabel) { gsap.to(el, { y: 0, duration: 0.6, ease: "power2.out" }); }
                    else { gsap.to(el, { y: 0, scale: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)" }); }
                },
                onUpdate: (self) => {
                    if (self.progress > 0.5 && !el.classList.contains('idle')) { el.classList.add('idle'); }
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

    // === Fighters 8-11 ===
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

        gsap.set(fighterEl, { opacity: 0, y: 150, scale: 0.6, rotation: item.rotDir });

        gsap.to(fighterEl, {
            opacity: 1, ease: "power2.out",
            scrollTrigger: {
                trigger: fighterEl, containerAnimation: horizontalScrollTween,
                start: "left 50%", end: "left 20%", scrub: 1,
                onEnter: () => {
                    const tb12 = document.querySelector('.text-box-12');
                    const tb12Rect = tb12?.getBoundingClientRect();
                    if (!tb12 || tb12Rect.left > window.innerWidth * 0.5) return;

                    gsap.to(fighterEl, { y: 0, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(2)" });
                },
                onUpdate: (self) => {
                    if (self.progress > 0.6 && !fighterEl.classList.contains('idle')) { fighterEl.classList.add('idle'); }
                },
                onEnterBack: () => fighterEl.classList.remove('idle'),
                onLeaveBack: () => {
                    fighterEl.classList.remove('idle');
                    gsap.to(fighterEl, { opacity: 0, y: 150, scale: 0.6, rotation: item.rotDir, duration: 0.3, ease: "power1.in" });
                },
            }
        });

        if (!labelEl) return;
        gsap.set(labelEl, { opacity: 0, y: 80, scale: 0.5, rotation: item.rotDir * 0.5 });

        gsap.to(labelEl, {
            opacity: 1, ease: "power2.out",
            scrollTrigger: {
                trigger: fighterEl, containerAnimation: horizontalScrollTween,
                start: "left 45%", end: "left 15%", scrub: 1,
                onEnter: () => {
                    const tb12 = document.querySelector('.text-box-12');
                    const tb12Rect = tb12?.getBoundingClientRect();
                    if (!tb12 || tb12Rect.left > window.innerWidth * 0.5) return;

                    gsap.to(labelEl, { y: 0, scale: 1, rotation: 0, duration: 0.6, ease: "elastic.out(1.2, 0.4)" });
                },
                onLeaveBack: () => {
                    gsap.to(labelEl, { opacity: 0, y: 80, scale: 0.5, rotation: item.rotDir * 0.5, duration: 0.3, ease: "power1.in" });
                },
            }
        });
    });
}

function initWaiKruHoverSwap() {
    const img = document.querySelector('.wai-kru-swap');
    if (!img) return;

    const originalSrc = img.src;
    const hoverSrc = img.getAttribute('data-hover-src');
    if (!hoverSrc) return;

    img.addEventListener('mouseenter', () => { img.src = hoverSrc; });
    img.addEventListener('mouseleave', () => { img.src = originalSrc; });
}

function initThaSaoParallax() {
    if (!horizontalScrollTween) return;

    const under = document.querySelector('.tha-sao-under');
    if (under) {
        gsap.set(under, { opacity: 0, y: 100, scale: 0.8 });
        ScrollTrigger.create({
            trigger: ".tha-sao-background", containerAnimation: horizontalScrollTween, start: "left 25%",
            onEnter: () => { gsap.to(under, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }); },
            onLeaveBack: () => { gsap.to(under, { opacity: 0, y: 100, scale: 0.8, duration: 0.2, ease: "power1.in" }); },
        });
    }

    const above = document.querySelector('.tha-sao-above');
    if (above) {
        gsap.set(above, { opacity: 0, y: -120, scale: 0.8 });
        ScrollTrigger.create({
            trigger: ".tha-sao-background", containerAnimation: horizontalScrollTween, start: "left 20%",
            onEnter: () => { gsap.to(above, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }); },
            onLeaveBack: () => { gsap.to(above, { opacity: 0, y: -120, scale: 0.8, duration: 0.2, ease: "power1.in" }); },
        });
    }
}

function initRemainingKaraokeBoxes() {
    if (!horizontalScrollTween) return;

    // .text-box-22 is intentionally excluded from this shared loop.
    // It sits at the absolute end of the track so its LEFT edge never
    // reaches 'left 20%' before horizontal scrolling maxes out — the
    // scrub would stall mid-reveal. It gets its own trigger below.
    const boxes = [
        '.text-box-9',
        '.text-box-13', '.text-box-14', '.text-box-15',
        '.text-box-16', '.text-box-17', '.text-box-18',
        '.text-box-19', '.text-box-20', '.text-box-21'
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
                opacity: 1, filter: 'blur(0px)', stagger: 0.02, ease: 'none', duration: 0.6,
                scrollTrigger: {
                    trigger: box,
                    start: 'left 70%',
                    end: 'left 20%',
                    scrub: 0.3,
                    containerAnimation: horizontalScrollTween
                }
            }
        );
    });

    // ── text-box-22 dedicated trigger ────────────────────────────────────
    // Uses the RIGHT edge so the scrub range lands entirely within the
    // portion of the horizontal scroll that actually plays out.
    // right 110% → box hasn't entered view yet  (start scrub)
    // right 60%  → box is ~40 % across the screen (end scrub, fully lit)
    // Both points are reachable before the pin releases.
    const box22 = document.querySelector('.text-box-22');
    if (box22) {
        box22.querySelectorAll('p').forEach(p => wrapCharsInNode(p));
        const chars22 = Array.from(box22.querySelectorAll('.karaoke-char'));
        if (chars22.length) {
            gsap.fromTo(chars22,
                { opacity: 0.15, filter: 'blur(4px)' },
                {
                    opacity: 1, filter: 'blur(0px)', stagger: 0.02, ease: 'none', duration: 0.6,
                    scrollTrigger: {
                        trigger: box22,
                        start: 'right 110%', // right edge just about to enter viewport
                        end: 'right 60%',    // right edge at 60 % — well before track stops
                        scrub: 0.3,
                        containerAnimation: horizontalScrollTween
                    }
                }
            );
        }
    }
}

function initThaSaoFighters() {
    if (!horizontalScrollTween) return;

    const tb13Passed = () => {
        const tb13 = document.querySelector('.text-box-13');
        if (!tb13) return true;
        return tb13.getBoundingClientRect().left < window.innerWidth * 0.5;
    };

    const allFighters = [
        { selector: ".tha-sao-kick", dir: -1, start: "left 50%" },
        { selector: ".tha-sao-elbow", dir: 1, start: "left 70%" },
        { selector: ".tha-sao-fighter2-1", dir: -1, start: "left 50%" },
        { selector: ".tha-sao-defend", dir: -1, start: "left 50%" },
        { selector: ".tha-sao-parry", dir: 1, start: "left 70%" },
        { selector: ".tha-sao-attacks", dir: -1, start: "left 70%" },
    ];

    allFighters.forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;

        const isThaSaoSwap = item.selector === ".tha-sao-fighter2-1";
        const startX = 150 * item.dir;
        gsap.set(el, { opacity: 0, x: startX, scale: 0.7, rotation: 8 * item.dir });

        ScrollTrigger.create({
            trigger: el, containerAnimation: horizontalScrollTween, start: item.start,
            onEnter: () => {
                if (!tb13Passed()) return;
                gsap.to(el, {
                    opacity: 1, x: 0, scale: 1, rotation: 0, duration: 0.6, ease: "power3.out",
                    onComplete: () => {
                        startIdleAnimation(el, item.dir);
                        if (isThaSaoSwap) {
                            el.closest('.tha-sao-container-2')?.classList.add('aura-visible');
                        }
                    }
                });
            },
            onLeaveBack: () => {
                gsap.killTweensOf(el);
                gsap.to(el, { opacity: 0, x: startX, scale: 0.7, rotation: 8 * item.dir, duration: 0.3, ease: "power1.in" });
                if (isThaSaoSwap) {
                    el.closest('.tha-sao-container-2')?.classList.remove('aura-visible');
                }
            },
        });
    });

    // group labels
    const groupLabels = [
        { selector: ".tha-sao-group-label", trigger: ".tha-sao-fighters" },
        { selector: ".tha-sao-group-label-2", trigger: ".tha-sao-fighters-2" },
        { selector: ".tha-sao-group-label-3", trigger: ".tha-sao-fighters-3" },
    ];

    groupLabels.forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 30 });
        ScrollTrigger.create({
            trigger: item.trigger, containerAnimation: horizontalScrollTween, start: "left 50%",
            onEnter: () => {
                if (!tb13Passed()) return;
                gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
            },
            onLeaveBack: () => { gsap.to(el, { opacity: 0, y: 30, duration: 0.2, ease: "power1.in" }); },
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
        animationInterval = setInterval(() => { currentFrame = (currentFrame + 1) % frames.length; img.src = frames[currentFrame]; }, 800);
    });
    img.addEventListener('mouseleave', () => {
        if (animationInterval) { clearInterval(animationInterval); animationInterval = null; }
        currentFrame = 0; img.src = frames[0];
    });
}

function initThonburiParallax() {
    if (!horizontalScrollTween) return;
    const layers = [
        { selector: ".thonburi-under", delay: 0 },
        { selector: ".thonburi-center", delay: 15 },
        { selector: ".thonburi-above", delay: 30 },
    ];
    layers.forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 100, scale: 0.85 });
        ScrollTrigger.create({
            trigger: ".thonburi-background", containerAnimation: horizontalScrollTween, start: `left+=${item.delay}% 30%`,
            onEnter: () => { gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.15, ease: "back.out(1.7)" }); },
            onLeaveBack: () => { gsap.to(el, { opacity: 0, y: 100, scale: 0.85, duration: 0.2, ease: "power1.in" }); },
        });
    });
}

function initThonburiHoverSwap() {
    const img = document.querySelector('.thonburi-swap');
    if (!img) return;
    const framesData = img.getAttribute('data-frames');
    if (!framesData) return;
    const frames = framesData.split(',');
    let currentFrame = 0;
    let animationInterval = null;
    img.addEventListener('mouseenter', () => {
        currentFrame = 0;
        animationInterval = setInterval(() => { currentFrame = (currentFrame + 1) % frames.length; img.src = frames[currentFrame]; }, 900);
    });
    img.addEventListener('mouseleave', () => {
        if (animationInterval) { clearInterval(animationInterval); animationInterval = null; }
        currentFrame = 0; img.src = frames[0];
    });
}

function initThonburiFighterReveal() {
    if (!horizontalScrollTween) return;

    const fighter = document.querySelector('.thonburi-fighter-1');
    if (!fighter) return;

    gsap.set(fighter, { opacity: 0, scale: 0.3, y: 0 });

    const tb14Passed = () => {
        const tb14 = document.querySelector('.text-box-14');
        if (!tb14) return true;
        return tb14.getBoundingClientRect().left < window.innerWidth * 0.3;
    };

    const playSlamAnimation = () => {
        gsap.killTweensOf(fighter);
        const tl = gsap.timeline({
            onComplete: () => {
                startIdleAnimation(fighter, -1);
                fighter.closest('.thonburi-container')?.classList.add('aura-visible');
            }
        });
        tl
            .set(fighter, { opacity: 0, scale: 0.3, y: 0 })
            .to(fighter, {
                opacity: 1,
                scale: 1.08,
                duration: 0.55,
                ease: 'power2.out'
            })
            .to(fighter, {
                scale: 1,
                duration: 0.25,
                ease: 'elastic.out(1.2, 0.5)'
            });
    };

    ScrollTrigger.create({
        trigger: '.thonburi-fighters',
        containerAnimation: horizontalScrollTween,
        start: 'left 60%',
        onEnter: () => {
            if (!tb14Passed()) return;
            playSlamAnimation();
        },
        onLeaveBack: () => {
            gsap.killTweensOf(fighter);
            fighter.closest('.thonburi-container')?.classList.remove('aura-visible');
            gsap.to(fighter, {
                opacity: 0,
                scale: 0.3,
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => gsap.set(fighter, { scale: 0.3 })
            });
        }
    });

    ScrollTrigger.create({
        trigger: '.text-box-14',
        containerAnimation: horizontalScrollTween,
        start: 'left 30%',
        onEnter: () => {
            const fighterRect = fighter.getBoundingClientRect();
            if (fighterRect.left < window.innerWidth && gsap.getProperty(fighter, 'opacity') < 0.5) {
                playSlamAnimation();
            }
        }
    });
}

function initEarlyRatanaParallax() {
    if (!horizontalScrollTween) return;
    const layers = [
        { selector: ".early-ratana-under", delay: 0 },
        { selector: ".early-ratana-left", delay: 10 },
        { selector: ".early-ratana-right", delay: 20 },
    ];
    layers.forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 100, scale: 0.85 });
        ScrollTrigger.create({
            trigger: ".early-ratana-background",
            containerAnimation: horizontalScrollTween,
            start: `left+=${item.delay}% 40%`,
            onEnter: () => { gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }); },
            onLeaveBack: () => { gsap.killTweensOf(el); gsap.to(el, { opacity: 0, y: 100, scale: 0.85, duration: 0.15, ease: "power3.in" }); },
        });
    });

    const rama5 = document.querySelector('.early-ratana-pic-rama5');
    if (rama5) {
        gsap.set(rama5, { opacity: 0, y: 120, scale: 0.85 });
        ScrollTrigger.create({
            trigger: '.text-box-16', containerAnimation: horizontalScrollTween, start: 'left 20%',
            onEnter: () => {
                gsap.to(rama5, {
                    opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)',
                    onComplete: () => { }
                });
            },
            onLeaveBack: () => {
                gsap.to(rama5, { opacity: 0, y: 120, scale: 0.85, duration: 0.5, ease: 'power2.in' });
            },
        });
    }
}

function initEarlyRatanaFighterReveal() {
    if (!horizontalScrollTween) return;
    const fighter = document.querySelector('.early-ratana-fighter-1');
    if (!fighter) return;
    gsap.set(fighter, { opacity: 0, y: 120, scale: 0.85 });
    ScrollTrigger.create({
        trigger: '.early-ratana-fighters', containerAnimation: horizontalScrollTween, start: 'left 60%',
        onEnter: () => {
            gsap.to(fighter, {
                opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.7)',
                onComplete: () => {
                    fighter.closest('.early-ratana-container')?.classList.add('aura-visible');
                }
            });
        },
        onLeaveBack: () => {
            fighter.closest('.early-ratana-container')?.classList.remove('aura-visible');
            gsap.to(fighter, { opacity: 0, y: 120, scale: 0.85, duration: 0.3, ease: 'power1.in' });
        },
    });
}

function initEarlyRatanaClickSwap() {
    const img = document.querySelector('.early-ratana-swap');
    if (!img) return;
    const framesData = img.getAttribute('data-frames');
    if (!framesData) return;
    const frames = framesData.split(',');
    let isPlaying = false;

    img.addEventListener('click', () => {
        if (isPlaying) return;
        isPlaying = true;
        let currentFrame = 0;
        const playInterval = setInterval(() => {
            currentFrame++;
            img.src = frames[currentFrame];
            if (currentFrame >= frames.length - 1) {
                clearInterval(playInterval);
                setTimeout(() => { img.src = frames[0]; isPlaying = false; }, 700);
            }
        }, 200);
    });
}

// =============================================
// MID RATTANAKOSIN
// =============================================
function initMidRatanaParallax() {
    if (!horizontalScrollTween) return;
    const under = document.querySelector('.mid-ratana-under');
    const above = document.querySelector('.mid-ratana-above');

    const tb17Passed = () => {
        const tb17 = document.querySelector('.text-box-17');
        if (!tb17) return true;
        return tb17.getBoundingClientRect().left < window.innerWidth * 0.2;
    };

    const hideUnder = () => {
        gsap.killTweensOf(under);
        gsap.to(under, { opacity: 0, filter: 'blur(20px)', scale: 1.05, duration: 0.4, ease: 'power2.in' });
    };
    const hideAbove = () => {
        gsap.killTweensOf(above);
        gsap.to(above, { opacity: 0, filter: 'blur(20px)', scale: 1.05, duration: 0.4, ease: 'power2.in' });
    };

    const playUnder = () => {
        gsap.to(under, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.0, ease: 'power2.out' });
    };
    const playAbove = () => {
        gsap.to(above, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.0, ease: 'power2.out' });
    };

    if (under) {
        gsap.set(under, { opacity: 0, filter: 'blur(20px)', scale: 1.05 });
        ScrollTrigger.create({
            trigger: '.mid-ratana-background', containerAnimation: horizontalScrollTween, start: 'left 65%',
            onEnter: () => { if (!tb17Passed()) return; playUnder(); },
            onLeaveBack: () => hideUnder(),
        });
        ScrollTrigger.create({
            trigger: '.text-box-17', containerAnimation: horizontalScrollTween, start: 'left 20%',
            onEnter: () => {
                const rect = under.getBoundingClientRect();
                if (rect.left < window.innerWidth && gsap.getProperty(under, 'opacity') < 0.5) playUnder();
            },
            onLeaveBack: () => hideUnder(),
        });
    }

    if (above) {
        gsap.set(above, { opacity: 0, filter: 'blur(20px)', scale: 1.05 });
        ScrollTrigger.create({
            trigger: '.mid-ratana-background', containerAnimation: horizontalScrollTween, start: 'left 50%',
            onEnter: () => { if (!tb17Passed()) return; playAbove(); },
            onLeaveBack: () => hideAbove(),
        });
        ScrollTrigger.create({
            trigger: '.text-box-17', containerAnimation: horizontalScrollTween, start: 'left 10%',
            onEnter: () => {
                const rect = above.getBoundingClientRect();
                if (rect.left < window.innerWidth && gsap.getProperty(above, 'opacity') < 0.5) playAbove();
            },
            onLeaveBack: () => hideAbove(),
        });
    }
}

function initMidRatanaFighters() {
    if (!horizontalScrollTween) return;
    const fighters = [
        { selector: '.mid-ratana-fighter-1', rotDir: -1 },
        { selector: '.mid-ratana-fighter-2', rotDir: 1 },
        { selector: '.mid-ratana-fighter-3', rotDir: -1 },
        { selector: '.mid-ratana-fighter-4', rotDir: 1 },
    ];

    fighters.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) gsap.set(el, { opacity: 0, y: 120, scale: 0.85 });
    });

    const show = (el, rotDir) => {
        gsap.killTweensOf(el);
        gsap.to(el, {
            opacity: 1, y: 0, scale: 1,
            duration: 1.1,
            ease: 'back.out(1.7)',
            onComplete: () => startIdleAnimation(el, rotDir)
        });
    };

    const hide = (el) => {
        gsap.killTweensOf(el);
        gsap.to(el, { opacity: 0, y: 120, scale: 0.85, duration: 0.5, ease: 'power2.in' });
    };

    const startOffsets = [0, 18, 36, 54];

    fighters.forEach((item, i) => {
        const el = document.querySelector(item.selector);
        if (!el) return;

        ScrollTrigger.create({
            trigger: '.text-box-18',
            containerAnimation: horizontalScrollTween,
            start: `left+=${startOffsets[i]}% 20%`,
            onEnter: () => show(el, item.rotDir),
            onLeaveBack: () => hide(el),
        });
    });
}

function startIdleAnimation(el, rotDir) {
    const tl = gsap.timeline({ repeat: -1, delay: Math.random() * 0.5 });
    tl.to(el, { y: -3, rotation: 0.4 * rotDir, duration: 0.6, ease: 'sine.inOut' })
        .to(el, { y: 0, rotation: 0, duration: 0.6, ease: 'sine.inOut' });
}

function initPresentParallax() {
    if (!horizontalScrollTween) return;
    const under = document.querySelector('.present-under');
    const above = document.querySelector('.present-above');

    const tb20Passed = () => {
        const tb20 = document.querySelector('.text-box-20');
        if (!tb20) return true;
        return tb20.getBoundingClientRect().left < window.innerWidth * 0.2;
    };

    const showUnder = () => {
        gsap.killTweensOf(under);
        gsap.to(under, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' });
    };
    const showAbove = () => {
        gsap.killTweensOf(above);
        gsap.to(above, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' });
    };
    const hideUnder = () => {
        gsap.killTweensOf(under);
        gsap.to(under, { opacity: 0, y: 120, duration: 0.3, ease: 'power1.in' });
    };
    const hideAbove = () => {
        gsap.killTweensOf(above);
        gsap.to(above, { opacity: 0, y: 120, duration: 0.3, ease: 'power1.in' });
    };

    if (under) {
        gsap.set(under, { opacity: 0, y: 120 });
        ScrollTrigger.create({
            trigger: '.present-background', containerAnimation: horizontalScrollTween, start: 'left 65%',
            onEnter: () => { if (!tb20Passed()) return; showUnder(); },
            onLeaveBack: () => hideUnder(),
        });
        ScrollTrigger.create({
            trigger: '.text-box-20', containerAnimation: horizontalScrollTween, start: 'left 20%',
            onEnter: () => {
                const rect = under.getBoundingClientRect();
                if (rect.left < window.innerWidth && gsap.getProperty(under, 'opacity') < 0.5) showUnder();
            },
            onLeaveBack: () => hideUnder(),
        });
    }

    if (above) {
        gsap.set(above, { opacity: 0, y: 120 });
        ScrollTrigger.create({
            trigger: '.present-background', containerAnimation: horizontalScrollTween, start: 'left 40%',
            onEnter: () => { if (!tb20Passed()) return; showAbove(); },
            onLeaveBack: () => hideAbove(),
        });
        ScrollTrigger.create({
            trigger: '.text-box-20', containerAnimation: horizontalScrollTween, start: 'left 10%',
            onEnter: () => {
                const rect = above.getBoundingClientRect();
                if (rect.left < window.innerWidth && gsap.getProperty(above, 'opacity') < 0.5) showAbove();
            },
            onLeaveBack: () => hideAbove(),
        });
    }
}

// =============================================
// PRESENT FIGHTERS — รอ text-box-21 เล่นจบก่อน
// แล้วค่อย trigger รูปทีละอัน
// =============================================
function initPresentFighters() {
    if (!horizontalScrollTween) return;

    const fighters = [
        { selector: '.present-fighter-1', x: -150, y: 0 },
        { selector: '.present-fighter-2', x: 0, y: 120 },
        { selector: '.present-fighter-3', x: 150, y: 0 },
    ];

    // reset ทุกรูปให้ซ่อนไว้ก่อน
    fighters.forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;
        gsap.set(el, { opacity: 0, x: item.x, y: item.y });
    });

    fighters.forEach((item, i) => {
        const el = document.querySelector(item.selector);
        if (!el) return;

        ScrollTrigger.create({
            trigger: '.text-box-21',
            containerAnimation: horizontalScrollTween,
            start: `right ${55 - i * 15}%`,
            onEnter: () => {
                gsap.to(el, { opacity: 1, x: 0, y: 0, duration: 0.7, ease: 'power2.out' });
            },
            onLeaveBack: () => {
                gsap.to(el, { opacity: 0, x: item.x, y: item.y, duration: 0.3, ease: 'power1.in' });
            },
        });
    });
}

// =============================================
// 🟢 PAGE TRANSITION (ใช้ GSAP คุมเส้นชัย + แก้บั๊ก Loop + แก้อ่านไม่จบ)
// =============================================
let isNavigatingToNextPage = false;
window.justReturnedCooldown = false; // ประกาศตัวแปรคูลดาวน์ให้เป็น Global

// 1. ต่อความยาวถนนให้ text-box-22 เล่นคาราโอเกะจบได้ 100%
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('timeline-track');
    if (track) {
        track.style.paddingRight = '50vw'; // ดันพื้นที่ว่างไปทางขวาครึ่งจอ
    }
});

// 2. โค้ดรับจดหมายลับตอนกลับมาจากสักยันต์
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('from') === 'sakyant') {
        window.justReturnedCooldown = true; // เปิดบาเรียกันวาร์ปทันที

        // รอให้เว็บจัดหน้าเสร็จ แล้วดึงจอขึ้นมาจากจุดล่างสุด 400px
        setTimeout(() => {
            const safePoint = document.body.scrollHeight - window.innerHeight - 400;
            window.scrollTo(0, safePoint);

            // ถอดบาเรียออกหลังจาก 2 วินาที (เพื่อให้ไปกลับได้หลายรอบ)
            setTimeout(() => {
                window.justReturnedCooldown = false;
            }, 2000);
        }, 600);
    }
});

// 3. ใช้ GSAP ScrollTrigger จับเส้นชัย (แม่นยำ 100% ไม่เอ๋อเหมือนคำนวณพิกเซลเอง)
window.addEventListener('load', () => {
    // หน่วงเวลา 1.5 วินาที รอให้ GSAP จัดขนาดหน้าจอเสร็จก่อนค่อยวางเส้นชัย
    setTimeout(() => {
        let gate = document.getElementById('transition-gate');
        if (!gate) {
            gate = document.createElement('div');
            gate.id = 'transition-gate';
            gate.style.cssText = 'position: absolute; bottom: 0; width: 100%; height: 5px; pointer-events: none;';
            document.body.appendChild(gate);
        }

        ScrollTrigger.create({
            trigger: '#transition-gate',
            start: 'bottom bottom', // ทริกเกอร์เมื่อเส้นชัยแตะขอบล่างจอจริงๆ
            onEnter: () => {
                // ถ้าติดคูลดาวน์อยู่ ให้ข้ามการวาร์ปไปเลย
                if (window.justReturnedCooldown) return;

                if (!isNavigatingToNextPage) {
                    isNavigatingToNextPage = true;
                    setTimeout(() => {
                        triggerTransitionTo('sakyant.html');
                    }, 500); // ดีเลย์ 0.5 วิก่อนวาร์ป
                }
            }
        });

        ScrollTrigger.refresh();
    }, 1500);
});

function triggerTransitionTo(url) {
    let transitionOverlay = document.getElementById('pageTransition');
    if (!transitionOverlay) {
        transitionOverlay = document.createElement('div');
        transitionOverlay.id = 'pageTransition';
        transitionOverlay.className = 'page-transition-overlay';
        document.body.appendChild(transitionOverlay);
        void transitionOverlay.offsetWidth;
    }

    transitionOverlay.classList.add('active');

    setTimeout(() => {
        window.location.href = url;
    }, 800);
}