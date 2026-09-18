(function () {
    const DESIGN_WIDTH = 1382;

    const wrapper = document.querySelector('.page-wrapper');
    if (!wrapper) return;

    function fitToViewport() {
        const scale = window.innerWidth / DESIGN_WIDTH;
        wrapper.style.transform = `scale(${scale})`;
    }

    fitToViewport();
    window.addEventListener('resize', fitToViewport);
})();
