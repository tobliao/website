// Language Switcher
class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLang, false);

        // Add click handlers to language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });
    }

    setLanguage(lang, animate = true) {
        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);

        // Update active button state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });

        // Update all elements with lang-text class
        document.querySelectorAll('.lang-text').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                if (animate) {
                    element.style.opacity = '0';
                    setTimeout(() => {
                        element.textContent = text;
                        element.style.opacity = '1';
                    }, 150);
                } else {
                    element.textContent = text;
                }
            }
        });

        // Update navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            const text = link.getAttribute(`data-${lang}`);
            if (text) {
                if (animate) {
                    link.style.opacity = '0';
                    setTimeout(() => {
                        link.textContent = text;
                        link.style.opacity = '1';
                    }, 150);
                } else {
                    link.textContent = text;
                }
            }
        });

        // Update section titles
        document.querySelectorAll('[data-section-title]').forEach(element => {
            const text = element.getAttribute(`data-title-${lang}`);
            if (text) {
                if (animate) {
                    element.style.opacity = '0';
                    setTimeout(() => {
                        element.textContent = text;
                        element.style.opacity = '1';
                    }, 150);
                } else {
                    element.textContent = text;
                }
            }
        });

        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', lang);

        // Update terminal commands based on language
        if (window.terminalInstance) {
            window.terminalInstance.updateLanguage(lang);
        }
    }
}

// Initialize language switcher when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.langSwitcher = new LanguageSwitcher();
    });
} else {
    window.langSwitcher = new LanguageSwitcher();
}
