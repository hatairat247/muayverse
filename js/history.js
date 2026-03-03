// History Page - Horizontal Scrolling Timeline
// Using GSAP ScrollTrigger

// Use 'load' instead of 'DOMContentLoaded' to ensure CSS is fully loaded
window.addEventListener('load', () => {
    // Initialize GSAP & ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    initHorizontalScroll();
    initTextReveal();
    initFighterStagger();
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

    // Create horizontal scroll animation
    gsap.to(timelineTrack, {
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

// ===== Text Reveal Animation =====
function initTextReveal() {
    const textBoxes = document.querySelectorAll('.text-box');

    textBoxes.forEach((textBox) => {
        // Use GSAP to add 'revealed' class when scrolled into view
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
            containerAnimation: ScrollTrigger.getById('horizontal-scroll')
        });
    });
}

// ===== Fighter Stagger Animation =====
function initFighterStagger() {
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
            containerAnimation: ScrollTrigger.getById('horizontal-scroll')
        });
    });
}

// ===== Resize Handler =====
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});
