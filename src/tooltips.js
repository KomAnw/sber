import { createPopperLite as createPopper, offset } from "@popperjs/core";

const popupOpts = [{
    // #id of the icon
    selector: "kubernetes-popup",
    // innerHtml of the popup / modal
    html: `Сервис для автоматизации развёртывания, масштабирования и управления приложениями на основе Kubernetes. <a class="tooltip-link" rel="noopener noreferrer" target="_self" href="https://sbercloud.ru/ru/products/cloud-container-engine">Подробнее</a>`
}, {
    selector: "functional-graph-popup",
    html: `Позволяет размещать и запускать код (функцию) в бессерверной среде. Запуск функции происходит на определенный пользователем триггер. <a class="tooltip-link" rel="noopener noreferrer" target="_self" href="https://sbercloud.ru/ru/products/functiongraph-serverless">Подробнее</a></span>`
}, {
    selector: 'api-gateway-popup',
    html: `Высокопроизводительный, полностью управляемый хостинг API, который помогает и упрощает публикацию, обслуживание, мониторинг, защиту и использование API в любых масштабах. В пару кликов вы можете внедрить системную интеграцию и значительно расширить функционал своего сервиса. <a class="tooltip-link" rel="noopener noreferrer" target="_self" href="https://sbercloud.ru/ru/products/api-gateway">Подробнее</a>`
}];

function createTooltip() {
    let currentHtml = null
    const tooltip = document.createElement('div');
    tooltip.classList.add('popup-tooltip');
    tooltip.innerHTML = `
        <div class="popup-tooltip--container">
            <div class="popup-tooltip--body-wrapper"></div>
        </div>
    `;
    const container = tooltip.querySelector('.popup-tooltip--body-wrapper');
    const updateHtml = newHtml => {
        container.innerHTML = newHtml;
        currentHtml = newHtml;
    }
    const hide = () => tooltip.style.display = 'none'
    const show = () => tooltip.style.display = '';

    return {
        element: tooltip,
        container,
        updateHtml,
        hide,
        show
    };
}

function initTooltips(baseWidth) {
    let popper = null;
    const tooltip = createTooltip();
    tooltip.hide();
    document.body.appendChild(tooltip.element);
    document.body.addEventListener('click', e => {
        if (e.target !== tooltip.container && popper) {
            tooltip.hide();
            popper.destroy();
            popper = null;
        }
    });

    popupOpts.forEach(options => {
        const icon = document.getElementById(options.selector);
        
        icon.addEventListener('click', async e => {
            if (window.innerWidth < baseWidth) { return; }
            if (popper && popper.state.elements.reference !== icon) {
                tooltip.hide();
                popper.destroy();
                popper = null;
            }
            if (!popper) {
                e.stopPropagation();
                tooltip.updateHtml(options.html);
                tooltip.show();
                popper = createPopper(icon, tooltip.element, {
                    placement: 'top',
                    modifiers: [
                        offset,
                        {
                          name: 'offset',
                          options: {
                            offset: [0, 10],
                          }
                        }
                    ]
                });
                popper.update();
            }
            // else destroyed in document.body.eventListener
        });

    });
}

function createModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal-tooltip');
    modal.innerHTML = `
        <div class="modal-tooltip--container">
            <button class="modal-tooltip--close">+</button>
            <div class="modal-tooltip--body-wrapper"></div>
        </div>
    `;
    const container = modal.querySelector('.modal-tooltip--body-wrapper');
    modal.classList.add('hidden');
    const close = () => modal.classList.add('hidden');
    modal.addEventListener('click', e => {
        if (e.target !== container) {
            close();
        }
    })

    return {
        element: modal,
        updateHtml: html => {
            container.innerHTML = html;
        },
        open: () => modal.classList.remove('hidden'),
        close
    };
}

function initModals(baseWidth) {
    const modal = createModal();
    document.body.appendChild(modal.element);
    popupOpts.forEach(options => {
        const icon = document.getElementById(options.selector);
        icon.addEventListener('click', () => {
            if (window.innerWidth >= baseWidth) { return; }
            modal.updateHtml(options.html);
            modal.open();
        });
    });
}


export default (baseWidth) => {
    if (isNaN(baseWidth)) {
        throw new Error("baseWidth is required");
    }
    initTooltips(baseWidth);
    initModals(baseWidth);
}
