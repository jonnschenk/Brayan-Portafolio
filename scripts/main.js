(function () {
    const DESIGN_WIDTH = 1382;
    const MOBILE_BREAKPOINT = 767;

    const wrapper = document.querySelector('.page-wrapper');
    if (!wrapper) return;

    function fitToViewport() {
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
            wrapper.style.transform = 'none';
            return;
        }
        const scale = window.innerWidth / DESIGN_WIDTH;
        wrapper.style.transform = `scale(${scale})`;
    }

    fitToViewport();
    window.addEventListener('resize', fitToViewport);
})();

(function () {
    const menu = document.querySelector('.site-header__menu');
    if (!menu) return;

    const toggle = menu.querySelector('.site-header__menu-toggle');
    const dropdown = menu.querySelector('.site-header__menu-dropdown');
    const pageWrapper = document.querySelector('.page-wrapper');
    const NAVIGATION_DELAY = 300;

    function closeMenu() {
        dropdown.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    }

    function openMenu() {
        dropdown.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
    }

    function toggleMenu() {
        if (dropdown.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
            toggle.focus();
        }
    });

    dropdown.querySelectorAll('.site-header__menu-link').forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (!href || !pageWrapper) return;
            event.preventDefault();
            closeMenu();
            pageWrapper.classList.add('is-leaving');
            setTimeout(() => {
                window.location.href = href;
            }, NAVIGATION_DELAY);
        });
    });
})();
