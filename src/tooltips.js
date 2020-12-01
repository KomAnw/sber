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
}, {
    selector: "graph-engine-popup",
    html: `Первая в Китае коммерческая автономная распределенная система графов с независимыми правами на интеллектуальную собственность. <a class="link-1 external-link" rel="noopener noreferrer" target="_self" href="https://sbercloud.ru/ru/products/graph-engine-service-ges">Подробнее</a>`
}, {
    selector: "document-database-popup",
    html: `Предоставляет собой сервис управления документоориентированной базой данных, полностью совместимой с MongoDB. <a class="link-1 external-link" rel="noopener noreferrer" target="_self" href="https://sbercloud.ru/ru/products/document-database-service-mongodb">Подробнее</a>`
}, {
    selector: "distributed-cache-popup",
    html: `Высокопроизводительный распределенный сервис кэширования данных в памяти. <br /> <a class="link-1 external-link" rel="noopener noreferrer" target="_self" href="https://sbercloud.ru/ru/products/distributed-cache-service-for-memcached">For Memcached</a> <br /> <a class="link-1 external-link" rel="noopener noreferrer" target="_self" href="https://sbercloud.ru/ru/products/distributed-cache-service-for-redis">For Redis</a>`
}, {
    selector: "relational-database-popup",
    html: `Сервис управления реляционными базами данных. <a class="link-1 external-link" rel="noopener noreferrer" target="_self" href="https://sbercloud.ru/ru/products/relational-databases-service">Подробнее</a>`
}, {
    selector: "best-startup",
    html: `100 000 р. грант на облачные услуги SberCloud для действующих компаний (выдается только на юр. лицо или ИП)`
}, {
    selector: "best-dev",
    html: `Квадрокоптер DJI Mavic Mini Fly More Combo`
}, {
    selector: "special-price",
    html: `Фирменный мерч Школы 21`
}, {
    selector: "special-nomination",
    html: `Подробности будут объявлены отдельно`
}, {
    selector: "grants-sber",
    html: `Гранты на использование SberCloud.Advanced всем командам, прошедшим отбор на хакатон`
}, {
    selector: "merch-package",
    html: `Всем, кто презентует свои решения жюри`
}, {
    selector: "online-promo",
    html: `Всем, кто принимает участие в онлайн-активностях`
}, {
    selector: "promo-delivery",
    html: `После прохождения чек-поинтов`
}, {
    selector: "hakaton-about",
    html: `Хакатон - командное соревнование для программистов, дизайнеров и менеджеров, решающих в короткие сроки социальную или бизнес-задачу.`
}, {
    selector: "can-i",
    html: `В хакатоне могут принять участие команды от 3 до 5 человек. Одному человеку крайне непросто закрыть все необходимые компетенции.`
}, {
    selector: "what-todo",
    html: `Детально заполните форму в системе регистрации, предоставьте всю необходимую информацию, загрузите свое резюме (по желанию). Чем подробнее вы заполните анкету и точнее расскажете о себе, тем больше у вас шансов. Если вы читаете это, у вас определенно есть что рассказать!`
}, {
    selector: "i-new",
    html: `Конечно! <br/> Команде хакатона требуются разные роли: менеджеры, питчеры, дизайнеры и маркетологи. Если у вас есть опыт в каком-либо вопросе, это может пригодиться. Просто зарегистрируйтесь и опишите свой опыт - наверняка вы можете быть полезны одной из команд.`
}, {
    selector: "answer-todo",
    html: `Напишите нам в <a class="link-1 external-link" rel="noopener noreferrer" target="_self" href="https://t.me/joinchat/CN0_CRu4NI1L0DStXsp_dw">чат хакатона</a> - будем рады ответить на вопросы и помочь.`
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
