// History Page - Horizontal Scrolling Timeline
// Using GSAP ScrollTrigger

// Store the horizontal scroll tween for containerAnimation references
let horizontalScrollTween = null;
let isInitialized = false;

// Use 'load' instead of 'DOMContentLoaded' to ensure CSS is fully loaded
window.addEventListener('load', () => {
    // Initialize GSAP & ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    setupKaraokeText();
    initHorizontalScroll();
    initTextReveal();
    initFighterStagger();
<<<<<<< HEAD
    initRuinsParallax();
    initAyutthayaParallax();
    initAyutthayaTextAnimation();
    initRegionalFightersAnimation();
    initKaraokeAnimation();
    initKickAnimation();
    initMouseParallax();
=======
    initChaiyaBounceReveal();
    initKaraokeBox10();
    initChaiyaFighterScrubReveal();
>>>>>>> 5a3222f95436aef57883316cf804ca0647b202a2
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
    });
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

<<<<<<< HEAD
// ===== Setup Karaoke Text Structure =====
function setupKaraokeText() {
    const karaokeTextElements = document.querySelectorAll('.karaoke-text');
    
    if (karaokeTextElements.length === 0) return;

    karaokeTextElements.forEach(karaokeTextElement => {
        // Get HTML content to preserve highlight spans
        const html = karaokeTextElement.innerHTML;
        
        // Create a temporary container to parse HTML
        const temp = document.createElement('div');
        temp.innerHTML = html;
        
        // Process text nodes and elements
        const processNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                // Split text into words
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
                // If it's a highlight span, process its children and mark chars as highlight
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

    if (!ruinsBack || !ruinsMiddle || !ruinsFront) {
        console.warn('Ruins layers not found');
        return;
    }

    // Slide up animation with fade in - reversible when scrolling
    gsap.fromTo(ruinsBack,
        { y: 120, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.bg-ruins',
                start: 'left 80%',
                end: 'right 20%',
                containerAnimation: horizontalScrollTween,
                toggleActions: 'play reverse play reverse'
            }
        }
    );

    gsap.fromTo(ruinsMiddle,
        { y: 80, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.1,
            scrollTrigger: {
                trigger: '.bg-ruins',
                start: 'left 80%',
                end: 'right 20%',
                containerAnimation: horizontalScrollTween,
                toggleActions: 'play reverse play reverse'
            }
        }
    );

    gsap.fromTo(ruinsFront,
        { y: 40, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power2.out',
            delay: 0.2,
            scrollTrigger: {
                trigger: '.bg-ruins',
                start: 'left 80%',
                end: 'right 20%',
                containerAnimation: horizontalScrollTween,
                toggleActions: 'play reverse play reverse'
            }
        }
    );

    // Parallax effect - each layer moves at different speed when scrolling
    gsap.to(ruinsBack, {
        x: -80,  // Move slower (back layer)
        ease: 'none',
        scrollTrigger: {
            trigger: '.bg-ruins',
            start: 'left right',
            end: 'right left',
            scrub: 2,
            containerAnimation: horizontalScrollTween
        }
    });

    gsap.to(ruinsMiddle, {
        x: -120,  // Move medium speed (middle layer)
        ease: 'none',
        scrollTrigger: {
            trigger: '.bg-ruins',
            start: 'left right',
            end: 'right left',
            scrub: 1.5,
            containerAnimation: horizontalScrollTween
        }
    });

    gsap.to(ruinsFront, {
        x: -160,  // Move faster (front layer)
        ease: 'none',
        scrollTrigger: {
            trigger: '.bg-ruins',
            start: 'left right',
            end: 'right left',
            scrub: 1,
            containerAnimation: horizontalScrollTween
        }
    });
}

// ===== Ayutthaya Temple Parallax Animation =====
function initAyutthayaParallax() {
    if (!horizontalScrollTween) return;

    const templeRight = document.querySelector('.temple-right');
    const templeLeft = document.querySelector('.temple-left');
    const templeCenter = document.querySelector('.temple-center');

    if (!templeRight || !templeLeft || !templeCenter) {
        console.warn('Temple layers not found');
        return;
    }

    // Slide down animation from top with fade in - reversible when scrolling
    gsap.fromTo(templeRight,
        { y: -120, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.ayutthaya-temples',
                start: 'left 80%',
                end: 'right 20%',
                containerAnimation: horizontalScrollTween,
                toggleActions: 'play reverse play reverse'
            }
        }
    );

    gsap.fromTo(templeLeft,
        { y: -80, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.1,
            scrollTrigger: {
                trigger: '.ayutthaya-temples',
                start: 'left 80%',
                end: 'right 20%',
                containerAnimation: horizontalScrollTween,
                toggleActions: 'play reverse play reverse'
            }
        }
    );

    gsap.fromTo(templeCenter,
        { y: -40, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power2.out',
            delay: 0.2,
            scrollTrigger: {
                trigger: '.ayutthaya-temples',
                start: 'left 80%',
                end: 'right 20%',
                containerAnimation: horizontalScrollTween,
                toggleActions: 'play reverse play reverse'
            }
        }
    );

    // Parallax effect - each layer moves at different speed when scrolling
    gsap.to(templeRight, {
        x: -80,  // Move slower (back layer)
        ease: 'none',
        scrollTrigger: {
            trigger: '.ayutthaya-temples',
            start: 'left right',
            end: 'right left',
            scrub: 2,
            containerAnimation: horizontalScrollTween
        }
    });

    gsap.to(templeLeft, {
        x: -120,  // Move medium speed (middle layer)
        ease: 'none',
        scrollTrigger: {
            trigger: '.ayutthaya-temples',
            start: 'left right',
            end: 'right left',
            scrub: 1.5,
            containerAnimation: horizontalScrollTween
        }
    });

    gsap.to(templeCenter, {
        x: -160,  // Move faster (front layer)
        ease: 'none',
        scrollTrigger: {
            trigger: '.ayutthaya-temples',
            start: 'left right',
            end: 'right left',
            scrub: 1,
            containerAnimation: horizontalScrollTween
        }
    });
}

// ===== Ayutthaya Text Box Animation =====
function initAyutthayaTextAnimation() {
    if (!horizontalScrollTween) return;

    const ayutthayaTextBoxes = [
        '.text-box-3',
        '.text-box-4',
        '.text-box-5'
    ];

    ayutthayaTextBoxes.forEach((selector, index) => {
        const textBox = document.querySelector(selector);
        if (!textBox) return;

        // Slide up animation with fade in - reversible when scrolling
        gsap.fromTo(textBox,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power2.out',
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: selector,
                    start: 'left 75%',
                    end: 'right 25%',
                    containerAnimation: horizontalScrollTween,
                    toggleActions: 'play reverse play reverse'
                }
            }
        );
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

    // Mouse move parallax effect for text boxes only
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;

        // Parallax for text boxes
        textBoxes.forEach((textBox, index) => {
            const multiplier = (index + 1) * 10;
            gsap.to(textBox, {
                x: mouseX * multiplier,
                y: mouseY * multiplier,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    });
}

// ===== Regional Fighters 3D Billboard Animation =====
function initRegionalFightersAnimation() {
    if (!horizontalScrollTween) return;

    const regionalFighters = document.querySelectorAll('.regional-fighter');
    const fighterLabels = document.querySelectorAll('.fighter-label');
    
    if (regionalFighters.length === 0) return;

    // Create trigger for all fighters to animate together
    ScrollTrigger.create({
        trigger: '.regional-fighters',
        start: 'left 70%',
        containerAnimation: horizontalScrollTween,
        onEnter: () => {
            // Animate all fighters and labels simultaneously with slight stagger
            regionalFighters.forEach((fighter, index) => {
                setTimeout(() => {
                    fighter.classList.add('revealed');
                }, index * 100); // 100ms stagger between each fighter
            });
            
            fighterLabels.forEach((label, index) => {
                setTimeout(() => {
                    label.classList.add('revealed');
                }, index * 100 + 200); // Labels appear 200ms after fighters start
            });
        },
        onLeaveBack: () => {
            // Reset animation when scrolling back
            regionalFighters.forEach(fighter => fighter.classList.remove('revealed'));
            fighterLabels.forEach(label => label.classList.remove('revealed'));
        }
    });
}

// ===== Karaoke Text Animation - Character by Character =====
function initKaraokeAnimation() {
    if (!horizontalScrollTween) return;

    // Animate karaoke text for text-box-1, text-box-2, and text-box-4
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

        // Animate characters based on scroll progress
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
                    if (index < activeCharCount) {
                        char.classList.add('active');
                    } else {
                        char.classList.remove('active');
                    }
                });
            }
        });
    });
}

// ===== Kick Animation Sequence =====
function initKickAnimation() {
    const kickPose = document.querySelector('.kick-pose');
    
    if (!kickPose) return;

    const framesData = kickPose.getAttribute('data-frames');
    if (!framesData) return;

    const frames = framesData.split(',');
    let currentFrame = 0;
    let animationInterval = null;

    kickPose.addEventListener('mouseenter', () => {
        // Start animation loop
        currentFrame = 0;
        animationInterval = setInterval(() => {
            currentFrame = (currentFrame + 1) % frames.length;
            kickPose.src = frames[currentFrame];
        }, 150); // Change frame every 150ms for smooth animation
    });

    kickPose.addEventListener('mouseleave', () => {
        // Stop animation and reset to first frame
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
        currentFrame = 0;
        kickPose.src = frames[0];
    });
}
=======
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



function initChaiyaFighterScrubReveal() {
    if (!horizontalScrollTween) return;

    // === รูป fighter ===
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
                    // เฟดหายก่อน แล้วค่อย reset ตำแหน่งหลังหายหมดแล้ว
                    gsap.to(el, {
                        opacity: 0,
                        duration: 0.3,
                        ease: "power1.in",
                        onComplete: () => {
                            // หายแล้ว → reset ตำแหน่งเตรียมเด้งใหม่ตอน scroll ไป
                            gsap.set(el, { y: 120, scale: 0.8 });
                        }
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
                    gsap.to(el, {
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                    });
                },
                onLeaveBack: () => {
                    gsap.to(el, {
                        opacity: 0,
                        duration: 0.3,
                        ease: "power1.in",
                        onComplete: () => {
                            gsap.set(el, { y: 60 });
                        }
                    });
                },
            }
        });
    });
}
>>>>>>> 5a3222f95436aef57883316cf804ca0647b202a2
