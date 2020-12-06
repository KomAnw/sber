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

window.addEventListener("load", function(){ 
    var links = document.getElementsByTagName('a');

  Array.prototype.forEach.call(links, function (link) {
      if (link.href.indexOf("apply") > 0 && link.href.indexOf("#") < 0 && link.href.indexOf("docs") < 0) {
          link.href += location.search;
            link.firstElementChild.onclick = function() {
                dataLayer.push({'event':'registration_main'})
          }
      }
  });

})

const timeoutIds = [];
const arrayForAnimation = document.querySelectorAll('.animation');

const changeAnimationStatus = (elem) =>{
    if (ifElementInWiev(elem)) {
        setTimeout(()=>{
            elem.style.transition = "all 0.7s ease-out";
            elem.style.opacity = 1;
            elem.style.transform = `translate(0, 0)`
            timeoutIds.forEach(timer =>{
                if (timer.item === elem) {
                    clearInterval(timer.intId);
                }
            });
        }, 500, elem)
    }
}

const ifElementInWiev = (elem) => {
    const rect = elem.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;

    const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
};

arrayForAnimation.forEach(item=>{
    item.style.opacity = 0;
    item.style.transform = 'translate(0, 2rem)';
})

arrayForAnimation.forEach(item=>{
    const intId = setInterval(changeAnimationStatus, 200, item);
    timeoutIds.push({intId, item});
})