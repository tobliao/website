// Verification-Themed Notification System
class VerificationNotifications {
    constructor() {
        this.createContainer();
    }

    createContainer() {
        if (document.getElementById('verification-notifications')) return;

        const container = document.createElement('div');
        container.id = 'verification-notifications';
        container.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    show(message, type = 'pass') {
        const notification = document.createElement('div');
        notification.className = `verification-notification ${type}`;

        const icons = {
            pass: '✓',
            fail: '✗',
            info: 'ℹ',
            coverage: '📊',
            debug: '🐛'
        };

        const colors = {
            pass: '#00ff88',
            fail: '#ff4444',
            info: '#00aaff',
            coverage: '#ffaa00',
            debug: '#ff00ff'
        };

        notification.style.cssText = `
            background: rgba(0, 0, 0, 0.95);
            border: 1px solid ${colors[type]};
            color: ${colors[type]};
            padding: 1rem 1.5rem;
            border-radius: 0;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            backdrop-filter: blur(10px);
            pointer-events: auto;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            min-width: 300px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.2rem;">${icons[type]}</span>
                <div style="flex: 1;">
                    <div style="font-weight: 600; margin-bottom: 0.25rem;">
                        ${this.getTitle(type)}
                    </div>
                    <div style="font-size: 0.85rem; opacity: 0.9;">
                        ${message}
                    </div>
                </div>
            </div>
        `;

        const container = document.getElementById('verification-notifications');
        container.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });

        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    getTitle(type) {
        const titles = {
            pass: 'ASSERTION PASS',
            fail: 'ASSERTION FAIL',
            info: 'SIMULATION INFO',
            coverage: 'COVERAGE UPDATE',
            debug: 'DEBUG MODE'
        };
        return titles[type] || 'NOTIFICATION';
    }

    // Convenience methods
    pass(message) {
        this.show(message, 'pass');
    }

    fail(message) {
        this.show(message, 'fail');
    }

    info(message) {
        this.show(message, 'info');
    }

    coverage(message) {
        this.show(message, 'coverage');
    }

    debug(message) {
        this.show(message, 'debug');
    }
}

// Initialize notification system
window.verifyNotif = new VerificationNotifications();

// Show welcome message after page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        window.verifyNotif.pass('Resume initialized successfully ✓');
    }, 1500);

    // Fun verification messages as user scrolls
    let shownCoverage = false;
    let shownDebug = false;

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        if (scrollPercent > 25 && !shownCoverage) {
            shownCoverage = true;
            window.verifyNotif.coverage('Code coverage: 25% → Keep exploring!');
        }

        if (scrollPercent > 75 && !shownDebug) {
            shownDebug = true;
            window.verifyNotif.pass('Coverage: 75% → Almost there!');
        }
    });
});

// Hook into form submissions
document.addEventListener('submit', (e) => {
    if (e.target.classList.contains('contact-form')) {
        e.preventDefault();
        window.verifyNotif.pass('Message sent successfully!');
        e.target.reset();
    }
});

// Hook into link clicks for fun messages
document.addEventListener('click', (e) => {
    if (e.target.closest('a[href^="#"]')) {
        const target = e.target.closest('a').getAttribute('href');
        const sectionNames = {
            '#about': 'About section',
            '#experience': 'Experience timeline',
            '#education': 'Education history',
            '#projects': 'Projects showcase',
            '#skills': 'Skills matrix',
            '#contact': 'Contact interface'
        };
        const section = sectionNames[target];
        if (section) {
            setTimeout(() => {
                window.verifyNotif.info(`Navigating to: ${section}`);
            }, 100);
        }
    }
});
