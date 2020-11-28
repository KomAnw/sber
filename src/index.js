import tooltilsCreator from './tooltips';
import '../blocks/style.scss';

const baseWidth = 600;
const baseBigWidth = 1300;
const baseFontSize = 8;
const scaleRatio = 0.003125;

function scaleResizer(query) {
    const elemsToScale = document.querySelectorAll(query);
    if (elemsToScale.length === 0) {
        throw new Error('Not a single element was found');
    }
    function updateSize() {
        if (window.innerWidth < baseWidth) {
            const scaleIndex = window.innerWidth / baseWidth;
            elem.style.fontSize = `${baseFontSize * scaleIndex}px`;
        } else if (window.innerWidth < baseBigWidth) {
            const scaleIndex = Math.max(6 / 8, window.innerWidth / baseBigWidth);
            elem.style.fontSize = `${baseFontSize * scaleIndex}px`;
        } else {
            elem.style.fontSize = `${baseFontSize}px`;
        }
        
    }
    const elem = elemsToScale[0];
    window.addEventListener('resize', updateSize);
    updateSize();
}

document.addEventListener('DOMContentLoaded', () => {
    scaleResizer('html');
    tooltilsCreator(baseWidth);
});
