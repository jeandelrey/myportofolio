document.addEventListener('DOMContentLoaded', function() {

    // --- 1. SIDEBAR NAVIGATION ---
    const sidebar = document.getElementById('nav-links');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay');

    if (hamburgerBtn && closeBtn && sidebar && overlay) {
        const openSidebar = () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        };
        const closeSidebar = () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        };
        
        hamburgerBtn.addEventListener('click', openSidebar);
        closeBtn.addEventListener('click', closeSidebar);
        overlay.addEventListener('click', closeSidebar);
    }

    // --- 2. UNIVERSAL SMOOTH SCROLL ---
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    allAnchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                if (sidebar && sidebar.classList.contains('active')) {
                    closeSidebar();
                }
                
                setTimeout(() => {
                    const offsetTop = targetSection.offsetTop - 72; // 72 adalah tinggi navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }, 150);
            }
        });
    });

    // --- 3. ACTIVE LINK HIGHLIGHT ON SCROLL ---
    const navLinksForHighlight = document.querySelectorAll('nav .nav-links a');
    window.addEventListener('scroll', () => {
        let fromTop = window.scrollY + 80;
        navLinksForHighlight.forEach(link => {
            let sectionId = link.getAttribute('href');
            if (sectionId && sectionId.startsWith('#')) {
                let section = document.querySelector(sectionId);
                if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                    navLinksForHighlight.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });
    
    // --- 4. TYPING ANIMATIONS (TYPED.JS) ---
    const nameElement = document.getElementById('animated-name');
    const subtitleElement = document.getElementById('animated-subtitle');
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Tampilan Mobile: Tampilkan teks statis yang rapi agar tidak error
        if (nameElement) nameElement.innerHTML = 'AHMAD<br>FAUZAN';
        if (subtitleElement) subtitleElement.textContent = 'Web Developer';
    } else {
        // Tampilan Desktop: Jalankan animasi mengetik
        if (nameElement) {
            new Typed('#animated-name', {
                strings: ['AHMAD FAUZAN'],
                typeSpeed: 100,
                showCursor: true,
                cursorChar: '|',
                loop: false
            });
        }
        if (subtitleElement) {
            new Typed('#animated-subtitle', {
                strings: ['Web Developer', 'UI/UX Enthusiast', 'Graphic Designer'],
                typeSpeed: 80,
                backSpeed: 50,
                backDelay: 2000,
                loop: true
            });
        }
    }

    // --- 5. FADE-IN ANIMATION ON SCROLL ---
    const animatedElements = document.querySelectorAll('.animated-element');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach((element, index) => {
            element.style.transitionDelay = (index % 4 * 100) + 'ms';
            observer.observe(element);
        });
    }
});