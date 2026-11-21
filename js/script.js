/**
 * K Lasya Rao Portfolio - Interactive Scripts
 * Handles mobile navbar, scroll spy, dynamic typing, tab filtering, 
 * resume modal, and contact form handling.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE NAVBAR TOGGLE
       ========================================================================== */
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        });

        // Close mobile navbar when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            });
        });
    }


    /* ==========================================================================
       STICKY HEADER & SCROLL SPY
       ========================================================================== */
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Sticky Header
        if (header) {
            header.classList.toggle('sticky', scrollY > 60);
        }

        // Active link tracking
        sections.forEach(sec => {
            const offset = sec.offsetTop - 150;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (scrollY >= offset && scrollY < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial check


    /* ==========================================================================
       DYNAMIC TYPING EFFECT
       ========================================================================== */
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = [
            "AI Enthusiast",
            "Generative AI & Agent Developer",
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        const type = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 45;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at complete word
                isDeleting = true;
                typeSpeed = 1800;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400;
            }

            setTimeout(type, typeSpeed);
        };

        // Start typing after initial delay
        setTimeout(type, 600);
    }


    /* ==========================================================================
       JOURNEY SECTION TAB FILTERING
       ========================================================================== */
    const journeyTabBtns = document.querySelectorAll('.journey-tab-btn');
    const journeyCols = document.querySelectorAll('.journey-col');

    journeyTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            journeyTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const target = btn.getAttribute('data-target');

            journeyCols.forEach(col => {
                const category = col.getAttribute('data-category');
                if (target === 'all') {
                    col.style.display = 'block';
                } else if (target === 'experience' && category === 'experience') {
                    col.style.display = 'block';
                } else if (target === 'education' && category.includes('education')) {
                    col.style.display = 'block';
                } else if (target === 'leadership' && category.includes('leadership')) {
                    col.style.display = 'block';
                } else {
                    col.style.display = 'none';
                }
            });
        });
    });


    /* ==========================================================================
       PROJECTS FILTERING
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });


    /* ==========================================================================
       RESUME VIEWER MODAL
       ========================================================================== */
    const resumeModal = document.querySelector('#resumeModal');
    const resumeOpenBtns = document.querySelectorAll('.resume-open-btn');
    const resumeCloseBtn = document.querySelector('#closeResumeBtn');
    const resumeBackdrop = document.querySelector('.resume-modal-backdrop');

    const openResume = (e) => {
        if (e) e.preventDefault();
        if (resumeModal) {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeResume = () => {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    resumeOpenBtns.forEach(btn => btn.addEventListener('click', openResume));
    if (resumeCloseBtn) resumeCloseBtn.addEventListener('click', closeResume);
    if (resumeBackdrop) resumeBackdrop.addEventListener('click', closeResume);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
            closeResume();
        }
    });


    /* ==========================================================================
       CONTACT FORM AJAX SUBMISSION (Web3Forms)
       ========================================================================== */
    const contactForm = document.querySelector('#contactForm');
    const formStatus = document.querySelector('#formStatus');
    const submitBtn = document.querySelector('#submitBtn');

    if (contactForm && formStatus && submitBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Set loading state
            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Sending...";
            formStatus.className = 'form-status';
            formStatus.textContent = '';
            formStatus.style.display = 'none';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (response.status === 200 && data.success) {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = '🎉 Thank you! Your message has been sent successfully. I will get back to you shortly.';
                    contactForm.reset();
                } else {
                    formStatus.className = 'form-status error';
                    formStatus.textContent = data.message || '⚠️ Oops! Something went wrong. Please email directly at klasyarao@gmail.com.';
                }
            } catch (err) {
                formStatus.className = 'form-status error';
                formStatus.textContent = '⚠️ Network error: Could not reach the mail service. Please reach out via klasyarao@gmail.com.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            }
        });
    }

});
