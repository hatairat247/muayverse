// Footer Component
class Footer {
    constructor() {
        this.footer = document.getElementById('footer');
        this.init();
    }

    init() {
        this.render();
        this.addStyles();
    }

    render() {
        const currentYear = new Date().getFullYear();

        this.footer.innerHTML = `
            <div class="footer-container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>MuayVerse</h3>
                        <p>ศิลปะแห่งมวยไทย</p>
                    </div>
                    
                    <div class="footer-section">
                        <h4>เมนูหลัก</h4>
                        <ul class="footer-links">
                            <li><a href="#history"><i class="fas fa-book"></i> ประวัติมวยไทย</a></li>
                            <li><a href="#waikhru"><i class="fas fa-hands-praying"></i> ไหว้ครู</a></li>
                            <li><a href="#artof8"><i class="fas fa-fist-raised"></i> ศิลปะ 8 อาวุธ</a></li>
                            <li><a href="#contact"><i class="fas fa-envelope"></i> ติดต่อเรา</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>ติดตามเรา</h4>
                        <div class="social-links">
                            <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; ${currentYear} MuayVerse. All rights reserved.</p>
                </div>
            </div>
        `;
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .footer-container {
                background-color: var(--color-primary);
                color: var(--color-text-light);
                padding: 40px 20px 20px;
                margin-top: 80px;
                border-top: 3px solid var(--color-secondary);
            }

            .footer-content {
                max-width: 1200px;
                margin: 0 auto;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 30px;
                padding-bottom: 30px;
            }

            .footer-section h3 {
                font-size: 24px;
                font-weight: var(--font-weight-semibold);
                margin-bottom: 10px;
                color: var(--color-text-light);
            }

            .footer-section h4 {
                font-size: 18px;
                font-weight: var(--font-weight-medium);
                margin-bottom: 15px;
                color: var(--color-text-light);
            }

            .footer-section p {
                font-size: 14px;
                opacity: 0.9;
            }

            .footer-links {
                list-style: none;
                padding: 0;
            }

            .footer-links li {
                margin-bottom: 10px;
            }

            .footer-links a {
                color: var(--color-text-light);
                font-size: 14px;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                opacity: 0.9;
            }

            .footer-links a:hover {
                opacity: 1;
                transform: translateX(5px);
                color: #fff;
            }

            .social-links {
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
            }

            .social-links a {
                width: 40px;
                height: 40px;
                background-color: rgba(253, 240, 213, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--color-text-light);
                font-size: 20px;
                transition: all 0.3s ease;
            }

            .social-links a:hover {
                background-color: var(--color-secondary);
                transform: translateY(-5px) scale(1.1);
                box-shadow: 0 5px 15px rgba(120, 0, 0, 0.5);
            }

            .footer-bottom {
                text-align: center;
                padding-top: 20px;
                border-top: 1px solid rgba(253, 240, 213, 0.2);
                font-size: 14px;
                opacity: 0.8;
            }

            @media screen and (max-width: 768px) {
                .footer-content {
                    grid-template-columns: 1fr;
                    gap: 25px;
                    text-align: center;
                }

                .footer-links a {
                    justify-content: center;
                }

                .social-links {
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize Footer when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new Footer());
} else {
    new Footer();
}
