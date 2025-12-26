// ===== Warning Page JavaScript =====
document.addEventListener('DOMContentLoaded', function () {
    let hasScrolled = false;
    let hasClicked = false;
    let userAccepted = false;

    // Get DOM elements
    const container = document.querySelector('.warning-container');
    const acceptButton = document.querySelector('#acceptBtn'); // ใช้ icon left-click แทน
    const body = document.body;

    // Scroll tracking variables
    let scrollThreshold = 200; // pixels to scroll before considering "acceptance"
    let clickTimeout;

    // Initialize warning page
    function init() {
        console.log('Warning page initialized');

        // Start tracking user interactions
        trackScrolling();
        trackClicking();

        // Set up accept button
        setupAcceptButton();

        // Check if user scrolls or clicks within reasonable time
        setTimeout(() => {
            if (!hasScrolled && !hasClicked) {
                console.log('User can click the left-click icon to accept');
            }
        }, 3000); // Show button after 3 seconds if no interaction
    }

    // Track scrolling behavior
    function trackScrolling() {
        let scrollAmount = 0;

        window.addEventListener('scroll', function () {
            scrollAmount = window.pageYOffset || document.documentElement.scrollTop;

            // Add scrolled class for visual feedback
            if (scrollAmount > 50) {
                container.classList.add('scrolled');
            } else {
                container.classList.remove('scrolled');
            }

            // Check if user has scrolled enough to indicate acceptance
            if (scrollAmount > scrollThreshold && !hasScrolled) {
                hasScrolled = true;
                console.log('User has scrolled - indicating acceptance');
                enableAutoPlayMusic();
                handleUserAcceptance('scroll');
            }
        });
    }

    // Track clicking behavior
    function trackClicking() {
        // Track any click on the page (excluding the left-click icon)
        document.addEventListener('click', function (event) {
            // Don't count clicks on the left-click icon as general clicking
            if (event.target === acceptButton || event.target.closest('#acceptBtn')) {
                return;
            }

            if (!hasClicked) {
                hasClicked = true;
                console.log('User has clicked - indicating engagement');

                // Don't auto-show accept button since we have the click icon
                // Users can see the click icon to accept directly
            }
        });

        // Track mouse movement for engagement
        let mouseMovement = 0;
        document.addEventListener('mousemove', function () {
            mouseMovement++;

            // Just track movement, don't auto-show anything
            if (mouseMovement > 50 && !userAccepted) {
                console.log('User is actively moving mouse - engaged');
            }
        });
    }

    // Setup accept button functionality
    function setupAcceptButton() {
        if (acceptButton) {
            acceptButton.addEventListener('click', function (event) {
                event.stopPropagation(); // ป้องกัน event bubbling
                console.log('Left-click icon clicked - User accepted');
                enableAutoPlayMusic(); // เปิดใช้งานการเล่นเพลงอัตโนมัติ
                handleUserAcceptance('left-click');
            });

            // เพิ่ม visual feedback เมื่อ hover
            acceptButton.addEventListener('mouseenter', function () {
                acceptButton.style.transform = 'scale(1.1)';
                acceptButton.style.transition = 'transform 0.3s ease';
            });

            acceptButton.addEventListener('mouseleave', function () {
                acceptButton.style.transform = 'scale(1)';
            });
        }
    }

    // Show the accept button
    function showAcceptButton() {
        if (acceptButton && !userAccepted) {
            console.log('Showing accept button');
            acceptButton.classList.add('show');
        }
    }

    // Hide the accept button
    function hideAcceptButton() {
        if (acceptButton) {
            acceptButton.classList.remove('show');
        }
    }

    // Handle user acceptance through any method
    function handleUserAcceptance(method) {
        if (userAccepted) return; // Prevent multiple triggers

        userAccepted = true;
        console.log(`User accepted via ${method}`);

        // Hide accept button
        hideAcceptButton();

        // Add completion effect
        body.classList.add('warning-complete');

        // Show success feedback
        showAcceptanceFeedback(method);

        // Redirect after a short delay
        setTimeout(() => {
            redirectToHomepage();
        }, 1500);
    }

    // Show acceptance feedback
    function showAcceptanceFeedback(method) {
        // Create feedback element
        const feedback = document.createElement('div');

        const messages = {
            'scroll': '✓ คุณได้อ่านข้อมูลแล้ว',
            'left-click': '✓ ยินดีต้อนรับสู่ MuayVerse - เพลงพร้อมเล่น!',
            'button': '✓ ยินดีต้อนรับสู่ MuayVerse',
            'click': '✓ เริ่มต้นการเรียนรู้'
        };

        feedback.textContent = messages[method] || '✓ ยินดีต้อนรับ';

        document.body.appendChild(feedback);

        // Animate in
        setTimeout(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);

        // Animate out
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 300);
        }, 1000);
    }

    // Redirect to homepage
    function redirectToHomepage() {
        console.log('Redirecting to homepage...');

        // Add fade out effect
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '0';

        setTimeout(() => {
            // เพิ่ม parameter เพื่อบอกว่าผู้ใช้ยอมรับให้เล่นเพลงอัตโนมัติ
            const autoPlayParam = localStorage.getItem('muayverse_autoplay') === 'true' ? '?autoplay=true' : '';
            window.location.href = `index.html${autoPlayParam}`;
        }, 500);
    }

    // ฟังก์ชันเปิดใช้งานการเล่นเพลงอัตโนมัติ
    function enableAutoPlayMusic() {
        // บันทึกการยินยอมให้เล่นเพลงอัตโนมัติลงใน localStorage
        localStorage.setItem('muayverse_autoplay', 'true');
        localStorage.setItem('muayverse_music_consent', 'true');
        localStorage.setItem('muayverse_music_consent_time', new Date().getTime());

        console.log('Auto-play music enabled by user consent');

        // ส่ง event เพื่อแจ้งว่าผู้ใช้ให้ความยินยอมแล้ว
        window.dispatchEvent(new CustomEvent('musicConsentGiven', {
            detail: {
                method: 'left-click-icon',
                timestamp: new Date().getTime()
            }
        }));
    }

    // Keyboard shortcuts for accessibility
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', function (event) {
            // Enter or Space to accept
            if ((event.key === 'Enter' || event.key === ' ') && !userAccepted) {
                event.preventDefault();
                handleUserAcceptance('keyboard');
            }

            // Escape to show accept button
            if (event.key === 'Escape' && !userAccepted) {
                showAcceptButton();
            }
        });
    }

    // Setup accessibility features
    setupKeyboardShortcuts();

    // Initialize the warning page
    init();

    // Debug mode (remove in production)
    if (window.location.search.includes('debug=true')) {
        window.warningDebug = {
            hasScrolled,
            hasClicked,
            userAccepted,
            forceAccept: () => handleUserAcceptance('debug'),
            showButton: showAcceptButton,
            hideButton: hideAcceptButton
        };
        console.log('Warning debug mode enabled. Use window.warningDebug for testing.');
    }
});

// ===== Utility Functions =====

// Check if user has visited before (optional feature)
function hasVisitedBefore() {
    return localStorage.getItem('muayverse_visited') === 'true';
}

// Mark user as having visited
function markAsVisited() {
    localStorage.setItem('muayverse_visited', 'true');
}

// Skip warning for returning users (optional feature)
function checkReturnUser() {
    if (hasVisitedBefore() && window.location.search.includes('skip_warning=true')) {
        console.log('Returning user - skipping warning');
        window.location.href = 'index.html';
    }
}

// Auto-scroll detection for mobile
function setupMobileScrolling() {
    let startY = 0;
    let isScrolling = false;

    document.addEventListener('touchstart', function (e) {
        startY = e.touches[0].pageY;
        isScrolling = true;
    });

    document.addEventListener('touchend', function (e) {
        if (!isScrolling) return;

        const endY = e.changedTouches[0].pageY;
        const deltaY = startY - endY;

        // If user scrolled up significantly, consider it acceptance
        if (deltaY > 100) {
            console.log('Mobile upward scroll detected');
            if (!userAccepted) {
                // Access the userAccepted variable from the main scope
                document.dispatchEvent(new CustomEvent('userAcceptance', {
                    detail: { method: 'mobile_scroll' }
                }));
            }
        }

        isScrolling = false;
    });
}

// Setup mobile-specific interactions
setupMobileScrolling();