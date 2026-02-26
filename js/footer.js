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
                    <div class="footer-section footer-left">
                        <p>This website is a research project developed by fourth-year students from the Department of Computer and Information Technology, Faculty of Industrial Education and Technology, King Mongkut's University of Technology Thonburi (KMUTT).</p>
                        <p class="copyright">&copy; ${currentYear} MuayVerse. All rights reserved.</p>
                    </div>
                    <div class="footer-section footer-right">
                        <h3>MuayVerse</h3>
                    </div>
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
                padding: 20px 50px;
            }

            .footer-content {
                max-width: 1920px;
                margin: 0 auto;
                padding: 26px 0;
                display: grid;
                grid-template-columns: 1fr auto;
                gap: 180px;
                align-items: center;
            }
                
            .footer-section {
                display: flex;
                flex-direction: column;
            }

            .footer-left {
                justify-content: flex-start;
                text-align: left;
            }

            .footer-right {
                justify-content: flex-end;
                text-align: right;
            }

            .footer-section h3 {
                font-size: 120px;
                font-family: 'Bebas Neue';
                margin: 0;
                color: var(--color-text-light);
                font-weight: 400;
                line-height: normal;
            }

            .footer-section p {
                font-size: 14px;
                opacity: 0.9;
                margin: 0 0 10px 0;
                max-width: 800px;
            }

            .footer-section p.copyright {
                margin-top: 15px;
                font-size: 12px;
            }

            @media screen and (max-width: 768px) {
                .footer-content {
                    grid-template-columns: 1fr;
                    gap: 25px;
                    text-align: center;
                }

                .footer-left,
                .footer-right {
                    text-align: center;
                }

                .footer-section h3 {
                    font-size: 64px;
                }

                .footer-section p {
                    max-width: 100%;
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
