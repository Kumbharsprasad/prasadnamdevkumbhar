document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, .btn, .project-card, .back-to-top');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    // Detect if device supports hover (disables custom cursor on mobile)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instantly move the dot
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        });

        // Smoothly move the follower ring
        const render = () => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
            requestAnimationFrame(render);
        };
        render();

        // Cursor hover effects
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                follower.style.width = '60px';
                follower.style.height = '60px';
                follower.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                follower.style.borderColor = 'transparent';
                cursor.style.backgroundColor = '#fff';
            });
            link.addEventListener('mouseleave', () => {
                follower.style.width = '40px';
                follower.style.height = '40px';
                follower.style.backgroundColor = 'transparent';
                follower.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                cursor.style.backgroundColor = 'var(--accent)';
            });
        });
    }

    // Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Navbar Blur Effect and Back to Top on Scroll
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.9)';
            navbar.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
            navbar.style.padding = '1.5rem 5%';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.borderBottom = 'none';
            navbar.style.padding = '2rem 5%';
        }

        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
