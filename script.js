// ===== THEME TOGGLE LOGIC =====
const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply theme on load
document.documentElement.setAttribute('data-theme', storedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ===== MOBILE MENU TOGGLE =====
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== ENHANCED 3D CARD TILT EFFECT (THROTTLED) =====
const cards = document.querySelectorAll('.card-3d');

cards.forEach(card => {
    let ticking = false;

    card.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
                
                // Update CSS variables for lighting effect
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                
                ticking = false;
            });
            ticking = true;
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== 3D BUTTON TILT EFFECT (THROTTLED) =====
const buttons = document.querySelectorAll('.btn-3d');

buttons.forEach(btn => {
    let ticking = false;

    btn.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                btn.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
                ticking = false;
            });
            ticking = true;
        }
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'perspective(500px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== FORM SUBMISSION =====
const contactForm = document.querySelector('.contact-right');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');

        if (name) {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// ===== SHOW MORE PROJECTS LOGIC =====
const showMoreBtn = document.getElementById('showMoreBtn');
const extraProjects = document.querySelectorAll('.extra-projects');

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function() {
        let showingExtra = false;
        
        extraProjects.forEach(project => {
            if (project.classList.contains('hidden')) {
                project.classList.remove('hidden');
                showingExtra = true;
            } else {
                project.classList.add('hidden');
                showingExtra = false;
            }
        });

        if (showingExtra) {
            this.innerHTML = 'Show less <i class="fas fa-arrow-up"></i>';
        } else {
            this.innerHTML = 'Show more <i class="fas fa-arrow-right"></i>';
        }
    });
}


// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Slightly adjusted margin for better trigger
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Use class for animation
            observer.unobserve(entry.target); // Stop observing once visible to save performance
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .work-card, .about-card, .language-card, .hobby-card, .section-title').forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
});

// ===== NAVBAR BACKGROUND ON SCROLL (THROTTLED) =====
let navTicking = false;
window.addEventListener('scroll', () => {
    if (!navTicking) {
        window.requestAnimationFrame(() => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
               nav.classList.add('scrolled');
            } else {
               nav.classList.remove('scrolled');
            }
            navTicking = false;
        });
        navTicking = true;
    }
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

console.log('Portfolio loaded successfully! 🚀');
