// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    
    burger.addEventListener('click', () => {
        menu.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // Active menu item based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
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

    // Typing animation
    const typingElement = document.querySelector('.typing');
    const words = ['Web Developer', 'UI/UX Designer', 'App Developer', 'Tech Enthusiast'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typingElement.textContent = currentChar;
        typingElement.classList.add('stop-blinking');

        if (!isDeleting && charIndex < currentWord.length) {
            // If typing
            charIndex++;
            setTimeout(type, 200);
        } else if (isDeleting && charIndex > 0) {
            // If deleting
            charIndex--;
            setTimeout(type, 100);
        } else {
            // If word is deleted
            isDeleting = !isDeleting;
            typingElement.classList.remove('stop-blinking');
            
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            
            setTimeout(type, 1200);
        }
    }

    setTimeout(type, 1000);

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData);
        
        // Simulate form submission (replace with actual backend integration)
        console.log('Form submitted:', formObject);
        
        // Show success message (can be replaced with actual feedback UI)
        alert('Message sent successfully! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.about-content, .skills-content, .timeline-item, .project-item, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }

    // Add animation class to CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .about-content, .skills-content, .timeline-item, .project-item, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .about-content.animate, .skills-content.animate, .timeline-item.animate, .project-item.animate, .contact-content.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Check elements on page load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
}); 