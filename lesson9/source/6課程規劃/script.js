document.addEventListener('DOMContentLoaded', () => {
    const tabContainer = document.querySelector('.tab-container');
    const tabs = document.querySelectorAll('.tab-item');

    // 預設選中第一個標籤 (如果 HTML 中已設定 active class，這部分可選)
    // if (tabs.length > 0) {
    //     tabs[0].classList.add('active');
    // }

    tabContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('tab-item')) {
            tabs.forEach(tab => tab.classList.remove('active'));
            event.target.classList.add('active');
        }
    });
});