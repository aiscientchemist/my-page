document.addEventListener('DOMContentLoaded', function() {

    // --- Mobilne menu (hamburger) ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Zmiana ikony hamburgera na "X" i z powrotem
        const icon = hamburger.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Zamykanie menu po kliknięciu w link (na mobilnych)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // --- Animacja pojawiania się elementów przy przewijaniu (Fade-in effect) ---
    // Ten kod sprawia, że sekcje płynnie się pojawiają, gdy użytkownik do nich przewinie.
    // Najpierw ukrywamy elementy, które mają się animować
    const faders = document.querySelectorAll('.section, .card, .testimonial, .about-photo, .about-text');
    faders.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    const appearOptions = {
        threshold: 0.2, // Element pojawi się, gdy będzie widoczny w 20%
        rootMargin: "0px 0px -50px 0px" // Trochę mniejszy viewport, by animacja była bardziej widoczna
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                appearOnScroll.unobserve(entry.target); // Animacja odpali się tylko raz
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

});