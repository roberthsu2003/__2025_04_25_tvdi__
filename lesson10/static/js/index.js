document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavigation = document.querySelector('.main-navigation');

    if (menuToggle && mainNavigation) {
        menuToggle.addEventListener('click', function() {
            mainNavigation.classList.toggle('toggled'); // 切換 .toggled class
            const isExpanded = mainNavigation.classList.contains('toggled');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
});