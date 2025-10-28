// Main JavaScript for interactions and scroll animations

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation scroll effect
const nav = document.getElementById('main-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Calculate years of experience dynamically from 2020.09
function calculateYearsExperience() {
    const startDate = new Date('2020-09-01');
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - startDate);
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25); // Account for leap years
    return Math.floor(diffYears);
}

// Animated counter for stats with easing
function animateCounter(element) {
    let target = parseInt(element.dataset.target);

    // Special handling for years experience - calculate dynamically
    if (element.classList.contains('years-experience')) {
        target = calculateYearsExperience();
        element.dataset.target = target;
    }

    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const startValue = 0;

    // Easing function for smooth acceleration/deceleration
    const easeOutExpo = (t) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Apply easing function
        const easedProgress = easeOutExpo(progress);
        const current = startValue + (target - startValue) * easedProgress;

        element.textContent = Math.floor(current);

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target; // Ensure final value is exact
        }
    };

    requestAnimationFrame(updateCounter);
}

// Observe stat numbers
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.textContent === '0') {
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statObserver.observe(stat);
});

// Active navigation highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Parallax for hero section
    const hero = document.getElementById('hero');
    if (hero) {
        const heroContent = hero.querySelector('.container');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 800);
        }
    }
});

// Add glow effect on timeline items when in view
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const marker = entry.target.querySelector('.timeline-marker');
            if (marker) {
                marker.style.animation = 'pulse 2s infinite';
            }
        }
    });
}, { threshold: 0.5 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 0 20px var(--primary-color);
            transform: translateX(-50%) scale(1);
        }
        50% {
            box-shadow: 0 0 40px var(--primary-color);
            transform: translateX(-50%) scale(1.2);
        }
    }

    .nav-links a.active {
        color: var(--primary-color);
    }

    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Project cards 3D tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateMatrixMode();
    }
});

function activateMatrixMode() {
    // Matrix rain effect
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    let matrixInterval = setInterval(() => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }, 33);

    // Reset after 10 seconds
    setTimeout(() => {
        clearInterval(matrixInterval);
        location.reload();
    }, 10000);

    // Show message
    const message = document.createElement('div');
    message.textContent = 'Matrix Mode Activated! 🎮';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 255, 0, 0.9);
        color: #000;
        padding: 2rem 3rem;
        border-radius: 10px;
        font-size: 2rem;
        font-weight: bold;
        z-index: 10000;
        animation: fadeInOut 3s;
    `;
    document.body.appendChild(message);

    setTimeout(() => message.remove(), 3000);
}

// Add fadeInOut animation
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(fadeStyle);

// Performance optimization: Lazy load images if any
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Creative: Animated gradient background that follows mouse (throttled)
let mouseX = 50;
let mouseY = 50;
let mouseTicking = false;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 100;
    mouseY = (e.clientY / window.innerHeight) * 100;

    if (!mouseTicking) {
        requestAnimationFrame(() => {
            document.body.style.background = `
                radial-gradient(circle at ${mouseX}% ${mouseY}%,
                    rgba(255, 255, 255, 0.02) 0%,
                    rgba(0, 0, 0, 1) 50%)
            `;
            mouseTicking = false;
        });
        mouseTicking = true;
    }
});

// Creative: Text glitch effect on hero title
function glitchEffect(element) {
    const originalText = element.textContent;
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    let iteration = 0;
    const interval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        if (iteration >= originalText.length) {
            clearInterval(interval);
        }

        iteration += 1 / 3;
    }, 30);
}

// Apply glitch on hero title hover
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    heroTitle.addEventListener('mouseenter', () => {
        glitchEffect(heroTitle);
    });
}

// Creative: Floating animation for cards
document.querySelectorAll('.education-card, .soft-skill-card').forEach((card, index) => {
    card.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
    card.style.animationDelay = `${index * 0.2}s`;
});

// Add float keyframe
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
    }

    @keyframes colorShift {
        0%, 100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(20deg); }
    }
`;
document.head.appendChild(floatStyle);

// Creative: Magnetic effect on buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0) scale(1)';
    });
});

// Creative: Skill tags appear with stagger effect
const skillTags = document.querySelectorAll('.skill-tag, .tag');
skillTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(20px) scale(0.8)';

    setTimeout(() => {
        tag.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        tag.style.opacity = '1';
        tag.style.transform = 'translateY(0) scale(1)';
    }, 100 + index * 30);
});

// Creative: Parallax effect on section backgrounds (throttled)
let parallaxTicking = false;
window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        requestAnimationFrame(() => {
            const sections = document.querySelectorAll('.section');
            sections.forEach((section, index) => {
                const speed = (index % 2 === 0) ? 0.5 : -0.3;
                const yPos = -(window.pageYOffset * speed);
                section.style.transform = `translateY(${yPos}px)`;
            });
            parallaxTicking = false;
        });
        parallaxTicking = true;
    }
});

// Creative: Timeline items reveal with draw effect
const timelineLines = document.querySelectorAll('.timeline::before');
const timelineObserverCreative = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'drawLine 2s ease-out forwards';
        }
    });
}, { threshold: 0.1 });

// Creative: Color shift on cards when hovering
document.querySelectorAll('.project-card, .education-card, .soft-skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'colorShift 2s ease-in-out infinite';
        card.style.boxShadow = '0 20px 60px rgba(255, 255, 255, 0.15)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.animation = '';
        card.style.boxShadow = '';
    });
});

// Creative: Text reveal on scroll (optimized)
const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.revealed) {
            entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.dataset.revealed = 'true';
            textRevealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Only observe direct content elements, not every single text node
document.querySelectorAll('.about-text p, .timeline-content, .education-card, .project-card, .soft-skill-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    textRevealObserver.observe(element);
});

// Creative: Dynamic particle color based on scroll position (throttled)
let hueRotation = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            hueRotation = (window.pageYOffset / 10) % 360;
            const canvas = document.getElementById('particle-canvas');
            if (canvas) {
                canvas.style.filter = `hue-rotate(${hueRotation}deg) brightness(1.2)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Creative: Contact section pulse effect
const contactSection = document.getElementById('contact');
if (contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ctaBox = entry.target.querySelector('.cta-box');
                if (ctaBox) {
                    ctaBox.style.animation = 'pulse 2s ease-in-out 3';
                }
            }
        });
    }, { threshold: 0.5 });

    contactObserver.observe(contactSection);
}

// Log loaded message
console.log('%c🎨 Interactive Resume Loaded! ', 'background: #00ffff; color: #0a0e27; font-size: 16px; padding: 10px;');
console.log('%c💡 Try the Konami Code for a surprise! ', 'color: #00ff88; font-size: 12px;');
console.log('%c⬆️ ⬆️ ⬇️ ⬇️ ⬅️ ➡️ ⬅️ ➡️ B A', 'color: #ff00ff; font-size: 14px; font-family: monospace;');
