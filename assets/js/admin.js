(function () {
    const rowsWrap = document.getElementById('faal-slider-rows');
    const addButton = document.getElementById('faal-slider-add-row');
    const template = document.getElementById('faal-slider-template');

    if (!rowsWrap || !addButton || !template) {
        return;
    }

    const syncIndexes = () => {
        const cards = rowsWrap.querySelectorAll('[data-slide-row]');

        cards.forEach((card, index) => {
            const legend = card.querySelector('legend');
            if (legend) {
                legend.textContent = `Slide #${index + 1}`;
            }

            card.querySelectorAll('input, textarea').forEach((field) => {
                if (!field.name) {
                    return;
                }
                field.name = field.name.replace(/\[\d+\]/, `[${index}]`);
            });
        });
    };

    addButton.addEventListener('click', () => {
        const clone = template.content.firstElementChild.cloneNode(true);
        rowsWrap.appendChild(clone);
        syncIndexes();
    });

    rowsWrap.addEventListener('click', (event) => {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        const removeButton = target.closest('[data-remove-row]');
        if (!removeButton) {
            return;
        }

        const card = removeButton.closest('[data-slide-row]');
        if (card) {
            card.remove();
            syncIndexes();
        }
    });

    syncIndexes();
})();
