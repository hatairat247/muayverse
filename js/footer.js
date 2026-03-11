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
        /* ===== Flexbox Sticky Footer =====
           body เป็น flex column min-height: 100vh
           footer ใช้ margin-top: auto เพื่อดันตัวเองลงล่างเสมอเมื่อ content น้อย
           เมื่อ content เยอะกว่า 100vh → footer ต่อท้าย content ตามปกติ */
        body {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        /* flex: 1 ให้ main.page-content ยืดเต็มพื้นที่ว่าง
           ทำได้ทั้ง index (content เยอะ) และหน้าอื่น (content น้อย) */
        .page-content {
            flex: 1;
            display: block;
        }

        #footer {
            width: 100%;
            margin-top: auto; /* ดัน footer ลงล่างสุดเมื่อ content น้อย */
            background-color: var(--color-primary);
            display: block;
            position: relative;
            z-index: 99;
            
        }
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

            @media screen and (max-width: 1024px) {
                .footer-container {
                    padding: 20px 36px;
                }

                .footer-content {
                    gap: 80px;
                }

                .footer-section h3 {
                    font-size: 88px;
                }
            }

            @media screen and (max-width: 768px) {
                .footer-container {
                    padding: 10px 10px;
                }

                .footer-content {
                    grid-template-columns: 1fr;
                    gap: 16px;
                    text-align: center;
                    padding: 10px 0;
                }

                .footer-left,
                .footer-right {
                    text-align: center;
                    justify-content: center;
                    align-items: center;
                }

                .footer-section h3 {
                    font-size: 56px;
                }

                .footer-section p {
                    max-width: 100%;
                    font-size: 13px;
                }

                .footer-section p.copyright {
                    font-size: 11px;
                    margin-top: 8px;
                }
            }

            /* iPhone SE and small phones - fixed footer height */
            @media screen and (max-width: 430px) {
                #footer {
                    min-height: 250px !important;
                }
                
                .footer-container {
                    padding: 20px 25px !important;
                    min-height: 250px !important;
                }

                .footer-content {
                    padding: 20px 0 !important;
                    gap: 20px !important;
                    min-height: auto !important;
                }

                .footer-section h3 {
                    font-size: 44px !important;
                }

                .footer-section p {
                    font-size: 12px !important;
                }

                .footer-section p.copyright {
                    font-size: 11px !important;
                    margin-top: 10px !important;
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
