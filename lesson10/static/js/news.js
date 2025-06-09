// JavaScript (複製貼上第 4.2 節的 JS)
document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-container .accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (!header) return;

        header.addEventListener('click', () => {
            const isCurrentlyOpen = item.classList.contains('is-open');

            if (!isCurrentlyOpen) {
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('is-open')) {
                        otherItem.classList.remove('is-open');
                        const otherHeader = otherItem.querySelector('.accordion-header');
                        if (otherHeader) {
                            otherHeader.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
            }

            if (isCurrentlyOpen) {
                item.classList.remove('is-open');
                header.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('is-open');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
});