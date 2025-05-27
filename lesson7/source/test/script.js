// script.js
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.homes-for-you-section__carousel-track');
    const cards = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-arrow--next');
    const prevButton = document.querySelector('.carousel-arrow--prev');
    const paginationContainer = document.querySelector('.carousel-pagination');
    const wrapper = document.querySelector('.homes-for-you-section__carousel-wrapper');

    if (!track || !nextButton || !prevButton || !paginationContainer || !wrapper) {
        console.error("Carousel elements not found. Exiting script.");
        return;
    }
    
    let currentIndex = 0;
    let itemsPerPage = getItemsPerPage();
    let totalItems = cards.length;
    let totalPages = Math.ceil(totalItems / itemsPerPage);
    const gap = parseFloat(getComputedStyle(track).gap) || 30; // 從 CSS 獲取 gap 或預設值

    function getItemsPerPage() {
        if (window.innerWidth > 991.98) return 3; // 大螢幕
        if (window.innerWidth > 575.98) return 2; // 中螢幕
        return 1; // 小螢幕
    }

    function updateCarousel() {
        itemsPerPage = getItemsPerPage();
        totalPages = Math.ceil(totalItems / itemsPerPage);

        // 校正 currentIndex，如果超出範圍
        if (currentIndex >= totalPages) {
            currentIndex = Math.max(0, totalPages - 1);
        }
        
        const cardWidth = cards[0] ? cards[0].offsetWidth : 0; // 獲取單個卡片的實際寬度
        
        // 計算每 "頁" (或每組卡片) 的總寬度，包括間距
        // 一頁的寬度是 itemsPerPage 個卡片的寬度加上 (itemsPerPage - 1) 個間距
        // 滑動的量是 itemsPerPage 個卡片寬度 + itemsPerPage 個間距 (因為每個卡片後面都有個間距，除了最後一個整體)
        // 或者更簡單：滑動的量 = wrapper 的寬度 + 一個 gap (如果卡片填滿 wrapper)
        // 這裡我們假設卡片寬度是固定的，且 track 會滑動
        
        let slideOffset = 0;
        if (itemsPerPage === 1) {
            // 如果每頁一個項目，滑動量是一個卡片寬度 + 一個gap (如果卡片間有gap的話)
             slideOffset = cardWidth + gap;
        } else {
            // 如果每頁多個項目，滑動量是 wrapper 的寬度 + 一個gap (這是為了確保下一頁的第一個卡片從 wrapper 開始)
            // 但更精確的計算是基於 itemsPerPage * (cardWidth + gap)
            slideOffset = itemsPerPage * cardWidth + (itemsPerPage -1) * gap + gap;
            // 實際是 itemsPerPage 張卡片 + (itemsPerPage-1) 個內部 gap + 1 個外部 gap (分開頁面)
            // 因此是 itemsPerPage * (cardWidth + gap)
            // 如果 wrapper.offsetWidth 剛好是 itemsPerPage*cardWidth + (itemsPerPage-1)*gap，則滑動 wrapper.offsetWidth + gap
             slideOffset = wrapper.offsetWidth + gap; // 滑動整個可見區域寬度 + 一個間距
        }


        // 修正: 當 currentIndex 為 0 時，不應有偏移
        const totalShiftAmount = currentIndex * slideOffset;
        
        track.style.transform = `translateX(-${totalShiftAmount}px)`;
        
        updatePaginationDots();
        updateArrowVisibility();
    }

    function updatePaginationDots() {
        paginationContainer.innerHTML = ''; // 清空現有的點
        if (totalPages <= 1) return; // 如果只有一頁或沒有內容，則不顯示分頁點

        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-pagination__dot');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            if (i === currentIndex) {
                dot.classList.add('carousel-pagination__dot--active');
                dot.setAttribute('aria-current', 'true');
            }
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            paginationContainer.appendChild(dot);
        }
    }
    
    function updateArrowVisibility() {
        if (!prevButton || !nextButton) return;
        if (totalPages <= 1) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        } else {
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === totalPages - 1;
        }
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < totalPages - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    window.addEventListener('resize', () => {
        // 為了避免頻繁觸發，可以加入 debounce/throttle
        updateCarousel();
    });

    // 初始化
    if (totalItems > 0) {
        updateCarousel();
    } else {
        // 如果沒有卡片，隱藏導航和分頁
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
        if (paginationContainer) paginationContainer.style.display = 'none';
        console.warn("No property cards found in the carousel track.");
    }
});