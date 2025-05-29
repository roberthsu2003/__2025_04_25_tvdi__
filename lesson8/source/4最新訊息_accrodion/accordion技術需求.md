# Accordion 技術需求規格

## 1. 總覽

本文件定義了基於 `accordion.png` 圖片所示設計的 HTML、CSS 和 JavaScript 技術需求。
此組件將用於顯示從資料庫獲取的最新訊息，並具備以下特點：

-   Accordion (手風琴) 效果。
-   每個項目同時顯示標題 (title) 和日期 (date)。
-   預設展開第一個項目。
-   標題內容可能為多行。
-   內容區域將有固定的高度（或限制顯示行數）。
-   未來將整合至 Jinja 模板。
-   提供一個基本測試頁面。

## 2. HTML 結構

### 2.1. 基本結構

```html
<div class="accordion-container">
    <!-- Accordion Item 1 (預設展開) -->
    <div class="accordion-item is-open">
        <button class="accordion-header" aria-expanded="true" aria-controls="accordion-content-1" id="accordion-header-1">
            <span class="accordion-title">這是第一個項目的標題，這個標題可能會非常長，甚至會換行顯示。</span>
            <span class="accordion-date">2023-10-26</span>
        </button>
        <div class="accordion-content" role="region" aria-labelledby="accordion-header-1" id="accordion-content-1">
            <p>這是第一個項目的內容。內容將被限制在固定的高度內，多餘的內容將被隱藏或以其他方式處理。</p>
        </div>
    </div>

    <!-- Accordion Item 2 -->
    <div class="accordion-item">
        <button class="accordion-header" aria-expanded="false" aria-controls="accordion-content-2" id="accordion-header-2">
            <span class="accordion-title">這是第二個項目的標題</span>
            <span class="accordion-date">2023-10-25</span>
        </button>
        <div class="accordion-content" role="region" aria-labelledby="accordion-header-2" id="accordion-content-2">
            <p>這是第二個項目的內容。</p>
        </div>
    </div>

    <!-- 更多 Accordion Items... -->
</div>
```

### 2.2. Jinja 模板整合考量

未來使用 Jinja 模板時，結構可以這樣表示：

```html
<div class="accordion-container">
    {% for item in items %}
    <div class="accordion-item {% if loop.first %}is-open{% endif %}">
        <button class="accordion-header" aria-expanded="{% if loop.first %}true{% else %}false{% endif %}" aria-controls="accordion-content-{{ loop.index }}" id="accordion-header-{{ loop.index }}">
            <span class="accordion-title">{{ item.title }}</span>
            <span class="accordion-date">{{ item.date }}</span>
        </button>
        <div class="accordion-content" role="region" aria-labelledby="accordion-header-{{ loop.index }}" id="accordion-content-{{ loop.index }}">
            <p>{{ item.content }}</p>
        </div>
    </div>
    {% endfor %}
</div>
```

### 2.3. HTML 元素說明

-   `.accordion-container`: Accordion 的主容器。
-   `.accordion-item`: 單個 accordion 項目。
    -   `is-open`: 用於標識當前展開的項目 (由 CSS 和 JS 控制)。
-   `.accordion-header`: 每個項目的頭部，作為點擊觸發器。
    -   應為 `<button>` 元素以確保可訪問性。
    -   `aria-expanded`: 指示內容面板是否展開。
    -   `aria-controls`: 指向其控制的內容面板 ID。
    -   `id`: 唯一標識符，用於 `aria-labelledby`。
-   `.accordion-title`: 顯示標題文字。
-   `.accordion-date`: 顯示日期。
-   `.accordion-content`: 包含項目內容的面板。
    -   `role="region"`: 標識為一個區域。
    -   `aria-labelledby`: 指向其關聯的頭部 ID。
    -   `id`: 唯一標識符，用於 `aria-controls`。
    -   CSS 將根據 `.is-open` 類來控制內容的顯示與隱藏。

## 3. CSS 樣式

### 3.1. 基本樣式

```css
/* 基本容器和項目樣式 */
.accordion-container {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: Arial, sans-serif;
}

.accordion-item {
    border-bottom: 1px solid #eee;
}

.accordion-item:last-child {
    border-bottom: none;
}

/* 頭部樣式 */
.accordion-header {
    background-color: #f7f7f7;
    color: #333;
    cursor: pointer;
    padding: 15px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    font-size: 16px;
    display: flex; /* 使用 flexbox 來排列 title 和 date */
    justify-content: space-between; /* title 和 date 分散對齊 */
    align-items: center; /* 垂直居中 */
    transition: background-color 0.3s ease;
}

.accordion-header:hover {
    background-color: #e9e9e9;
}

.accordion-header .accordion-title {
    flex-grow: 1; /* 標題佔據多餘空間 */
    margin-right: 10px; /* 與日期之間留點間距 */
    /* 允許多行標題 */
    white-space: normal; 
    word-wrap: break-word;
}

.accordion-header .accordion-date {
    font-size: 0.9em;
    color: #666;
    white-space: nowrap; /* 日期不換行 */
}

/* 展開狀態的頭部樣式 (可選) */
.accordion-item.is-open .accordion-header {
    background-color: #e0e0e0;
}

/* 可選：加入展開/收合圖標 */
.accordion-header::after {
    content: '+'; /* 預設為加號 */
    font-size: 1.2em;
    color: #777;
    margin-left: 10px;
    transition: transform 0.3s ease;
}

.accordion-item.is-open .accordion-header::after {
    content: '-'; /* 展開時為減號 */
    transform: rotate(180deg);
}

/* 內容面板樣式 */
.accordion-content {
    padding: 0 15px; /* 左右 padding, 上下由 max-height 和 is-open 控制 */
    background-color: white;
    overflow: hidden; 
    max-height: 0; /* 預設隱藏 */
    transition: max-height 0.3s ease-out, padding-top 0.3s ease-out, padding-bottom 0.3s ease-out;
}

.accordion-item.is-open .accordion-content {
    max-height: 150px; /* 展開時的最大高度，根據實際內容調整 */
    padding-top: 15px;
    padding-bottom: 15px;
}

.accordion-content p {
    margin: 0 0 10px 0;
    line-height: 1.6;
}
.accordion-content p:last-child {
    margin-bottom: 0;
}
```

### 3.2. 樣式說明

-   `.accordion-header`: 使用 Flexbox 佈局，使 `title` 和 `date` 能夠良好地並排顯示，且 `title` 可以佔據剩餘空間。
-   `.accordion-title`: 允許 `white-space: normal` 和 `word-wrap: break-word` 以支持多行標題。
-   `.accordion-content`:
    -   初始狀態 `max-height: 0; padding-top: 0; padding-bottom: 0; overflow: hidden;` 使其收合。
    -   `.is-open .accordion-content` 透過設定 `max-height` (例如 `150px`，應根據內容調整) 和 `padding-top/bottom` 來展開內容。
    -   `transition` 屬性使展開和收合具有平滑動畫效果。
    -   註解中提供了使用 `-webkit-line-clamp` 限制行數的方法，但需注意其瀏覽器兼容性。若要嚴格控制行數並有更好的兼容性，可能需要 JavaScript 輔助截斷文字。
-   `.is-open` class: 用於控制展開項目的樣式。
-   `::after` 偽元素: 用於在頭部右側顯示 `+` / `-` 圖標，指示展開/收合狀態，並帶有旋轉動畫。

## 4. JavaScript 功能

### 4.1. 功能需求

-   點擊 `.accordion-header` 時，切換對應 `.accordion-content` 的顯示/隱藏。
-   同時只允許一個 `.accordion-item` 展開。點擊一個項目時，其他已展開的項目應收合。
-   頁面載入時，第一個 `.accordion-item` 預設為展開狀態 (透過 HTML class `is-open` 和 `aria-expanded="true"` 實現)。
-   更新相關的 ARIA 屬性 (`aria-expanded`)。

### 4.2. 參考實作

```javascript
document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-container .accordion-item');

    // 預設展開第一個項目:
    // HTML 結構中第一個項目應已包含 'is-open' class 和 aria-expanded="true"。
    // CSS 會根據 'is-open' 處理初始顯示狀態 (max-height, padding)。
    // 如果需要 JS 強制設定 (例如 HTML 未預設)，可以這樣做：
    /*
    const firstItem = accordionItems[0];
    if (firstItem && !firstItem.classList.contains('is-open')) {
        firstItem.classList.add('is-open');
        const firstHeader = firstItem.querySelector('.accordion-header');
        if (firstHeader) {
            firstHeader.setAttribute('aria-expanded', 'true');
        }
    }
    */

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (!header) return; // 防禦性檢查

        header.addEventListener('click', () => {
            const isCurrentlyOpen = item.classList.contains('is-open');

            // 如果點擊的項目即將展開，則先關閉所有其他已展開的項目
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

            // 切換當前點擊的項目狀態
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
```

### 4.3. JavaScript 說明

-   `DOMContentLoaded`: 確保在 DOM 完全載入和解析後再執行腳本。
-   選取容器內所有的 `.accordion-item`。
-   **預設展開第一個項目**: 最佳實踐是在 HTML 中直接為第一個項目添加 `is-open` class 和 `aria-expanded="true"` 屬性。CSS 會自動處理其初始展開狀態。JS 部分的註解提供了備用方案。
-   為每個 `.accordion-header` 添加點擊事件監聽器。
-   **單一展開邏輯**:
    -   當一個 header 被點擊時，首先檢查它是否即將被展開 (`!isCurrentlyOpen`)。
    -   如果是，則遍歷所有其他 accordion 項目，關閉任何已打開的項目（移除 `is-open` class，更新 `aria-expanded`）。
    -   然後，切換當前點擊項目的 `is-open` class 和其 header 的 `aria-expanded` 屬性。
-   CSS 的 `transition` 屬性會處理展開和收合的動畫效果。

## 5. 基本測試頁面 (`test_accordion.html`)

為了方便測試，可以創建一個包含基本 HTML 結構、CSS 和 JavaScript 的頁面。

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accordion 測試頁面</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 20px;
            background-color: #f0f0f0;
        }
        .page-container { /* Renamed from 'container' to avoid conflict if accordion is placed in a generic 'container' */
            max-width: 700px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        /* --- Accordion CSS (複製貼上第 3.1 節的 CSS) --- */
        .accordion-container {
            width: 100%;
            border: 1px solid #ccc;
            border-radius: 4px;
            /* font-family: Arial, sans-serif; /* Already set on body */
        }

        .accordion-item {
            border-bottom: 1px solid #eee;
        }

        .accordion-item:last-child {
            border-bottom: none;
        }

        .accordion-header {
            background-color: #f7f7f7;
            color: #333;
            cursor: pointer;
            padding: 15px;
            width: 100%;
            text-align: left;
            border: none;
            outline: none;
            font-size: 16px;
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            transition: background-color 0.3s ease;
        }

        .accordion-header:hover {
            background-color: #e9e9e9;
        }

        .accordion-header .accordion-title {
            flex-grow: 1; 
            margin-right: 10px; 
            white-space: normal; 
            word-wrap: break-word;
        }

        .accordion-header .accordion-date {
            font-size: 0.9em;
            color: #666;
            white-space: nowrap; 
        }

        .accordion-item.is-open .accordion-header {
            background-color: #e0e0e0;
        }

        .accordion-header::after {
            content: '+'; 
            font-size: 1.2em;
            color: #777;
            margin-left: 10px;
            transition: transform 0.3s ease;
        }

        .accordion-item.is-open .accordion-header::after {
            content: '-'; 
            transform: rotate(180deg);
        }
        
        .accordion-content {
            padding: 0 15px; 
            background-color: white;
            overflow: hidden; 
            max-height: 0; 
            transition: max-height 0.3s ease-out, padding-top 0.3s ease-out, padding-bottom 0.3s ease-out;
        }
        
        .accordion-item.is-open .accordion-content {
            max-height: 150px; /* Adjust as needed for content */
            padding-top: 15px;
            padding-bottom: 15px;
        }

        .accordion-content p {
            margin: 0 0 10px 0;
            line-height: 1.6;
        }
        .accordion-content p:last-child {
            margin-bottom: 0;
        }
        /* --- End Accordion CSS --- */
    </style>
</head>
<body>

    <div class="page-container">
        <h1>最新訊息 Accordion</h1>

        <div class="accordion-container">
            <!-- Accordion Item 1 (預設展開) -->
            <div class="accordion-item is-open">
                <button class="accordion-header" aria-expanded="true" aria-controls="accordion-content-1" id="accordion-header-1">
                    <span class="accordion-title">重要通知：系統維護公告，影響範圍包括用戶登入與資料查詢功能，請提前做好準備</span>
                    <span class="accordion-date">2024-07-30</span>
                </button>
                <div class="accordion-content" role="region" aria-labelledby="accordion-header-1" id="accordion-content-1">
                    <p>親愛的用戶您好，為提升服務品質，本系統將於 2024年8月5日 凌晨 02:00 至 04:00 進行系統維護作業。維護期間，用戶登入、資料查詢及部分相關服務將暫停使用。建議您提前完成重要操作，若有不便之處，敬請見諒。感謝您的理解與配合。</p>
                    <p>這是第二段內容，測試固定高度下的顯示情況。</p>
                </div>
            </div>

            <!-- Accordion Item 2 -->
            <div class="accordion-item">
                <button class="accordion-header" aria-expanded="false" aria-controls="accordion-content-2" id="accordion-header-2">
                    <span class="accordion-title">新功能上線：個人化報表產生器</span>
                    <span class="accordion-date">2024-07-28</span>
                </button>
                <div class="accordion-content" role="region" aria-labelledby="accordion-header-2" id="accordion-content-2">
                    <p>我們很高興地宣布，個人化報表產生器現已正式上線！您可以根據需求自訂報表欄位與篩選條件，輕鬆獲取所需數據分析結果。歡迎立即體驗！</p>
                </div>
            </div>

            <!-- Accordion Item 3 -->
            <div class="accordion-item">
                <button class="accordion-header" aria-expanded="false" aria-controls="accordion-content-3" id="accordion-header-3">
                    <span class="accordion-title">客戶服務滿意度調查</span>
                    <span class="accordion-date">2024-07-25</span>
                </button>
                <div class="accordion-content" role="region" aria-labelledby="accordion-header-3" id="accordion-content-3">
                    <p>為持續改進我們的服務，誠摯邀請您參與本次客戶服務滿意度調查。您的寶貴意見將是我們進步的動力。調查問卷連結：[連結]</p>
                    <p>此處內容較少，測試不同內容長度下的顯示。</p>
                    <p>多一行看看。</p>
                    <p>再多一行。</p>
                    <p>又多一行。</p>
                    <p>最後一行，應該會被截斷或出現滾動條（如果 max-height 設定較小且 overflow: auto）。目前設定是 overflow: hidden。</p>
                </div>
            </div>
        </div>
    </div>

    <script>
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
    </script>

</body>
</html>
```

## 6. 注意事項與未來擴展

-   **內容截斷**: CSS 的 `max-height` 和 `overflow: hidden` 會直接截斷超出高度的內容。如果需要更優雅的文字截斷（例如顯示 "..."），可以考慮：
    -   CSS `text-overflow: ellipsis` 配合 `white-space: nowrap` 和 `overflow: hidden` (適用於單行)。
    -   CSS `-webkit-line-clamp` (多行，但有兼容性問題)。
    -   JavaScript 截斷：在 JS 中計算內容高度或行數，並在超出時截斷文字並添加 "閱讀更多" 鏈接。
-   **可訪問性 (Accessibility)**:
    -   已使用 `button`、`aria-expanded`、`aria-controls`、`aria-labelledby`、`role="region"`。
    -   確保鍵盤導航友好：`button` 元素本身是可聚焦和可通過 Enter/Space 鍵激活的。
-   **性能**: 如果 accordion 項目非常多，可以考慮事件委託 (event delegation) 來優化性能，將事件監聽器綁定到 `.accordion-container` 而不是每個 `.accordion-header`。
-   **Jinja 整合**:
    -   確保後端傳遞的資料結構 (`items` 列表，每個 `item` 包含 `title`, `date`, `content`) 與模板中的變數名一致。
    -   唯一 ID (`accordion-content-{{ loop.index }}`, `accordion-header-{{ loop.index }}`) 的生成對於 ARIA 屬性至關重要。
-   **`max-height` 調整**: CSS 中 `.accordion-item.is-open .accordion-content` 的 `max-height` 值 (示例中為 `150px`) 應根據實際內容的最大預期高度進行調整，以確保內容能完整顯示。如果內容高度變化很大，可能需要動態計算此值，或者設置一個足夠大的通用值。

This markdown file, `accordion技術需求.md`, should now be in the specified path and contain all the requested details.