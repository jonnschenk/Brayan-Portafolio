(function () {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const sections = [
        { name: 'About me', href: 'pages/about.html' },
        { name: 'Web projects', href: 'pages/projects.html' },
        { name: 'iOS & Android', href: 'pages/ecosystem.html' },
        { name: 'Design system', href: 'pages/design.html' },
        { name: 'UX & Research', href: 'pages/research.html' },
        { name: 'Social Impact', href: 'pages/impact.html' },
        { name: 'Contact me', href: 'pages/contact.html' }
    ];

    const ROTATION_BY_LEVEL = [0, 29.98, 58.64, 90];
    const LIFT_BY_LEVEL = [0, 14, 2, 0];
    const SHIFT_BY_LEVEL = [0, 15, 17, 0];

    const CAROUSEL_DURATION = 1100;
    const LABEL_FADE = 300;
    const AUTOPLAY_INTERVAL = 4000;
    const INITIAL_INDEX = 0;

    const cards = Array.from(carousel.querySelectorAll('.carousel__card'));
    const prevBtn = carousel.querySelector('.carousel__arrow--prev');
    const nextBtn = carousel.querySelector('.carousel__arrow--next');
    const label = carousel.querySelector('.carousel__label');
    const labelText = label.querySelector('.carousel__label-text');
    const total = cards.length;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let activeIndex = INITIAL_INDEX;
    let labelSwapTimeout = null;
    let autoplayTimer = null;

    function setLabel() {
        const active = sections[activeIndex];
        labelText.textContent = active.name;
        label.setAttribute('href', active.href);
    }

    function render(withTransition) {
        cards.forEach((card, i) => {
            let offset = i - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const level = Math.abs(offset);
            const side = Math.sign(offset);
            const isActive = offset === 0;

            card.style.setProperty('--rotation', `${side * ROTATION_BY_LEVEL[level]}deg`);
            card.style.setProperty('--lift', `${LIFT_BY_LEVEL[level]}px`);
            card.style.setProperty('--shift', `${side * SHIFT_BY_LEVEL[level]}px`);
            card.style.setProperty('--z', total - level);
            card.classList.toggle('carousel__card--active', isActive);
            card.classList.toggle('carousel__card--no-transition', !withTransition);

            if (isActive) {
                card.setAttribute('href', sections[i].href);
            } else {
                card.removeAttribute('href');
            }
        });

        clearTimeout(labelSwapTimeout);

        if (!withTransition) {
            label.classList.remove('carousel__label--hidden');
            setLabel();
            return;
        }

        label.classList.add('carousel__label--hidden');
        labelSwapTimeout = setTimeout(() => {
            setLabel();
            label.classList.remove('carousel__label--hidden');
        }, CAROUSEL_DURATION - LABEL_FADE);
    }

    function goTo(index) {
        activeIndex = ((index % total) + total) % total;
        render(true);
    }

    function startAutoplay() {
        stopAutoplay();
        if (reducedMotion) return;
        autoplayTimer = setInterval(() => goTo(activeIndex + 1), AUTOPLAY_INTERVAL);
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    cards.forEach((card, i) => {
        card.setAttribute('aria-label', sections[i].name);

        card.addEventListener('click', (event) => {
            event.preventDefault();

            if (i === activeIndex) {
                window.navigateWithFade(sections[i].href);
            } else {
                goTo(i);
                startAutoplay();
            }
        });
    });

    prevBtn.addEventListener('click', () => {
        goTo(activeIndex - 1);
        startAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        goTo(activeIndex + 1);
        startAutoplay();
    });

    label.addEventListener('click', (event) => {
        event.preventDefault();
        window.navigateWithFade(sections[activeIndex].href);
    });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', (event) => {
        if (!carousel.contains(event.relatedTarget)) startAutoplay();
    });

    carousel.addEventListener('touchstart', () => {}, { passive: true });

    render(false);
    startAutoplay();
})();
