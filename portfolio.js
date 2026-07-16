/* ==========================================================================
   Portfolio Interactivity & Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initTypewriter();
    initScrollReveal();
    initProjectFilter();
    initContactForm();
    initNavbarScroll();
});



/* ==========================================================================
   2. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle active state
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animated bars transformation
        const bars = mobileMenuBtn.querySelectorAll('.bar');
        if (mobileMenuBtn.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                mobileMenuBtn.click(); // reuse toggle logic
            }
        });
    });
}

/* ==========================================================================
   3. Typewriter Effect
   ========================================================================== */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "Assistant Professor.",
        "UGC NET Qualified Educator.",
        "Full-Stack Developer.",
        "Computer Science Specialist."
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // faster deletion
        } else {
            // Add character
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // standard typing speed
        }
        
        // Typing/deleting thresholds
        if (!isDeleting && charIndex === currentWord.length) {
            // Word complete, pause before deletion
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word deleted, move to next
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // short pause before typing next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing cycle
    if (typewriterElement) {
        setTimeout(type, 1000);
    }
}

/* ==========================================================================
   4. Scroll Reveal Animations (Intersection Observer)
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const observerOptions = {
        root: null,
        threshold: 0.1, // Trigger when 10% of element is in view
        rootMargin: '0px 0px -50px 0px' // offset bottom slightly
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // stop observing once shown
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/* ==========================================================================
   5. Dynamic Project Card Filtering
   ========================================================================== */
function initProjectFilter() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Toggle active state in tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const filterValue = tab.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                    // Trigger a tiny animation refresh
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    // Delay class addition to complete transition fade-out
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 250);
                }
            });
        });
    });
}



/* ==========================================================================
   7. Contact Form Handling & Modal Popup
   ========================================================================== */
function initContactForm() {
    const contactForm = document.getElementById('portfolioContactForm');
    const feedbackModal = document.getElementById('feedbackModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    const modalNameSpan = document.getElementById('feedbackModalUserName');
    const modalEmailSpan = document.getElementById('feedbackModalUserEmail');
    
    if (contactForm && feedbackModal) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Retrieve values
            const nameInput = document.getElementById('formName').value;
            const emailInput = document.getElementById('formEmail').value;
            
            // Populating success feedback values
            if (modalNameSpan) modalNameSpan.textContent = nameInput;
            if (modalEmailSpan) modalEmailSpan.textContent = emailInput;
            
            // Open Modal
            feedbackModal.classList.remove('hidden');
            
            // Reset contact form
            contactForm.reset();
        });
    }
    
    // Close Modal Event Listener
    if (closeModalBtn && feedbackModal) {
        closeModalBtn.addEventListener('click', () => {
            feedbackModal.classList.add('hidden');
        });
        
        // Close modal when user clicks outside the modal card
        feedbackModal.addEventListener('click', (e) => {
            if (e.target === feedbackModal) {
                feedbackModal.classList.add('hidden');
            }
        });
    }
}

/* ==========================================================================
   8. Navigation Bar scroll active styling
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}
