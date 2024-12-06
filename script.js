// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Page transition effect
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

// Observe elements for animation
document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add subtle sparkle effect to instructor name
const instructorName = document.querySelector('.instructor-name');
if (instructorName) {
    const createSparkle = () => {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        instructorName.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    };

    setInterval(createSparkle, 2000);
}

// Add mouse move effect for student button
const studentBtn = document.querySelector('.student-btn');
if (studentBtn) {
    studentBtn.addEventListener('mousemove', (e) => {
        const rect = studentBtn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const circle = studentBtn.querySelector('::before');
        if (circle) {
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;
            circle.style.opacity = '1';
        }
    });

    studentBtn.addEventListener('mouseleave', () => {
        const circle = studentBtn.querySelector('::before');
        if (circle) {
            circle.style.opacity = '0';
        }
    });
}

// Theme toggling functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeToggleIcon = document.querySelector('.theme-toggle-icon');

// Create theme transition overlay
const transitionOverlay = document.createElement('div');
transitionOverlay.className = 'theme-transition-overlay';
document.body.appendChild(transitionOverlay);

// Create light and dark circles
const lightCircle = document.createElement('div');
lightCircle.className = 'light-circle';
const darkCircle = document.createElement('div');
darkCircle.className = 'dark-circle';
transitionOverlay.appendChild(lightCircle);
transitionOverlay.appendChild(darkCircle);

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggleIcon.textContent = savedTheme === 'dark' ? '🌞' : '🌙';

// Theme Toggle Function
function toggleTheme() {
    const root = document.documentElement;
    const overlay = document.querySelector('.theme-transition-overlay');
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Add transition overlay
    overlay.classList.add('active');
    
    // Change theme
    setTimeout(() => {
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggleIcon.textContent = newTheme === 'dark' ? '🌞' : '🌙';
        
        // Remove overlay
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 700);
    }, 50);
}

// Add click event listener
themeToggle.addEventListener('click', toggleTheme);

// Page Transition
const sections = document.querySelectorAll('.section');
const glitchTransition = document.querySelector('.glitch-transition');
const navLinks = document.querySelectorAll('nav a');

function transitionToSection(targetSection) {
    // Don't transition if already on the section
    if (targetSection.classList.contains('active')) return;

    // Start glitch effect
    glitchTransition.classList.add('active');

    // After a small delay, switch sections
    setTimeout(() => {
        sections.forEach(section => section.classList.remove('active'));
        targetSection.classList.add('active');

        // Remove glitch effect after transition
        setTimeout(() => {
            glitchTransition.classList.remove('active');
        }, 400); // Match this with the CSS animation duration
    }, 200);
}

// Add click handlers to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.querySelector(`[data-section="${targetId}"]`);
        if (targetSection) {
            transitionToSection(targetSection);
        }
    });
});

// Smart Header Scroll
let lastScrollTop = 0;
const nav = document.querySelector('nav');
const scrollThreshold = 100; // Minimum scroll amount before hiding/showing
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            // Show/hide header based on scroll direction
            if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
                // Scrolling down & past threshold
                nav.classList.add('nav-hidden');
                nav.classList.remove('nav-visible');
            } else {
                // Scrolling up or at top
                nav.classList.remove('nav-hidden');
                nav.classList.add('nav-visible');
            }
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
            isScrolling = false;
        });
    }
    isScrolling = true;
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

// Show button when scrolling down
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Smooth scroll to top
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Preloader
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    const mainContent = document.querySelector('.main-content');
    
    // Simulate loading time (you can remove this setTimeout if you want it to load instantly)
    setTimeout(() => {
        preloader.classList.add('fade-out');
        mainContent.classList.remove('hidden');
        
        // Remove preloader from DOM after animation
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1500); // Adjust this time (in ms) to make the preloader stay longer or shorter
});

// Optimize portrait image loading
document.addEventListener('DOMContentLoaded', () => {
    const portrait = document.querySelector('.portrait');
    if (portrait) {
        portrait.loading = 'lazy';
        portrait.decoding = 'async';
    }
});
