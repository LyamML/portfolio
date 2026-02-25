document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;
        const header = document.querySelector('.fixed-nav');

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealScroll);
    revealScroll(); // Trigger once on load

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Modal System
    const certItems = document.querySelectorAll('.cert-item');
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-img');
    const modalPdf = document.getElementById('modal-pdf');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    if (modal) {
        certItems.forEach(item => {
            item.addEventListener('click', () => {
                const certSrc = item.getAttribute('data-cert');
                const isPdf = certSrc.toLowerCase().endsWith('.pdf');

                if (isPdf) {
                    modalImg.style.display = 'none';
                    modalPdf.style.display = 'block';
                    modalPdf.src = certSrc;
                } else {
                    modalPdf.style.display = 'none';
                    modalImg.style.display = 'block';
                    modalImg.src = certSrc;
                }

                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scroll
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            // Reset sources to stop video/audio if any and clear memory
            setTimeout(() => {
                modalImg.src = '';
                modalPdf.src = '';
                modalImg.style.display = 'none';
                modalPdf.style.display = 'none';
            }, 400);
        };

        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);

        // Close on Escape
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Smooth scroll for nav links
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            const navHeight = document.querySelector('.fixed-nav').offsetHeight;

            window.scrollTo({
                top: targetEl.offsetTop - navHeight,
                behavior: 'smooth'
            });
        });
    });

    // Micro-animation: Parallax for grid background
    const grid = document.querySelector('.grid-pattern');
    if (grid) {
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
            grid.style.transform = `translate(calc(-5% + ${moveX}px), calc(-5% + ${moveY}px))`;
        });
    }
});
