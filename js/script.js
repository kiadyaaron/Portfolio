document.addEventListener('DOMContentLoaded', function () {

    const themeToggle = document.getElementById('themeToggle');
    const footerThemeToggle = document.getElementById('footerThemeToggle');
    const html = document.documentElement;

    /* =====================
       THEME INITIAL
    ===================== */
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    let savedTheme = localStorage.getItem('portfolio-theme');

    if (!savedTheme) {
        savedTheme = prefersDarkScheme.matches ? 'dark' : 'light';
        localStorage.setItem('portfolio-theme', savedTheme);
    }

    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    /* =====================
       THEME TOGGLE
    ===================== */
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);

        html.classList.add('theme-changing');
        setTimeout(() => html.classList.remove('theme-changing'), 300);
    }

    function updateThemeIcon(theme) {
        if (footerThemeToggle) {
            footerThemeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (footerThemeToggle) {
        footerThemeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleTheme();
        });
    }

    /* =====================
       BACK TO TOP
    ===================== */
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 300);
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =====================
       PROGRESS BARS
    ===================== */
    const progressItems = document.querySelectorAll('.progress-fill');

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.dataset.progress + '%';
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.6 });

    progressItems.forEach(bar => progressObserver.observe(bar));

    /* =====================
       PROJECT CARD Z-INDEX
    ===================== */
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.style.zIndex = '10');
        card.addEventListener('mouseleave', () => card.style.zIndex = '1');
    });

    /* =====================
       NAVBAR ON SCROLL
    ===================== */
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.backdropFilter = 'blur(10px)';
                header.style.backgroundColor =
                    html.getAttribute('data-theme') === 'dark'
                        ? 'rgba(26,32,44,0.95)'
                        : 'rgba(254,244,242,0.95)';
            } else {
                header.style.backdropFilter = '';
                header.style.backgroundColor = '';
            }
        });
    }

});
