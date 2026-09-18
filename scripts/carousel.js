(function () {
    const sections = [
        { name: 'About me', href: 'pages/about.html' },
        { name: 'Web projects', href: 'pages/projects.html' },
        { name: 'iOS & Android', href: 'pages/ecosystem.html' },
        { name: 'Design system', href: 'pages/design.html' },
        { name: 'Social Impact', href: 'pages/impact.html' },
        { name: 'UX & Research', href: 'pages/research.html' },
        { name: 'Contact me', href: 'pages/contact.html' }
    ];

    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const cards = Array.from(carousel.querySelectorAll('.carousel__card'));
    const prevBtn = carousel.querySelector('.carousel__arrow--prev');
    const nextBtn = carousel.querySelector('.carousel__arrow--next');
    const label = carousel.querySelector('.carousel__label');
    const pageWrapper = document.querySelector('.page-wrapper');
    const total = cards.length;
    const NAVIGATION_DELAY = 300;
    const ROTATION_BY_LEVEL = { 0: 0, 1: 29.98, 2: 58.64, 3: 90 };
    const CAROUSEL_DURATION = 1100;
    const LABEL_FADE = 300;

    let activeIndex = 3;
    let labelSwapTimeout = null;

    function setLabel() {
        const active = sections[activeIndex];
        label.textContent = active.name;
        label.setAttribute('href', active.href);
    }

    function render(withTransition) {
        cards.forEach((card, i) => {
            let offset = i - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const level = Math.abs(offset);
            const rotation = Math.sign(offset) * ROTATION_BY_LEVEL[level];

            card.style.setProperty('--rotation', `${rotation}deg`);
            card.style.setProperty('--z', total - level);
            card.classList.toggle('carousel__card--active', offset === 0);
            card.classList.toggle('carousel__card--no-transition', !withTransition);

            if (offset === 0) {
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

    function navigateTo(href) {
        if (!pageWrapper) {
            window.location.href = href;
            return;
        }
        pageWrapper.classList.add('is-leaving');
        setTimeout(() => {
            window.location.href = href;
        }, NAVIGATION_DELAY);
    }

    prevBtn.addEventListener('click', () => goTo(activeIndex - 1));
    nextBtn.addEventListener('click', () => goTo(activeIndex + 1));

    cards.forEach((card) => {
        card.addEventListener('click', (event) => {
            const index = Number(card.dataset.index);
            event.preventDefault();

            if (index === activeIndex) {
                navigateTo(sections[index].href);
            } else {
                goTo(index);
            }
        });
    });

    label.addEventListener('click', (event) => {
        event.preventDefault();
        navigateTo(sections[activeIndex].href);
    });

    render(false);

    window.addEventListener('load', () => {
        goTo(0);
    });
})();
