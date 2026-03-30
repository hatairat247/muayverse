// =============================================
// History Page - MERGED Horizontal Scrolling Timeline
// =============================================

let horizontalScrollTween = null;
let isInitialized = false;

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
    initSakyantButtonReveal();

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

    document.querySelectorAll(
        '.era-section:not([data-era="sukhothai"]):not([data-era="ayutthaya"]) img'
    ).forEach(img => {
        if (!img.loading) img.loading = 'lazy';
    });

    gsap.config({ force3D: true });
    ScrollTrigger.config({ limitCallbacks: true });

});

// =============================================
// CORE: Horizontal Scroll Setup
// =============================================
function initHorizontalScroll() {
    const timelineTrack = document.querySelector('#timeline-track');
    const desktopCanvas = document.querySelector('#desktop-canvas');
    if (!timelineTrack || !desktopCanvas) { console.error('Elements not found'); return; }

    const getScrollDistance = () => {
        const lastBox = document.querySelector('.text-box-22');
        const canvasWidth = desktopCanvas.offsetWidth;

        if (lastBox) {
            let totalLeft = 0;
            let currentEl = lastBox;
            while (currentEl && currentEl.id !== 'timeline-track' && currentEl.tagName !== 'BODY') {
                totalLeft += currentEl.offsetLeft;
                currentEl = currentEl.offsetParent;
            }
            const paddingRight = canvasWidth * 0.2;
            return totalLeft + lastBox.offsetWidth - canvasWidth + paddingRight;
        }
        return timelineTrack.offsetWidth - canvasWidth;
    };

    horizontalScrollTween = gsap.to(timelineTrack, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
            trigger: '#canvas-center-wrapper',
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
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

// =============================================
// Karaoke Text Setup
// =============================================
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

// =============================================
// Ruins Parallax
// =============================================
function initRuinsParallax() {
    if (!horizontalScrollTween) return;
    const ruinsBack = document.querySelector('.ruins-back');
    const ruinsMiddle = document.querySelector('.ruins-middle');
    const ruinsFront = document.querySelector('.ruins-front');
    if (!ruinsBack || !ruinsMiddle || !ruinsFront) return;

    gsap.fromTo(ruinsBack,
        { y: 180, opacity: 0, scale: 0.85 },
        {
            y: 0, opacity: 1, scale: 1, duration: 1.0, ease: 'back.out(2)', delay: 0,
            scrollTrigger: { trigger: '.bg-ruins', start: 'left 80%', end: 'right 20%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' }
        });

    gsap.fromTo(ruinsMiddle,
        { y: 140, opacity: 0, scale: 0.88 },
        {
            y: 0, opacity: 1, scale: 1, duration: 1.0, ease: 'back.out(2.5)', delay: 0.4,
            scrollTrigger: { trigger: '.bg-ruins', start: 'left 80%', end: 'right 20%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' }
        });

    gsap.fromTo(ruinsFront,
        { y: 100, opacity: 0, scale: 0.92 },
        {
            y: 0, opacity: 1, scale: 1, duration: 1.0, ease: 'back.out(3)', delay: 0.8,
            scrollTrigger: { trigger: '.bg-ruins', start: 'left 80%', end: 'right 20%', containerAnimation: horizontalScrollTween, toggleActions: 'play reverse play reverse' }
        });

    gsap.to(ruinsBack, { x: -80, ease: 'none', scrollTrigger: { trigger: '.bg-ruins', start: 'left right', end: 'right left', scrub: 2, containerAnimation: horizontalScrollTween } });
    gsap.to(ruinsMiddle, { x: -120, ease: 'none', scrollTrigger: { trigger: '.bg-ruins', start: 'left right', end: 'right left', scrub: 1.5, containerAnimation: horizontalScrollTween } });
    gsap.to(ruinsFront, { x: -160, ease: 'none', scrollTrigger: { trigger: '.bg-ruins', start: 'left right', end: 'right left', scrub: 1, containerAnimation: horizontalScrollTween } });
}

// =============================================
// Sukhothai Text Animation
// =============================================
function initSukhothaiTextAnimation() {
    if (!horizontalScrollTween) return;
    const textBox = document.querySelector('.text-box-1');
    if (!textBox) return;

    gsap.set(textBox, { opacity: 0, y: 50 });

    gsap.to(textBox, {
        opacity: 1, y: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: '.bg-ruins',
            start: 'right 60%',
            end: 'right 35%',
            scrub: 1,
            containerAnimation: horizontalScrollTween,
            onLeave: () => {
                window.dispatchEvent(new Event('text1Complete'));
            },
            onEnterBack: () => {
                window._text1Done = false;
            }
        }
    });
}

// =============================================
// Sukhothai Kick Animation
// =============================================
function initSukhothaiKickAnimation() {
    const container = document.querySelector('.sukhothai-kick-container');
    const kickPose = document.querySelector('.kick-pose');
    if (!container || !kickPose) return;

    const framesData = kickPose.getAttribute('data-kick-frames');
    if (!framesData) return;
    const frames = framesData.split(',');

    gsap.set(container, { opacity: 0, y: 80, scale: 0.85 });

    if (horizontalScrollTween) {
        ScrollTrigger.create({
            trigger: '.bg-ruins',
            start: 'right 35%',
            containerAnimation: horizontalScrollTween,
            onEnter: () => {
                gsap.killTweensOf(container);
                gsap.fromTo(container,
                    { y: 80, scale: 0.85, opacity: 0 },
                    {
                        y: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)',
                        onComplete: () => {
                            window._sukhothaiKickDone = true;
                            window.dispatchEvent(new Event('kickRevealed'));
                            gsap.to(container, {
                                rotation: 2,
                                x: 5,
                                duration: 1.4,
                                ease: 'sine.inOut',
                                repeat: -1,
                                yoyo: true,
                            });
                        }
                    }
                );
            },
            onEnterBack: () => {
                gsap.killTweensOf(container);
                gsap.fromTo(container,
                    { y: 80, scale: 0.85, opacity: 0 },
                    {
                        y: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)',
                        onComplete: () => {
                            window._sukhothaiKickDone = true;
                            window.dispatchEvent(new Event('kickRevealed'));
                            gsap.to(container, {
                                rotation: 2,
                                x: 5,
                                duration: 1.4,
                                ease: 'sine.inOut',
                                repeat: -1,
                                yoyo: true,
                            });
                        }
                    }
                );
            },
            onLeaveBack: () => {
                gsap.killTweensOf(container);
                gsap.to(container, { opacity: 0, y: 80, scale: 0.85, duration: 0.3 });
                window._sukhothaiKickDone = false;
            }
        });
    }

    let isAnimating = false;

    container.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;

        let currentFrame = 0;
        const playInterval = setInterval(() => {
            currentFrame++;
            kickPose.src = frames[currentFrame];
            if (currentFrame >= frames.length - 1) {
                clearInterval(playInterval);
                setTimeout(() => {
                    kickPose.src = frames[0];
                    isAnimating = false;
                }, 400);
            }
        }, 180);
    });
}

// =============================================
// Karaoke Animation
// =============================================
function initKaraokeAnimation() {
    if (!horizontalScrollTween) return;

    const textBox2 = document.querySelector('.text-box-2');
    if (textBox2) {
        gsap.set(textBox2, { opacity: 0, y: 40 });

        const showText2 = () => {
            gsap.killTweensOf(textBox2);
            gsap.to(textBox2, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
            textBox2._parallaxReady = true;
        };

        const hideText2 = () => {
            textBox2._parallaxReady = false;
            gsap.killTweensOf(textBox2);
            gsap.to(textBox2, { opacity: 0, y: 60, duration: 0.1, ease: 'power2.in' });
        };

        ScrollTrigger.create({
            trigger: textBox2,
            containerAnimation: horizontalScrollTween,
            start: "left 60%",
            onEnter: () => showText2(),
            onEnterBack: () => showText2(),
            onLeaveBack: () => hideText2()
        });

        document.addEventListener('mousemove', (e) => {
            if (!textBox2._parallaxReady) return;
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 25;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 25;
            gsap.to(textBox2, { x: mouseX, y: mouseY, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
        });
    }

    const karaokeTextBoxes = [
        { selector: '.text-box-4', multiplier: 1.5, end: 'right 30%' },
        { selector: '.text-box-6', multiplier: 1.5, end: 'right 30%' },
        { selector: '.text-box-7', multiplier: 1.5, end: 'right 30%' }
    ];

    karaokeTextBoxes.forEach(({ selector, multiplier, end }) => {
        const textBox = document.querySelector(selector);
        if (!textBox) return;
        const karaokeTextElement = textBox.querySelector('.karaoke-text');
        if (!karaokeTextElement) return;
        const charElements = karaokeTextElement.querySelectorAll('.karaoke-char');
        if (charElements.length === 0) return;

        let buffaloStartIndex = -1;
        if (selector === '.text-box-7') {
            const allChars = Array.from(charElements);
            let inGroup = false;
            let groupCount = 0;
            for (let i = 0; i < allChars.length; i++) {
                const isHighlight = allChars[i].classList.contains('highlight');
                if (isHighlight && !inGroup) {
                    inGroup = true;
                    groupCount++;
                    if (groupCount === 2) { buffaloStartIndex = i; break; }
                } else if (!isHighlight) {
                    inGroup = false;
                }
            }
        }

        ScrollTrigger.create({
            trigger: selector,
            start: 'left 70%',
            end: end,
            containerAnimation: horizontalScrollTween,
            onUpdate: (self) => {
                const progress = self.progress;
                const totalChars = charElements.length;
                const activeCharCount = Math.min(Math.floor(progress * totalChars * multiplier), totalChars);
                charElements.forEach((char, index) => {
                    if (index < activeCharCount) { char.classList.add('active'); }
                    else { char.classList.remove('active'); }
                });

                if (buffaloStartIndex > 0) {
                    if (activeCharCount >= buffaloStartIndex && !window._buffaloSwingFired) {
                        window._buffaloSwingFired = true;
                        window.dispatchEvent(new Event('buffaloSwingReached'));
                    }
                    if (activeCharCount < buffaloStartIndex) {
                        window._buffaloSwingFired = false;
                        window.dispatchEvent(new Event('buffaloSwingLeft'));
                    }
                }
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

// =============================================
// Korat
// =============================================
function initKoratSlideUp() {
    if (!horizontalScrollTween) return;
    const koratBg = document.querySelector('.korat-bg-layer');
    const buffaloImage = document.querySelector('.buffalo-swing-image');
    const buffaloWrapper = document.querySelector('.buffalo-swing-wrapper');
    const poseLabel = document.querySelector('.pose-label');

    if (koratBg) {
        gsap.set(koratBg, { y: 100, opacity: 0 });
        ScrollTrigger.create({
            trigger: koratBg, start: 'left 65%',
            containerAnimation: horizontalScrollTween,
            onEnter: () => { gsap.to(koratBg, { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out' }); },
            onLeaveBack: () => { gsap.to(koratBg, { y: 100, opacity: 0, duration: 0.3, ease: 'power2.in' }); }
        });
    }

    if (buffaloImage) {
        gsap.set(buffaloImage, { opacity: 0, y: 150, scale: 0.6, rotation: -8 });

        const revealBuffalo = () => {
            gsap.killTweensOf(buffaloImage);
            gsap.set(buffaloImage, { opacity: 0, y: 150, scale: 0.6, rotation: -8 });
            gsap.to(buffaloImage, {
                y: 0, scale: 1, rotation: 0, opacity: 1,
                duration: 0.8, ease: 'back.out(2)',
                onComplete: () => {
                    gsap.to(buffaloImage, {
                        y: -8, duration: 1.2,
                        ease: 'sine.inOut',
                        repeat: -1, yoyo: true,
                    });
                }
            });
            buffaloWrapper?.classList.add('aura-visible');
        };

        const hideBuffalo = () => {
            gsap.killTweensOf(buffaloImage);
            gsap.to(buffaloImage, { opacity: 0, y: 150, scale: 0.6, rotation: -8, duration: 0.3, ease: 'power1.in' });
            buffaloWrapper?.classList.remove('aura-visible');
        };

        ScrollTrigger.create({
            trigger: '.text-box-7',
            start: 'left 10%',
            containerAnimation: horizontalScrollTween,
            onEnter: () => revealBuffalo(),
            onEnterBack: () => revealBuffalo(),
            onLeave: () => { /* ไม่ต้อง hide ตอน scroll ไปหน้า */ },
            onLeaveBack: () => hideBuffalo(),
        });
    }

    if (poseLabel) {
        gsap.set(poseLabel, { opacity: 0, y: 80, scale: 0.5, rotation: -4 });

        gsap.to(poseLabel, {
            opacity: 1, ease: 'power2.out',
            scrollTrigger: {
                trigger: buffaloImage || poseLabel, containerAnimation: horizontalScrollTween,
                start: 'left 65%', end: 'left 40%', scrub: 1,
                onEnter: () => { gsap.to(poseLabel, { y: 0, scale: 1, rotation: 0, duration: 0.6, ease: 'elastic.out(1.2, 0.4)' }); },
                onLeaveBack: () => { gsap.to(poseLabel, { opacity: 0, y: 80, scale: 0.5, rotation: -4, duration: 0.3, ease: 'power1.in' }); },
            }
        });
    }
}

function initBuffaloSwingClick() {
    const buffaloImage = document.querySelector('.buffalo-swing-image');
    const buffaloWrapper = document.querySelector('.buffalo-swing-wrapper');
    if (!buffaloImage || !buffaloWrapper) return;

    const imageSequence = [
        'img/muay-boran/northeast/muay-korat-buffalo-swing.png',
        'img/muay-boran/northeast/muay-korat-buffalo-swing 1 .png',
        'img/muay-boran/northeast/muay-korat-buffalo-swing 2.png',
        'img/muay-boran/northeast/muay-korat-buffalo-swing 3 .png',
        'img/muay-boran/northeast/muay-korat-buffalo-swing 4 .png'
    ];

    let isAnimating = false;

    buffaloImage.addEventListener('click', async () => {
        if (isAnimating) return;
        isAnimating = true;

        for (let i = 1; i < imageSequence.length; i++) {
            buffaloImage.src = imageSequence[i];
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        await new Promise(resolve => setTimeout(resolve, 300));
        buffaloImage.src = imageSequence[0];
        isAnimating = false;
    });
}

// =============================================
// Lopburi
// =============================================
function initLopburiSlideUp() {
    if (!horizontalScrollTween) return;

    const lopburiLayers = [
        { selector: '.lopburi-left', delay: 0 },
        { selector: '.lopburi-center', delay: 0.15 },
        { selector: '.lopburi-right', delay: 0.3 },
    ];

    lopburiLayers.forEach(({ selector, delay }) => {
        const el = document.querySelector(selector);
        if (!el) return;

        gsap.set(el, { y: -80, opacity: 0, scale: 0.85 });

        ScrollTrigger.create({
            trigger: el,
            start: 'left 40%',
            containerAnimation: horizontalScrollTween,
            onEnter: () => {
                gsap.to(el, {
                    y: 0, opacity: 1, scale: 1,
                    duration: 0.6, ease: 'back.out(2.5)', delay
                });
            },
            onLeaveBack: () => {
                gsap.to(el, { y: -80, opacity: 0, scale: 0.85, duration: 0.3, ease: 'power2.in' });
            }
        });
    });
}

function initLopburiFightersBillboard() {
    if (!horizontalScrollTween) return;

    const fighters = [
        { selector: '.lopburi-fighter-1', rotDir: -8 },
        { selector: '.lopburi-fighter-2', rotDir: 8 },
        { selector: '.lopburi-fighter-3', rotDir: -8 },
        { selector: '.lopburi-fighter-4', rotDir: 8 },
    ];

    fighters.forEach((item, index) => {
        const el = document.querySelector(item.selector);
        if (!el) return;

        const enterAt = 70 - index * 15;

        gsap.set(el, { opacity: 0, y: 150, scale: 0.6, rotation: item.rotDir });

        ScrollTrigger.create({
            trigger: '.lopburi-fighters',
            containerAnimation: horizontalScrollTween,
            start: `left ${enterAt}%`,
            onEnter: () => {
                gsap.killTweensOf(el);
                gsap.to(el, {
                    opacity: 1, y: 0, scale: 1, rotation: 0,
                    duration: 0.7, ease: 'back.out(2)',
                    onComplete: () => {
                        gsap.to(el, {
                            x: 6,
                            rotation: 1.5,
                            duration: 0.9 + index * 0.15,
                            ease: 'sine.inOut',
                            repeat: -1,
                            yoyo: true,
                        });
                    }
                });
            },
            onLeaveBack: () => {
                gsap.killTweensOf(el);
                gsap.to(el, {
                    opacity: 0, y: 150, scale: 0.6, rotation: item.rotDir,
                    duration: 0.3,
                    ease: 'power1.in',
                    delay: (fighters.length - 1 - index) * 0.15,
                });
            },
        });
    });
}

function initLopburiFighters2() {
    if (!horizontalScrollTween) return;
    const fighter5 = document.querySelector('.lopburi-fighter-5');
    if (!fighter5) return;

    gsap.set(fighter5, { opacity: 0, y: 150, scale: 0.6, rotation: -8 });

    ScrollTrigger.create({
        trigger: fighter5, containerAnimation: horizontalScrollTween,
        start: 'left 75%',
        onEnter: () => {
            gsap.killTweensOf(fighter5);
            gsap.set(fighter5, { opacity: 0, y: 150, scale: 0.6, rotation: -8 });
            gsap.to(fighter5, {
                opacity: 1, y: 0, scale: 1, rotation: 0,
                duration: 0.8, ease: 'back.out(2)',
                onComplete: () => {
                    gsap.to(fighter5, {
                        x: 6, rotation: 1.5,
                        duration: 1.1,
                        ease: 'sine.inOut',
                        repeat: -1, yoyo: true,
                    });
                }
            });
        },
        onEnterBack: () => {
            gsap.killTweensOf(fighter5);
            gsap.set(fighter5, { opacity: 0, y: 150, scale: 0.6, rotation: -8 });
            gsap.to(fighter5, {
                opacity: 1, y: 0, scale: 1, rotation: 0,
                duration: 0.8, ease: 'back.out(2)',
                onComplete: () => {
                    gsap.to(fighter5, {
                        x: 6, rotation: 1.5,
                        duration: 1.1,
                        ease: 'sine.inOut',
                        repeat: -1, yoyo: true,
                    });
                }
            });
        },
        onLeaveBack: () => {
            gsap.killTweensOf(fighter5);
            gsap.to(fighter5, { opacity: 0, y: 150, scale: 0.6, rotation: -8, duration: 0.3, ease: 'power1.in' });
        },
    });
}

function initLopburiTextSlideUp() {
    if (!horizontalScrollTween) return;
    const textBox = document.querySelector('.text-box-8');
    if (!textBox) return;

    gsap.set(textBox, { y: 60, opacity: 0 });

    ScrollTrigger.create({
        trigger: '.text-box-8',
        start: 'left 70%',
        containerAnimation: horizontalScrollTween,
        onEnter: () => {
            gsap.to(textBox, { y: 0, opacity: 1, duration: 1.0, ease: 'power2.out' });
        },
        onEnterBack: () => {
            gsap.to(textBox, { y: 0, opacity: 1, duration: 1.0, ease: 'power2.out' });
        },
        onLeaveBack: () => {
            gsap.killTweensOf(textBox);
            gsap.to(textBox, { y: 60, opacity: 0, duration: 0.4, ease: 'power2.in' });
        }
    });
}

// =============================================
// Ayutthaya
// =============================================
function initAyutthayaParallax() {
    if (!horizontalScrollTween) return;
    const templeRight = document.querySelector('.temple-right');
    const templeLeft = document.querySelector('.temple-left');
    const templeCenter = document.querySelector('.temple-center');
    if (!templeRight || !templeLeft || !templeCenter) return;

    const templeConfig = {
        trigger: '.ayutthaya-temples',
        start: 'left 50%',
        containerAnimation: horizontalScrollTween,
        toggleActions: 'play none none reverse'
    };

    gsap.fromTo(templeRight,
        { y: -120, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', scrollTrigger: templeConfig });

    gsap.fromTo(templeLeft,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.15, scrollTrigger: templeConfig });

    gsap.fromTo(templeCenter,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.3, scrollTrigger: templeConfig });

    gsap.to(templeRight, { x: -80, ease: 'none', scrollTrigger: { trigger: '.ayutthaya-temples', start: 'left right', end: 'right left', scrub: 2, containerAnimation: horizontalScrollTween } });
    gsap.to(templeLeft, { x: -120, ease: 'none', scrollTrigger: { trigger: '.ayutthaya-temples', start: 'left right', end: 'right left', scrub: 1.5, containerAnimation: horizontalScrollTween } });
    gsap.to(templeCenter, { x: -160, ease: 'none', scrollTrigger: { trigger: '.ayutthaya-temples', start: 'left right', end: 'right left', scrub: 1, containerAnimation: horizontalScrollTween } });
}

function initAyutthayaTextAnimation() {
    if (!horizontalScrollTween) return;

    const textBox3 = document.querySelector('.text-box-3');
    if (textBox3) {
        gsap.set(textBox3, { y: 100, opacity: 0 });

        ScrollTrigger.create({
            trigger: '.text-box-3', start: 'left 55%',
            containerAnimation: horizontalScrollTween,
            onEnter: () => {
                gsap.to(textBox3, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' });
            },
            onEnterBack: () => {
                gsap.to(textBox3, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' });
            },
            onLeaveBack: () => {
                gsap.killTweensOf(textBox3);
                gsap.set(textBox3, { y: 100, opacity: 0 });
            }
        });
    }

    const textBox4 = document.querySelector('.text-box-4');
    if (textBox4) {
        gsap.set(textBox4, { y: 100, opacity: 0 });
        ScrollTrigger.create({
            trigger: '.text-box-4', start: 'left 55%',
            containerAnimation: horizontalScrollTween,
            onEnter: () => {
                gsap.to(textBox4, { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.5 });
            },
            onEnterBack: () => {
                gsap.to(textBox4, { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.5 });
            },
            onLeaveBack: () => {
                gsap.to(textBox4, { y: 60, opacity: 0, duration: 0.2, ease: 'power2.in' });
            }
        });
    }

    const textBox5 = document.querySelector('.text-box-5');
    if (textBox5) {
        gsap.set(textBox5, { y: 100, opacity: 0 });

        ScrollTrigger.create({
            trigger: '.text-box-4',
            start: 'right 10%',
            containerAnimation: horizontalScrollTween,
            onEnter: () => {
                gsap.to(textBox5, { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' });
            },
            onEnterBack: () => {
                gsap.to(textBox5, { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' });
            },
        });

        ScrollTrigger.create({
            trigger: '.text-box-4',
            start: 'right -30%',
            containerAnimation: horizontalScrollTween,
            onLeaveBack: () => {
                gsap.killTweensOf(textBox5);
                gsap.set(textBox5, { y: 100, opacity: 0 });
            }
        });
    }
}

function initMouseParallax() {
    const textBox1 = document.querySelector('.text-box-1');
    const textBox2 = document.querySelector('.text-box-2');
    if (textBox2)
        gsap.set(textBox2, { opacity: 0, y: 40 });
    const textBoxes = [
        document.querySelector('.text-box-3'),
        document.querySelector('.text-box-4'),
        document.querySelector('.text-box-5')
    ].filter(el => el !== null);
    if (textBoxes.length === 0 && !textBox1 && !textBox2) return;

    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;

        if (textBox1 && parseFloat(gsap.getProperty(textBox1, 'opacity')) > 0.5) {
            gsap.to(textBox1, { x: mouseX * 15, y: mouseY * 15, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
        }

        if (textBox2?._parallaxReady) {
            gsap.to(textBox2, { x: mouseX * 20, y: mouseY * 20, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
        }

        textBoxes.forEach((textBox, index) => {
            const multiplier = (index + 1) * 10;
            gsap.to(textBox, { x: mouseX * multiplier, y: mouseY * multiplier, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
        });
    });
}

function initRegionalFightersAnimation() {
    if (!horizontalScrollTween) return;
    const container = document.querySelector('.regional-fighters');
    if (!container) return;

    const fighterContainers = Array.from(container.querySelectorAll('.fighter-container'));
    if (fighterContainers.length === 0) return;

    fighterContainers.forEach((fc, i) => {
        const fighter = fc.querySelector('.regional-fighter');
        const label = fc.querySelector('.fighter-label');
        if (!fighter) return;

        const rotDir = i % 2 === 0 ? -8 : 8;

        gsap.set(fighter, { opacity: 0, y: 80, scale: 0.75, rotation: rotDir * 0.5 });

        gsap.to(fighter, {
            opacity: 1, ease: 'power2.out',
            scrollTrigger: {
                trigger: fighter, containerAnimation: horizontalScrollTween,
                start: 'left 75%', end: 'left 45%', scrub: 1,
                onEnter: () => {
                    gsap.to(fighter, {
                        y: 0, scale: 1, rotation: 0,
                        duration: 1.0,
                        ease: 'back.out(2)',
                    });
                },
                onUpdate: (self) => {
                    if (self.progress > 0.6 && !fighter.classList.contains('idle')) fighter.classList.add('idle');
                },
                onEnterBack: () => fighter.classList.remove('idle'),
                onLeaveBack: () => {
                    fighter.classList.remove('idle');
                    gsap.to(fighter, { opacity: 0, y: 80, scale: 0.75, rotation: rotDir * 0.5, duration: 0.3, ease: 'power1.in' });
                },
            }
        });

        if (!label) return;
        gsap.set(label, { opacity: 0, y: 40, scale: 0.8 });

        gsap.to(label, {
            opacity: 1, ease: 'power2.out',
            scrollTrigger: {
                trigger: fighter, containerAnimation: horizontalScrollTween,
                start: 'left 65%', end: 'left 40%', scrub: 1,
                onEnter: () => {
                    gsap.to(label, {
                        y: 0, scale: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                    });
                },
                onLeaveBack: () => {
                    gsap.to(label, { opacity: 0, y: 40, scale: 0.8, duration: 0.3, ease: 'power1.in' });
                },
            }
        });
    });
}

function initAyutthayaImagesAnimation() {
    if (!horizontalScrollTween) return;
    const khanomTom = document.querySelector('.khanom-tom-fighter');
    const thailandMap = document.querySelector('.boran-thailand-image');
    if (!khanomTom || !thailandMap) return;

    gsap.set(thailandMap, { y: 300, opacity: 0 });
    gsap.set(khanomTom, { y: -100, opacity: 0 });

    ScrollTrigger.create({
        trigger: khanomTom,
        containerAnimation: horizontalScrollTween,
        start: 'left 40%',
        onEnter: () => gsap.to(khanomTom, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }),
        onLeaveBack: () => gsap.to(khanomTom, { y: -100, opacity: 0, duration: 0.5, ease: 'power2.in' }),
        onEnterBack: () => gsap.to(khanomTom, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' })
    });

    ScrollTrigger.create({
        trigger: '.text-box-5',
        containerAnimation: horizontalScrollTween,
        start: 'left 20%',
        onEnter: () => gsap.to(thailandMap, { y: -300, opacity: 1, duration: 1.2, ease: 'power3.out' }),
        onLeaveBack: () => gsap.to(thailandMap, { y: 300, opacity: 0, duration: 0.5, ease: 'power2.in' }),
        onEnterBack: () => gsap.to(thailandMap, { y: -300, opacity: 1, duration: 1.2, ease: 'power3.out' })
    });
}

// =============================================
// Walking Fighter
// =============================================
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

    function checkEra() {
        const trackEl = document.getElementById('timeline-track');
        if (!trackEl) return;
        const floor10 = document.querySelector('img[src="https://res.cloudinary.com/muayverse/image/upload/f_auto,q_auto/v1773253003/floor-artboard-10_qaq3ft.png"]');
        if (!floor10) return;
        const floorScreenX = floor10.getBoundingClientRect().left;

        if (floorScreenX <= window.innerWidth * 0.5) {
            if (currentFrames !== framesNew) { currentFrames = framesNew; currentFrame = 0; img.src = currentFrames[0]; }
        } else {
            if (currentFrames !== framesOld) { currentFrames = framesOld; currentFrame = 0; img.src = currentFrames[0]; }
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
        scrollStopTimer = setTimeout(() => { stopWalking(); }, 800);
    });
}

// =============================================
// Chaiya
// =============================================
function initChaiyaBounceReveal() {
    if (!horizontalScrollTween) return;
    const chaiyaLayers = ['.chaiya-left', '.chaiya-right', '.chaiya-center', '.chaiya-back'];

    chaiyaLayers.forEach((selector, index) => {
        const el = document.querySelector(selector);
        if (!el) return;

        gsap.to(el, {
            keyframes: [
                { y: -30, scale: 1.08, opacity: 1, duration: 0.65 },
                { y: 0, scale: 1, duration: 0.35 }
            ],
            scrollTrigger: {
                trigger: '.chaiya-background', containerAnimation: horizontalScrollTween,
                start: `left+=${index * 10}% 85%`, end: `left+=${index * 8 + 8}% 35%`, scrub: 0.1,
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

        const end = boxSelector === '.text-box-11' ? 'left 35%' : 'left 45%';

        gsap.fromTo(chars,
            { opacity: 0.15, filter: 'blur(4px)' },
            {
                opacity: 1, filter: 'blur(0px)', stagger: 0.04, ease: 'none', duration: 0.6,
                scrollTrigger: { trigger: box, start: 'left 75%', end: end, scrub: 0.3, containerAnimation: horizontalScrollTween }
            }
        );
    });
}

function initChaiyaFighterScrubReveal() {
    if (!horizontalScrollTween) return;

    const earlyGroup = [
        { fighter: '.chaiya-fighter-1', label: '.label-chaiya-1', rotDir: -8 },
        { fighter: '.chaiya-fighter-2', label: '.label-chaiya-2', rotDir: 8 },
        { fighter: '.wai-kru-swap', label: '.label-chaiya-3', rotDir: -8 },
        { fighter: '.chaiya-fighter-4', label: '.label-chaiya-4', rotDir: 8 },
        { fighter: '.chaiya-fighter-5', label: '.label-chaiya-5', rotDir: -8 },
    ];

    earlyGroup.forEach((item, index) => {
        const fighterEl = document.querySelector(item.fighter);
        const labelEl = document.querySelector(item.label);
        if (!fighterEl) return;

        const isWaiKru = item.fighter === '.wai-kru-swap';
        const enterAt = 65 - index * 15;

        gsap.set(fighterEl, { opacity: 0, y: 150, scale: 0.6, rotation: item.rotDir });
        if (labelEl) gsap.set(labelEl, { opacity: 0, y: 80, scale: 0.5, rotation: item.rotDir * 0.5 });

        ScrollTrigger.create({
            trigger: '.chaiya-fighters',
            containerAnimation: horizontalScrollTween,
            start: `left ${enterAt}%`,
            onEnter: () => {
                gsap.killTweensOf(fighterEl);
                gsap.to(fighterEl, {
                    opacity: 1, y: 0, scale: 1, rotation: 0,
                    duration: 0.8, ease: 'back.out(2)',
                    onComplete: () => {
                        if (isWaiKru) fighterEl.closest('.chaiya-container')?.classList.add('aura-visible');
                    }
                });
                if (labelEl) {
                    gsap.to(labelEl, { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.6, ease: 'elastic.out(1.2, 0.4)', delay: 0.3 });
                }
            },
            onLeaveBack: () => {
                gsap.killTweensOf(fighterEl);
                gsap.to(fighterEl, {
                    opacity: 0, y: 150, scale: 0.6, rotation: item.rotDir,
                    duration: 0.3, ease: 'power1.in',
                    delay: (earlyGroup.length - 1 - index) * 0.1,
                });
                if (isWaiKru) fighterEl.closest('.chaiya-container')?.classList.remove('aura-visible');
                if (labelEl) {
                    gsap.to(labelEl, {
                        opacity: 0, y: 80, scale: 0.5, rotation: item.rotDir * 0.5,
                        duration: 0.3, ease: 'power1.in',
                        delay: (earlyGroup.length - 1 - index) * 0.1,
                    });
                }
            },
        });
    });

    [
        { selector: '.chaiya-fighter-6', isLabel: false },
        { selector: '.label-chaiya-6', isLabel: true },
    ].forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;

        if (item.isLabel) { gsap.set(el, { opacity: 0, y: 60 }); }
        else { gsap.set(el, { opacity: 0, y: 200, scale: 0.5, rotation: -15 }); }

        gsap.to(el, {
            opacity: 1, ease: 'power2.out',
            scrollTrigger: {
                trigger: '.text-box-11', containerAnimation: horizontalScrollTween,
                start: 'left 45%', end: 'left 20%', scrub: 1,
                onEnter: () => {
                    if (item.isLabel) { gsap.to(el, { y: 0, duration: 0.6, ease: 'power2.out' }); }
                    else { gsap.to(el, { y: 0, scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }); }
                },
                onUpdate: (self) => { if (self.progress > 0.5 && !el.classList.contains('idle')) el.classList.add('idle'); },
                onEnterBack: () => el.classList.remove('idle'),
                onLeaveBack: () => {
                    el.classList.remove('idle');
                    gsap.to(el, item.isLabel
                        ? { opacity: 0, y: 60, duration: 0.3, ease: 'power1.in' }
                        : { opacity: 0, y: 200, scale: 0.5, rotation: -15, duration: 0.3, ease: 'power1.in' });
                },
            }
        });
    });

    [
        { selector: '.chaiya-fighter-7', isLabel: false },
        { selector: '.label-chaiya-7', isLabel: true },
    ].forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;

        if (item.isLabel) { gsap.set(el, { opacity: 0, y: 60 }); }
        else { gsap.set(el, { opacity: 0, y: 200, scale: 0.5, rotation: 15 }); }

        gsap.to(el, {
            opacity: 1, ease: 'power2.out',
            scrollTrigger: {
                trigger: '.text-box-11', containerAnimation: horizontalScrollTween,
                start: 'left 35%', end: 'left 10%', scrub: 1,
                onEnter: () => {
                    if (item.isLabel) { gsap.to(el, { y: 0, duration: 0.6, ease: 'power2.out' }); }
                    else { gsap.to(el, { y: 0, scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }); }
                },
                onUpdate: (self) => { if (self.progress > 0.5 && !el.classList.contains('idle')) el.classList.add('idle'); },
                onEnterBack: () => el.classList.remove('idle'),
                onLeaveBack: () => {
                    el.classList.remove('idle');
                    gsap.to(el, item.isLabel
                        ? { opacity: 0, y: 60, duration: 0.3, ease: 'power1.in' }
                        : { opacity: 0, y: 200, scale: 0.5, rotation: 15, duration: 0.3, ease: 'power1.in' });
                },
            }
        });
    });

    const defenseGroup = [
        { fighter: '.chaiya-fighter-8', label: '.label-chaiya-8', rotDir: -8 },
        { fighter: '.chaiya-fighter-9', label: '.label-chaiya-9', rotDir: 8 },
        { fighter: '.chaiya-fighter-10', label: '.label-chaiya-10', rotDir: -8 },
        { fighter: '.chaiya-fighter-11', label: '.label-chaiya-11', rotDir: 8 },
    ];

    defenseGroup.forEach((item, index) => {
        const fighterEl = document.querySelector(item.fighter);
        const labelEl = document.querySelector(item.label);
        if (!fighterEl) return;

        const enterAt = 60 - index * 15;

        gsap.set(fighterEl, { opacity: 0, y: 150, scale: 0.6, rotation: item.rotDir });

        ScrollTrigger.create({
            trigger: '.chaiya-fighters-3',
            containerAnimation: horizontalScrollTween,
            start: `left ${enterAt}%`,
            onEnter: () => {
                gsap.killTweensOf(fighterEl);
                gsap.to(fighterEl, {
                    opacity: 1, y: 0, scale: 1, rotation: 0,
                    duration: 0.8, ease: 'back.out(2)',
                    onComplete: () => {
                        gsap.to(fighterEl, {
                            x: 5, rotation: 1.5,
                            duration: 1.0 + index * 0.2,
                            ease: 'sine.inOut',
                            repeat: -1, yoyo: true,
                        });
                    }
                });
            },
            onLeaveBack: () => {
                gsap.killTweensOf(fighterEl);
                gsap.to(fighterEl, {
                    opacity: 0, y: 150, scale: 0.6, rotation: item.rotDir,
                    duration: 0.3, ease: 'power1.in',
                    delay: (defenseGroup.length - 1 - index) * 0.15,
                });
            },
        });

        if (!labelEl) return;
        gsap.set(labelEl, { opacity: 0, y: 80, scale: 0.5, rotation: item.rotDir * 0.5 });

        ScrollTrigger.create({
            trigger: '.chaiya-fighters-3',
            containerAnimation: horizontalScrollTween,
            start: `left ${enterAt - 10}%`,
            onEnter: () => {
                gsap.to(labelEl, { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.6, ease: 'elastic.out(1.2, 0.4)' });
            },
            onLeaveBack: () => {
                gsap.to(labelEl, { opacity: 0, y: 80, scale: 0.5, rotation: item.rotDir * 0.5, duration: 0.3, ease: 'power1.in' });
            },
        });
    });
}

function initWaiKruHoverSwap() {
    const img = document.querySelector('.wai-kru-swap');
    if (!img) return;
    const originalSrc = img.src;
    const altSrc = img.getAttribute('data-hover-src');
    if (!altSrc) return;

    let isAlt = false;

    img.addEventListener('click', () => {
        isAlt = !isAlt;
        img.src = isAlt ? altSrc : originalSrc;
    });
}

// =============================================
// Tha Sao
// =============================================
function initThaSaoParallax() {
    if (!horizontalScrollTween) return;

    const under = document.querySelector('.tha-sao-under');
    if (under) {
        gsap.set(under, { opacity: 0, y: 100, scale: 0.8 });
        ScrollTrigger.create({
            trigger: '.tha-sao-background', containerAnimation: horizontalScrollTween, start: 'left 25%',
            onEnter: () => { gsap.to(under, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }); },
            onLeaveBack: () => { gsap.to(under, { opacity: 0, y: 100, scale: 0.8, duration: 0.2, ease: 'power1.in' }); },
        });
    }

    const above = document.querySelector('.tha-sao-above');
    if (above) {
        gsap.set(above, { opacity: 0, y: -120, scale: 0.8 });
        ScrollTrigger.create({
            trigger: '.tha-sao-background', containerAnimation: horizontalScrollTween, start: 'left 20%',
            onEnter: () => { gsap.to(above, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }); },
            onLeaveBack: () => { gsap.to(above, { opacity: 0, y: -120, scale: 0.8, duration: 0.2, ease: 'power1.in' }); },
        });
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
        { selector: '.tha-sao-kick', dir: -1, start: 'left 50%' },
        { selector: '.tha-sao-elbow', dir: 1, start: 'left 40%' },
        { selector: '.tha-sao-fighter2-1', dir: -1, start: 'left 35%' },
        { selector: '.tha-sao-defend', dir: -1, start: 'left 50%' },
        { selector: '.tha-sao-parry', dir: 1, start: 'left 45%' },
        { selector: '.tha-sao-attacks', dir: -1, start: 'left 25%' },
    ];

    allFighters.forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;

        const isThaSaoSwap = item.selector === '.tha-sao-fighter2-1';
        const startX = 150 * item.dir;
        gsap.set(el, { opacity: 0, x: startX, scale: 0.7, rotation: 8 * item.dir });

        ScrollTrigger.create({
            trigger: el, containerAnimation: horizontalScrollTween, start: item.start,
            onEnter: () => {
                if (!tb13Passed()) return;
                gsap.to(el, {
                    opacity: 1, x: 0, scale: 1, rotation: 0, duration: 0.6, ease: 'power3.out',
                    onComplete: () => {
                        startIdleAnimation(el, item.dir);
                        if (isThaSaoSwap) el.closest('.tha-sao-container-2')?.classList.add('aura-visible');
                    }
                });
            },
            onLeaveBack: () => {
                gsap.killTweensOf(el);
                gsap.to(el, { opacity: 0, x: startX, scale: 0.7, rotation: 8 * item.dir, duration: 0.3, ease: 'power1.in' });
                if (isThaSaoSwap) el.closest('.tha-sao-container-2')?.classList.remove('aura-visible');
            },
        });
    });

    const groupLabels = [
        { selector: '.tha-sao-group-label', trigger: '.tha-sao-elbow', start: 'left -20%' },
        { selector: '.tha-sao-group-label-2', trigger: '.tha-sao-fighter2-1', start: 'left 20%' },
        { selector: '.tha-sao-group-label-3', trigger: '.tha-sao-fighters-3' },
    ];

    groupLabels.forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 30 });
        ScrollTrigger.create({
            trigger: item.trigger, containerAnimation: horizontalScrollTween, start: 'left 30%',
            onEnter: () => { if (!tb13Passed()) return; gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }); },
            onLeaveBack: () => { gsap.to(el, { opacity: 0, y: 30, duration: 0.2, ease: 'power1.in' }); },
        });
    });
}

function initThaSaoHoverSwap() {
    const img = document.querySelector('.tha-sao-swap');
    if (!img) return;
    const framesData = img.getAttribute('data-frames');
    if (!framesData) return;
    const frames = framesData.split(',');
    let isAnimating = false;

    img.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        let frame = 1;
        img.src = frames[frame];

        const playInterval = setInterval(() => {
            frame++;
            img.src = frames[frame];
            if (frame >= frames.length - 1) {
                clearInterval(playInterval);
                setTimeout(() => {
                    img.src = frames[0];
                    isAnimating = false;
                }, 600);
            }
        }, 700);
    });
}

// =============================================
// Thonburi
// =============================================
function initThonburiParallax() {
    if (!horizontalScrollTween) return;
    const layers = [
        { selector: '.thonburi-under', delay: 0 },
        { selector: '.thonburi-center', delay: 15 },
        { selector: '.thonburi-above', delay: 30 },
    ];
    layers.forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 100, scale: 0.85 });
        ScrollTrigger.create({
            trigger: '.thonburi-background', containerAnimation: horizontalScrollTween, start: `left+=${item.delay}% 30%`,
            onEnter: () => { gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.15, ease: 'back.out(1.7)' }); },
            onLeaveBack: () => { gsap.to(el, { opacity: 0, y: 100, scale: 0.85, duration: 0.2, ease: 'power1.in' }); },
        });
    });
}

function initThonburiHoverSwap() {
    const img = document.querySelector('.thonburi-swap');
    if (!img) return;
    const framesData = img.getAttribute('data-frames');
    if (!framesData) return;
    const frames = framesData.split(',');
    let isAnimating = false;

    img.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;

        setTimeout(() => {
            let frame = 1;
            img.src = frames[frame];

            const playInterval = setInterval(() => {
                frame++;
                img.src = frames[frame];
                if (frame >= frames.length - 1) {
                    clearInterval(playInterval);
                    setTimeout(() => {
                        img.src = frames[0];
                        isAnimating = false;
                    }, 800);
                }
            }, 700);
        }, 200);
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
        tl.set(fighter, { opacity: 0, scale: 0.3, y: 0 })
            .to(fighter, { opacity: 1, scale: 1.08, duration: 0.55, ease: 'power2.out' })
            .to(fighter, { scale: 1, duration: 0.25, ease: 'elastic.out(1.2, 0.5)' });
    };

    ScrollTrigger.create({
        trigger: '.thonburi-fighters', containerAnimation: horizontalScrollTween, start: 'left 50%',
        onEnter: () => { if (!tb14Passed()) return; playSlamAnimation(); },
        onLeaveBack: () => {
            gsap.killTweensOf(fighter);
            fighter.closest('.thonburi-container')?.classList.remove('aura-visible');
            gsap.to(fighter, { opacity: 0, scale: 0.3, duration: 0.5, ease: 'power2.in', onComplete: () => gsap.set(fighter, { scale: 0.3 }) });
        }
    });
}

// =============================================
// Early Rattanakosin
// =============================================
function initEarlyRatanaParallax() {
    if (!horizontalScrollTween) return;
    const layers = [
        { selector: '.early-ratana-under', delay: 0 },
        { selector: '.early-ratana-left', delay: 10 },
        { selector: '.early-ratana-right', delay: 20 },
    ];
    layers.forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 100, scale: 0.85 });
        ScrollTrigger.create({
            trigger: '.early-ratana-background', containerAnimation: horizontalScrollTween, start: `left+=${item.delay}% 40%`,
            onEnter: () => { gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }); },
            onLeaveBack: () => { gsap.killTweensOf(el); gsap.to(el, { opacity: 0, y: 100, scale: 0.85, duration: 0.15, ease: 'power3.in' }); },
        });
    });

    const rama5 = document.querySelector('.early-ratana-pic-rama5');
    if (rama5) {
        gsap.set(rama5, { opacity: 0, y: 120, scale: 0.85 });
        ScrollTrigger.create({
            trigger: '.text-box-16', containerAnimation: horizontalScrollTween, start: 'left 20%',
            onEnter: () => { gsap.to(rama5, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }); },
            onLeaveBack: () => { gsap.to(rama5, { opacity: 0, y: 120, scale: 0.85, duration: 0.5, ease: 'power2.in' }); },
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
                    gsap.to(fighter, {
                        scaleY: 0.97,
                        scaleX: 1.02,
                        y: 4,
                        duration: 1.8,
                        ease: 'sine.inOut',
                        repeat: -1,
                        yoyo: true,
                    });
                }
            });
        },
        onLeaveBack: () => {
            fighter.closest('.early-ratana-container')?.classList.remove('aura-visible');
            gsap.killTweensOf(fighter);
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
// Mid Rattanakosin
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

    const hideUnder = () => { gsap.killTweensOf(under); gsap.to(under, { opacity: 0, filter: 'blur(20px)', scale: 1.05, duration: 0.4, ease: 'power2.in' }); };
    const hideAbove = () => { gsap.killTweensOf(above); gsap.to(above, { opacity: 0, filter: 'blur(20px)', scale: 1.05, duration: 0.4, ease: 'power2.in' }); };
    const playUnder = () => { gsap.to(under, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.0, ease: 'power2.out' }); };
    const playAbove = () => { gsap.to(above, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.0, ease: 'power2.out' }); };

    if (under) {
        gsap.set(under, { opacity: 0, filter: 'blur(20px)', scale: 1.05 });
        ScrollTrigger.create({ trigger: '.mid-ratana-background', containerAnimation: horizontalScrollTween, start: 'left 65%', onEnter: () => { if (!tb17Passed()) return; playUnder(); }, onLeaveBack: () => hideUnder() });
        ScrollTrigger.create({ trigger: '.text-box-17', containerAnimation: horizontalScrollTween, start: 'left 20%', onEnter: () => { const rect = under.getBoundingClientRect(); if (rect.left < window.innerWidth && gsap.getProperty(under, 'opacity') < 0.5) playUnder(); }, onLeaveBack: () => hideUnder() });
    }

    if (above) {
        gsap.set(above, { opacity: 0, filter: 'blur(20px)', scale: 1.05 });
        ScrollTrigger.create({ trigger: '.mid-ratana-background', containerAnimation: horizontalScrollTween, start: 'left 50%', onEnter: () => { if (!tb17Passed()) return; playAbove(); }, onLeaveBack: () => hideAbove() });
        ScrollTrigger.create({ trigger: '.text-box-17', containerAnimation: horizontalScrollTween, start: 'left 10%', onEnter: () => { const rect = above.getBoundingClientRect(); if (rect.left < window.innerWidth && gsap.getProperty(above, 'opacity') < 0.5) playAbove(); }, onLeaveBack: () => hideAbove() });
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

    fighters.forEach((item, index) => {
        const el = document.querySelector(item.selector);
        if (!el) return;

        const enterAt = 65 - index * 15;
        const fromX = index % 2 === 0 ? -150 : 150;

        gsap.set(el, { opacity: 0, x: fromX, scale: 0.6 });

        ScrollTrigger.create({
            trigger: '.mid-ratana-fighters',
            containerAnimation: horizontalScrollTween,
            start: `left ${enterAt}%`,
            onEnter: () => {
                gsap.killTweensOf(el);
                gsap.to(el, {
                    opacity: 1, x: 0, scale: 1,
                    duration: 0.8, ease: 'back.out(1.7)',
                    onComplete: () => {
                        startIdleAnimation(el, item.rotDir);
                    }
                });
            },
            onLeaveBack: () => {
                gsap.killTweensOf(el);
                gsap.to(el, {
                    opacity: 0, x: fromX, scale: 0.6,
                    duration: 0.3, ease: 'power2.in',
                    delay: (fighters.length - 1 - index) * 0.15,
                });
            },
        });
    });
}

function startIdleAnimation(el, rotDir) {
    const tl = gsap.timeline({ repeat: -1, delay: Math.random() * 0.5 });
    tl.to(el, { y: -3, rotation: 0.4 * rotDir, duration: 0.6, ease: 'sine.inOut' })
        .to(el, { y: 0, rotation: 0, duration: 0.6, ease: 'sine.inOut' });
}

// =============================================
// Present Day
// =============================================
function initPresentParallax() {
    if (!horizontalScrollTween) return;
    const under = document.querySelector('.present-under');
    const above = document.querySelector('.present-above');

    const tb20Passed = () => {
        const tb20 = document.querySelector('.text-box-20');
        if (!tb20) return true;
        return tb20.getBoundingClientRect().left < window.innerWidth * 0.2;
    };

    const showUnder = () => { gsap.killTweensOf(under); gsap.to(under, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }); };
    const showAbove = () => { gsap.killTweensOf(above); gsap.to(above, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }); };
    const hideUnder = () => { gsap.killTweensOf(under); gsap.to(under, { opacity: 0, y: 120, duration: 0.3, ease: 'power1.in' }); };
    const hideAbove = () => { gsap.killTweensOf(above); gsap.to(above, { opacity: 0, y: 120, duration: 0.3, ease: 'power1.in' }); };

    if (under) {
        gsap.set(under, { opacity: 0, y: 120 });
        ScrollTrigger.create({ trigger: '.present-background', containerAnimation: horizontalScrollTween, start: 'left 65%', onEnter: () => { if (!tb20Passed()) return; showUnder(); }, onLeaveBack: () => hideUnder() });
        ScrollTrigger.create({ trigger: '.text-box-20', containerAnimation: horizontalScrollTween, start: 'left 20%', onEnter: () => { const rect = under.getBoundingClientRect(); if (rect.left < window.innerWidth && gsap.getProperty(under, 'opacity') < 0.5) showUnder(); }, onLeaveBack: () => hideUnder() });
    }

    if (above) {
        gsap.set(above, { opacity: 0, y: 120 });
        ScrollTrigger.create({ trigger: '.present-background', containerAnimation: horizontalScrollTween, start: 'left 40%', onEnter: () => { if (!tb20Passed()) return; showAbove(); }, onLeaveBack: () => hideAbove() });
        ScrollTrigger.create({ trigger: '.text-box-20', containerAnimation: horizontalScrollTween, start: 'left 10%', onEnter: () => { const rect = above.getBoundingClientRect(); if (rect.left < window.innerWidth && gsap.getProperty(above, 'opacity') < 0.5) showAbove(); }, onLeaveBack: () => hideAbove() });
    }
}

function initPresentFighters() {
    if (!horizontalScrollTween) return;

    const fighters = [
        { selector: '.present-fighter-1', x: -150, y: 0 },
        { selector: '.present-fighter-2', x: 0, y: 120 },
        { selector: '.present-fighter-3', x: 150, y: 0 },
    ];

    fighters.forEach((item) => {
        const el = document.querySelector(item.selector);
        if (!el) return;
        gsap.set(el, { opacity: 0, x: item.x, y: item.y });
    });

    fighters.forEach((item, i) => {
        const el = document.querySelector(item.selector);
        if (!el) return;
        ScrollTrigger.create({
            trigger: '.text-box-21', containerAnimation: horizontalScrollTween, start: `right ${55 - i * 15}%`,
            onEnter: () => { gsap.to(el, { opacity: 1, x: 0, y: 0, duration: 0.7, ease: 'power2.out' }); },
            onLeaveBack: () => { gsap.to(el, { opacity: 0, x: item.x, y: item.y, duration: 0.3, ease: 'power1.in' }); },
        });
    });
}

// =============================================
// Remaining Karaoke Boxes
// =============================================
function initRemainingKaraokeBoxes() {
    if (!horizontalScrollTween) return;

    const boxes = [
        '.text-box-5',
        '.text-box-9',
        '.text-box-13', '.text-box-14',
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
                scrollTrigger: { trigger: box, start: 'left 70%', end: 'left 20%', scrub: 0.3, containerAnimation: horizontalScrollTween }
            }
        );
    });

    const box15 = document.querySelector('.text-box-15');
    if (box15) {
        box15.querySelectorAll('p').forEach(p => wrapCharsInNode(p));
        const chars15 = Array.from(box15.querySelectorAll('.karaoke-char'));
        if (chars15.length) {
            gsap.fromTo(chars15,
                { opacity: 0.15, filter: 'blur(4px)' },
                {
                    opacity: 1, filter: 'blur(0px)', stagger: 0.02, ease: 'none', duration: 0.6,
                    scrollTrigger: { trigger: box15, start: 'left 50%', end: 'left 20%', scrub: 0.3, containerAnimation: horizontalScrollTween }
                }
            );
        }
    }

    const box22 = document.querySelector('.text-box-22');
    if (box22) {
        box22.querySelectorAll('p').forEach(p => wrapCharsInNode(p));
        const chars22 = Array.from(box22.querySelectorAll('.karaoke-char'));
        if (chars22.length) {
            gsap.fromTo(chars22,
                { opacity: 0.15, filter: 'blur(4px)' },
                {
                    opacity: 1, filter: 'blur(0px)', stagger: 0.02, ease: 'none', duration: 0.6,
                    scrollTrigger: { trigger: box22, start: 'left 70%', end: 'left 60%', scrub: 0.3, containerAnimation: horizontalScrollTween }
                }
            );
        }
    }
}

// =============================================
// Loading Screen
// =============================================
(function initLoader() {
    const progressFill = document.getElementById('progressFill');

    if (progressFill) {
        setTimeout(() => {
            progressFill.style.transition = 'width 1.5s cubic-bezier(0.1, 0.5, 0.5, 1)';
            progressFill.style.width = '35%';
        }, 50);
    }
})();

window.addEventListener('load', function () {
    const loader = document.getElementById('loadingOverlay');
    const progressFill = document.getElementById('progressFill');

    if (progressFill) {
        progressFill.style.transition = 'width 0.5s ease-out';
        progressFill.style.width = '100%';
    }

    setTimeout(() => {
        if (loader) {
            loader.classList.add('hidden');
            document.body.classList.remove('loading-active');

            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }
    }, 1000);
});

// =============================================
// Sak Yant Button Reveal
// =============================================
function initSakyantButtonReveal() {
    if (!horizontalScrollTween) return;

    const btn = document.querySelector('.next-page');
    const box22 = document.querySelector('.text-box-22');

    if (!btn || !box22) return;

    ScrollTrigger.create({
        trigger: box22,
        containerAnimation: horizontalScrollTween,
        start: 'left 55%',
        onEnter: () => btn.classList.add('show-btn'),
        onLeaveBack: () => btn.classList.remove('show-btn')
    });
}

(function () {
    let resizeTimer;

    function refreshGSAPLayout() {
        if (!window.ScrollTrigger) return;
        ScrollTrigger.clearScrollMemory();
        ScrollTrigger.refresh(true);
    }

    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(refreshGSAPLayout, 180);
    });

    window.addEventListener("orientationchange", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(refreshGSAPLayout, 220);
    });

    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(refreshGSAPLayout, 120);
        });
    }
})();