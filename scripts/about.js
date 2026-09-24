(function () {
    const toggle = document.querySelector('.experience__toggle');
    if (!toggle) return;

    const extraJobs = document.querySelectorAll('.job[data-extra]');
    const label = toggle.querySelector('.experience__toggle-text');

    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';

        extraJobs.forEach((job) => {
            job.hidden = expanded;
        });

        toggle.setAttribute('aria-expanded', String(!expanded));
        label.textContent = expanded ? 'View all' : 'View less';
    });
})();
