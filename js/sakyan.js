// Sak Yant Card Slider Component
class SakyanSlider {
    constructor() {
        this.container = document.querySelector('.cards-container');
        this.cards = document.querySelectorAll('.sakyan-card');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicatorContainer = document.getElementById('indicatorsContainer');
        
        this.currentIndex = 0;
        this.totalCards = this.cards.length;
        
        this.init();
        this.addMenuHistory();
    }

    init() {
        this.createIndicators();
        this.attachEventListeners();
        this.updateCardsPosition();
    }

    createIndicators() {
        this.indicatorContainer.innerHTML = '';
        for (let i = 0; i < this.totalCards; i++) {
            const indicator = document.createElement('button');
            indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
            indicator.setAttribute('aria-label', `Go to card ${i + 1}`);
            indicator.addEventListener('click', () => this.goToCard(i));
            this.indicatorContainer.appendChild(indicator);
        }
    }

    attachEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevCard());
        this.nextBtn.addEventListener('click', () => this.nextCard());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevCard();
            if (e.key === 'ArrowRight') this.nextCard();
        });

        // Touch support for mobile
        let touchStartX = 0;
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        this.container.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) {
                this.nextCard();
            } else if (touchEndX - touchStartX > 50) {
                this.prevCard();
            }
        });
    }

    prevCard() {
        this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
        this.updateCardsPosition();
        this.updateIndicators();
    }

    nextCard() {
        this.currentIndex = (this.currentIndex + 1) % this.totalCards;
        this.updateCardsPosition();
        this.updateIndicators();
    }

    goToCard(index) {
        this.currentIndex = index;
        this.updateCardsPosition();
        this.updateIndicators();
    }

    updateCardsPosition() {
        const positions = [
            { rotY: 0, z: 0, scale: 1, opacity: 1, zIndex: 5 },
            { rotY: 30, z: -100, scale: 0.9, opacity: 0.8, zIndex: 4 },
            { rotY: 60, z: -200, scale: 0.8, opacity: 0.6, zIndex: 3 },
            { rotY: -30, z: -100, scale: 0.9, opacity: 0.4, zIndex: 2 },
            { rotY: -60, z: -200, scale: 0.7, opacity: 0.2, zIndex: 1 }
        ];

        this.cards.forEach((card, i) => {
            const posIndex = (i - this.currentIndex + this.totalCards) % this.totalCards;
            const pos = positions[posIndex];

            card.style.transform = `
                translateX(-50%) 
                translateY(-50%) 
                rotateY(${pos.rotY}deg) 
                translateZ(${pos.z}px) 
                scale(${pos.scale})
            `;
            card.style.opacity = pos.opacity;
            card.style.zIndex = pos.zIndex;
            card.style.pointerEvents = posIndex === 0 ? 'auto' : 'none';
        });
    }

    updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === this.currentIndex);
        });
    }

    addMenuHistory() {
        // Add Sakyan to menu history if navigation is used
        // This will be called when users navigate here
        if (!sessionStorage.getItem('menuHistory')) {
            sessionStorage.setItem('menuHistory', 'sakyan');
        } else {
            const history = sessionStorage.getItem('menuHistory');
            if (!history.includes('sakyan')) {
                sessionStorage.setItem('menuHistory', history + ',sakyan');
            }
        }
    }

    // Optional: Auto-rotate cards (uncomment to enable)
    // startAutoRotate(interval = 5000) {
    //     this.autoRotateInterval = setInterval(() => {
    //         this.nextCard();
    //     }, interval);
    // }

    // stopAutoRotate() {
    //     if (this.autoRotateInterval) {
    //         clearInterval(this.autoRotateInterval);
    //     }
    // }
}

// Preload images for better performance
function preloadImages() {
    const images = [
        'img/sakyant-1.png',
        'img/sakyant-2.png',
        'img/sakyant-3.png',
        'img/sakyant-4.png',
        'img/sakyant-5.png'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', preloadImages);
