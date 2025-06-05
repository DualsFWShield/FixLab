document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Optional: change burger icon to 'X'
            const icon = burgerMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scroll for anchor links (optional, can be done with CSS scroll-behavior)
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href');
    //         const targetElement = document.querySelector(targetId);
    //         if (targetElement) {
    //             targetElement.scrollIntoView({
    //                 behavior: 'smooth'
    //             });
    //         }
    //     });
    // });

    // Active Nav Link highlighting based on section (more complex, for single page apps or advanced highlighting)
    // Or, just set it based on current page URL
    const currentLocation = window.location.href;
    const menuItem = document.querySelectorAll('.nav-links a');
    menuItem.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
            // If you want to remove 'active' from others (in case default 'active' is on home)
            // menuItem.forEach(i => { if (i !== item) i.classList.remove('active'); });
        } else {
            // Ensure home is not active if on another page, unless it's the base URL
            if (item.getAttribute('href') === 'index.html' && !currentLocation.endsWith('/') && !currentLocation.endsWith('index.html')) {
                 // do nothing or remove if it was set by default
            } else if (item.href !== currentLocation && item.classList.contains('active') && item.getAttribute('href') !== 'index.html'){
                 item.classList.remove('active');
            }
        }
    });
    // Ensure home is active if on root or index.html
    if (currentLocation.endsWith('/') || currentLocation.endsWith('index.html')) {
        const homeLink = document.querySelector('.nav-links a[href="index.html"]');
        if (homeLink) {
             menuItem.forEach(i => i.classList.remove('active')); // Clear others
             homeLink.classList.add('active');
        }
    }


    // Update Footer Year
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Simple Contact Form Validation (Example)
    const contactForm = document.querySelector('.contact-form form'); // Adjust selector if needed
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual submission for this demo
            
            let isValid = true;
            const name = contactForm.querySelector('input[name="name"]');
            const email = contactForm.querySelector('input[name="email"]');
            const message = contactForm.querySelector('textarea[name="message"]');

            if (!name.value.trim()) {
                alert('Veuillez entrer votre nom.');
                name.focus();
                isValid = false;
                return;
            }
            if (!email.value.trim() || !validateEmail(email.value.trim())) {
                alert('Veuillez entrer une adresse e-mail valide.');
                email.focus();
                isValid = false;
                return;
            }
            if (!message.value.trim()) {
                alert('Veuillez entrer votre message.');
                message.focus();
                isValid = false;
                return;
            }

            if (isValid) {
                alert('Merci pour votre message ! Nous vous recontacterons bientôt.');
                // Here you would typically send the form data to a server
                // e.g., using fetch() API
                contactForm.reset();
            }
        });
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

});
