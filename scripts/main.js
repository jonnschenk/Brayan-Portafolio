(function () {
    const DESIGN_WIDTH = 1382;
    const MOBILE_BREAKPOINT = 767;

    const wrapper = document.querySelector('.page-wrapper');
    if (!wrapper) return;

    const useZoom = document.body.classList.contains('page--secondary');
    const fluidUntil = Number(document.body.dataset.fluidUntil) || MOBILE_BREAKPOINT;

    function fitToViewport() {
        if (window.innerWidth <= fluidUntil) {
            wrapper.style.transform = 'none';
            wrapper.style.zoom = '';
            return;
        }

        const scale = window.innerWidth / DESIGN_WIDTH;

        if (useZoom) {
            wrapper.style.zoom = scale;
        } else {
            wrapper.style.transform = `scale(${scale})`;
        }
    }

    fitToViewport();
    window.addEventListener('resize', fitToViewport);
})();

(function () {
    const NAVIGATION_DELAY = 300;
    const wrapper = document.querySelector('.page-wrapper');

    window.navigateWithFade = function (href) {
        if (!wrapper) {
            window.location.href = href;
            return;
        }

        wrapper.classList.add('page-wrapper--leaving');
        setTimeout(() => {
            window.location.href = href;
        }, NAVIGATION_DELAY);
    };
})();

(function () {
    const menu = document.querySelector('.site-header__menu');
    if (!menu) return;

    const toggle = menu.querySelector('.site-header__menu-toggle');
    const dropdown = menu.querySelector('.site-header__menu-dropdown');
    const OPEN_CLASS = 'site-header__menu-dropdown--open';

    function isOpen() {
        return dropdown.classList.contains(OPEN_CLASS);
    }

    function setOpen(open) {
        dropdown.classList.toggle(OPEN_CLASS, open);
        toggle.setAttribute('aria-expanded', String(open));
    }

    toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        setOpen(!isOpen());
    });

    document.addEventListener('click', (event) => {
        if (isOpen() && !menu.contains(event.target)) {
            setOpen(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isOpen()) {
            setOpen(false);
            toggle.focus();
        }
    });

    dropdown.querySelectorAll('.site-header__menu-link').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            setOpen(false);
            window.navigateWithFade(link.getAttribute('href'));
        });
    });
})();
