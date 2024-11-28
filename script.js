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

// Theme toggle function
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Get button position
    const buttonRect = themeToggle.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;
    
    // Set circle position
    const activeCircle = newTheme === 'light' ? lightCircle : darkCircle;
    const inactiveCircle = newTheme === 'light' ? darkCircle : lightCircle;
    
    activeCircle.style.left = `${centerX}px`;
    activeCircle.style.top = `${centerY}px`;
    activeCircle.style.width = `${Math.max(window.innerWidth, window.innerHeight) * 3}px`;
    activeCircle.style.height = `${Math.max(window.innerWidth, window.innerHeight) * 3}px`;
    
    // Reset inactive circle
    inactiveCircle.classList.remove('active');
    inactiveCircle.style.transform = 'translate(-50%, -50%) scale(0)';
    
    // Activate transition
    transitionOverlay.classList.add('active');
    activeCircle.classList.add('active');
    
    // Update theme after animation starts
    setTimeout(() => {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggleIcon.textContent = newTheme === 'dark' ? '🌞' : '🌙';
        
        // Remove transition after it completes
        setTimeout(() => {
            transitionOverlay.classList.remove('active');
            activeCircle.classList.remove('active');
        }, 1000);
    }, 500);
}

// Update circle position on window resize
window.addEventListener('resize', () => {
    const buttonRect = themeToggle.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;
    
    lightCircle.style.left = `${centerX}px`;
    lightCircle.style.top = `${centerY}px`;
    darkCircle.style.left = `${centerX}px`;
    darkCircle.style.top = `${centerY}px`;
    
    const size = Math.max(window.innerWidth, window.innerHeight) * 3;
    lightCircle.style.width = `${size}px`;
    lightCircle.style.height = `${size}px`;
    darkCircle.style.width = `${size}px`;
    darkCircle.style.height = `${size}px`;
});

// Add click event listener
themeToggle.addEventListener('click', toggleTheme);

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
    }, 2000); // Adjust this time (in ms) to make the preloader stay longer or shorter
});

// Optimize portrait image loading
document.addEventListener('DOMContentLoaded', () => {
    const portrait = document.querySelector('.portrait');
    if (portrait) {
        portrait.loading = 'eager';
        portrait.decoding = 'async';
    }
});
