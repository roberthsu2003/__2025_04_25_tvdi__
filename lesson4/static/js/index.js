document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavigation = document.querySelector('.main-navigation');

    if (menuToggle && mainNavigation) {
        menuToggle.addEventListener('click', function() {
            // 切換 main-navigation 元素上的 'toggled' class
            mainNavigation.classList.toggle('toggled');

            // 切換 aria-expanded 屬性
            const isExpanded = mainNavigation.classList.contains('toggled');
            menuToggle.setAttribute('aria-expanded', isExpanded);

            // 可選：更改漢堡選單圖示 (例如：從漢堡變叉叉)
            if (isExpanded) {
                // menuToggle.innerHTML = '&times;'; // 叉叉圖示
            } else {
                // menuToggle.innerHTML = '&#9776;'; // 漢堡圖示
            }
        });
    }
});