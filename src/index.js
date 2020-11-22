import '../blocks/style.scss';

const baseWidth = 600;
const baseFontSize = 8;
const scaleRatio = 0.003125;
function scaleResizer(query) {
    const elemsToScale = document.querySelectorAll(query);
    if (elemsToScale.length === 0) {
        throw new Error('Not a single element was found');
    }
    function updateSize() {
        const scaleIndex = Math.min(innerWidth / baseWidth, 1);
        elem.style.fontSize = `${baseFontSize * scaleIndex}px`;
    }
    const elem = elemsToScale[0];
    window.addEventListener('resize', updateSize);
    updateSize();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('loaded');
    scaleResizer('html');
})