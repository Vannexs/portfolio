document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle (Keep existing logic) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const moonIcon = themeToggle?.querySelector('.fa-moon');
    const sunIcon = themeToggle?.querySelector('.fa-sun');

    const setTheme = (theme) => {
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(theme + '-theme');
        if (theme === 'dark') {
            moonIcon?.style.setProperty('display', 'none');
            sunIcon?.style.setProperty('display', 'inline-block');
            themeToggle?.setAttribute('aria-label', 'Switch to light mode');
        } else {
            moonIcon?.style.setProperty('display', 'inline-block');
            sunIcon?.style.setProperty('display', 'none');
            themeToggle?.setAttribute('aria-label', 'Switch to dark mode');
        }
        localStorage.setItem('portfolioTheme', theme);
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }
    const savedTheme = localStorage.getItem('portfolioTheme') || 'light';
    setTheme(savedTheme);

    // --- Mobile Menu Toggle (Keep existing logic) ---
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('navList');
    const menuIcon = menuToggle?.querySelector('i');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isActive = navList.classList.toggle('is-active');
            menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars', !isActive);
                menuIcon.classList.toggle('fa-times', isActive);
            }
        });
        // Close menu on link click
        navList.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('is-active')) {
                    navList.classList.remove('is-active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    if (menuIcon) { menuIcon.classList.replace('fa-times', 'fa-bars'); }
                }
            });
        });
         // Close menu on outside click
        document.addEventListener('click', (event) => {
             if (!navList.contains(event.target) && !menuToggle.contains(event.target) && navList.classList.contains('is-active')) {
                navList.classList.remove('is-active');
                menuToggle.setAttribute('aria-expanded', 'false');
                if (menuIcon) { menuIcon.classList.replace('fa-times', 'fa-bars'); }
             }
        });
    }

    // --- Animate Progress Bars on Scroll (Keep existing logic) ---
    const progressBars = document.querySelectorAll('.progress-bar');
    const animateProgress = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                if (!bar.style.width || bar.style.width === '0%') {
                     bar.style.width = progress + '%';
                }
                // observer.unobserve(bar); // Optional: unobserve after first animation
            }
        });
    };
    if (progressBars.length > 0) {
        const progressBarObserver = new IntersectionObserver(animateProgress, { threshold: 0.3 });
        progressBars.forEach(bar => progressBarObserver.observe(bar));
    }


    // --- *** NEW: Reveal Elements on Scroll *** ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            // Check if element is intersecting (coming into view)
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: Stop observing the element after it has been revealed once
                observer.unobserve(entry.target);
            }
            // Optional: If you want elements to hide again when scrolling up out of view
            // else {
            //    entry.target.classList.remove('revealed');
            // }
        });
    };

    if (revealElements.length > 0) {
        const revealObserverOptions = {
            root: null, // relative to the viewport
            threshold: 0.15, // Trigger when 15% of the element is visible
            // rootMargin: '0px 0px -50px 0px' // Optional: trigger animation slightly before element is fully in view
        };
        const revealObserver = new IntersectionObserver(revealOnScroll, revealObserverOptions);
        revealElements.forEach(el => {
             // Check if element might already be in view on load (e.g., About section if Hero is short)
            // This prevents elements already visible from needing a scroll to animate.
            // const bounding = el.getBoundingClientRect();
            // if (bounding.top < window.innerHeight && bounding.bottom >= 0) {
            //    el.classList.add('revealed');
            // } else {g
                 revealObserver.observe(el);
            // }

            // Simpler approach: Just observe all, animation is fast enough.
             revealObserver.observe(el);
        });
    }

}); // End DOMContentLoaded