# html,css,javascript

[google canvas](https://g.co/gemini/share/5e1d62ea40c7)

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>動態摺疊選單 (Accordion) 元件</title>
    <style>
        /* 整體頁面樣式設定 */
        body {
            font-family: 'Inter', sans-serif; /* UI5: 使用清晰易讀的無襯線字體 */
            background-color: #f0f0f0; /* UI5: 淺灰色系背景 */
            padding: 20px;
            display: flex;
            justify-content: center; /* 居中對齊 */
            align-items: flex-start; /* 從頂部開始排列 */
            min-height: 100vh; /* 確保內容至少佔滿整個視窗高度 */
            margin: 0; /* 移除預設邊距 */
        }

        /* 摺疊選單容器樣式 */
        .accordion {
            width: 100%;
            max-width: 700px; /* 控制最大寬度，避免在寬螢幕上過寬 */
            border: 1px solid #ddd; /* 邊框 */
            border-radius: 8px; /* 圓角 */
            overflow: hidden; /* 隱藏超出邊界的內容，配合圓角 */
            background-color: #fff; /* UI4: 白色內容區域背景 */
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); /* 輕微陰影增加立體感 */
        }

        /* 每個摺疊項目樣式 */
        .accordion-item {
            border-bottom: 1px solid #eee; /* UI2: 項目之間有清晰的視覺分隔 */
        }

        /* 最後一個項目不顯示底部邊框 */
        .accordion-item:last-child {
            border-bottom: none;
        }

        /* 摺疊選單標題區域樣式 */
        .accordion-header {
            display: flex;
            justify-content: space-between; /* 標題和圖示分開兩側 */
            align-items: center;
            padding: 15px 20px;
            background-color: #f9f9f9; /* UI3: 標題區域背景色 */
            cursor: pointer; /* 指示可點擊 */
            font-weight: bold;
            color: #333; /* UI5: 深灰色文字 */
            transition: background-color 0.3s ease; /* 平滑過渡效果 */
            user-select: none; /* 防止文字被選取 */
        }

        /* 標題區域懸停效果 */
        .accordion-header:hover {
            background-color: #f1f1f1;
        }

        /* 標題區域展開時的樣式 */
        .accordion-header.active {
            background-color: #e0e0e0; /* UI3: 展開時的視覺提示 */
        }

        /* 指示圖示樣式 */
        .accordion-header .icon {
            font-size: 1.2em;
            transition: transform 0.3s ease; /* NFR3: 圖示旋轉動畫 */
            margin-left: 10px; /* 與標題文字的間距 */
            line-height: 1; /* 確保圖示垂直居中 */
            color: #666; /* 新增: 更改箭頭顏色為深灰色，對比適中 */
        }

        /* 圖示在展開狀態時旋轉 */
        .accordion-header.active .icon {
            transform: rotate(90deg); /* 修改: 將向右箭頭旋轉90度變成向下箭頭 */
        }

        /* 摺疊選單內容區域樣式 */
        .accordion-content {
            max-height: 0; /* 預設收合狀態，高度為0 */
            overflow: hidden; /* 隱藏溢出內容 */
            /* NFR3: 平滑的展開和收合動畫過渡效果 */
            transition: max-height 0.4s ease-out, padding 0.4s ease-out;
            padding: 0 20px; /* 預設收合時無內邊距 */
            background-color: #fff; /* UI4: 白色內容區域背景 */
            color: #555; /* UI4: 文字顏色與背景有足夠對比度 */
            line-height: 1.6; /* 增加行高以提高可讀性 */
            box-sizing: border-box; /* 確保 padding 不增加元素總寬度 */
        }

        /* 內容區域展開時的樣式 */
        .accordion-content.show {
            max-height: 500px; /* FR1: 展開時顯示內容，設定足夠大的高度 */
            padding: 15px 20px; /* 展開時的內邊距 */
        }

        /* 內容區域內部的文字和列表樣式 */
        .accordion-content p {
            margin-bottom: 10px;
        }

        .accordion-content p:last-child {
            margin-bottom: 0;
        }

        .accordion-content ul,
        .accordion-content ol {
            margin-top: 10px;
            margin-bottom: 10px;
            padding-left: 20px;
        }

        .accordion-content li {
            margin-bottom: 5px;
        }

        /* 響應式調整 (NFR1) */
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            .accordion {
                margin: 0; /* 在小螢幕上移除容器邊距 */
                border-radius: 0; /* 在小螢幕上移除圓角，使其佔滿寬度 */
            }
            .accordion-header, .accordion-content {
                padding: 12px 15px; /* 調整內邊距以適應小螢幕 */
            }
        }
    </style>
</head>
<body>
    <div class="accordion">
        <div class="accordion-item">
            <div class="accordion-header" role="button" aria-expanded="false" aria-controls="content1" tabindex="0">
                Title 1
                <span class="icon">&#9658;</span> </div>
            <div id="content1" class="accordion-content" role="region" aria-hidden="true">
                <p>Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.</p>
                <p>這是一個示範多段落長文的內容。摺疊選單的內容區域應能容納不同類型的內容，包括單行文字、多段落長文和列表。這有助於在有限的空間內有效地展示豐富的資訊。</p>
                <ul>
                    <li>列表項目一：這是第一個列表項目。</li>
                    <li>列表項目二：這是第二個列表項目，用於展示列表內容。</li>
                    <li>列表項目三：這是第三個列表項目。</li>
                </ul>
            </div>
        </div>

        <div class="accordion-item">
            <div class="accordion-header" role="button" aria-expanded="false" aria-controls="content2" tabindex="0">
                Title 2
                <span class="icon">&#9658;</span>
            </div>
            <div id="content2" class="accordion-content" role="region" aria-hidden="true">
                <p>第二個項目的內容。這可以是簡短的句子，也可以是更詳細的解釋。我們確保內容區域能夠靈活地適應各種資訊。</p>
            </div>
        </div>

        <div class="accordion-item">
            <div class="accordion-header" role="button" aria-expanded="false" aria-controls="content3" tabindex="0">
                Title 3
                <span class="icon">&#9658;</span>
            </div>
            <div id="content3" class="accordion-content" role="region" aria-hidden="true">
                <p>第三個摺疊項目的內容。它也被設計為靈活的，可以容納各種信息類型。</p>
            </div>
        </div>

        <div class="accordion-item">
            <div class="accordion-header" role="button" aria-expanded="false" aria-controls="content4" tabindex="0">
                Title 4
                <span class="icon">&#9658;</span>
            </div>
            <div id="content4" class="accordion-content" role="region" aria-hidden="true">
                <p>這是第四個項目的內容。您可以根據需要在此處添加任何相關資訊。</p>
            </div>
        </div>

        <div class="accordion-item">
            <div class="accordion-header" role="button" aria-expanded="false" aria-controls="content5" tabindex="0">
                Title 5
                <span class="icon">&#9658;</span>
            </div>
            <div id="content5" class="accordion-content" role="region" aria-hidden="true">
                <p>這是最後一個項目的內容。感謝您的測試！</p>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const accordionHeaders = document.querySelectorAll('.accordion-header');

            // FR3: 預設狀態 - 第一個摺疊項目應為展開狀態
            const firstHeader = accordionHeaders[0];
            const firstContent = firstHeader.nextElementSibling;
            firstHeader.classList.add('active');
            firstHeader.setAttribute('aria-expanded', 'true'); // NFR2: 更新 ARIA 屬性
            firstContent.classList.add('show');
            firstContent.setAttribute('aria-hidden', 'false'); // NFR2: 更新 ARIA 屬性

            accordionHeaders.forEach(header => {
                // FR1: 使用者應能透過點擊標題區域來展開或收合
                header.addEventListener('click', () => {
                    toggleAccordionItem(header);
                });

                // NFR2: 應可透過鍵盤進行操作 (Tab 鍵導航，Enter/Space 鍵觸發展開/收合)
                header.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault(); // 防止預設的滾動行為
                        toggleAccordionItem(header);
                    }
                });
            });

            /**
             * 切換摺疊項目的展開/收合狀態
             * @param {HTMLElement} header - 當前被點擊或鍵盤觸發的標題元素
             */
            function toggleAccordionItem(header) {
                const content = header.nextElementSibling; // 獲取對應的內容區域
                const isActive = header.classList.contains('active'); // 檢查當前是否為展開狀態

                // FR4: 單一展開模式 - 當一個項目被展開時，其他已展開的項目應自動收合
                if (!isActive) { // 如果當前項目是收合狀態（即將展開）
                    accordionHeaders.forEach(otherHeader => {
                        // 遍歷所有標題，如果不是當前標題且處於展開狀態，則收合它
                        if (otherHeader !== header && otherHeader.classList.contains('active')) {
                            const otherContent = otherHeader.nextElementSibling;
                            otherHeader.classList.remove('active');
                            otherHeader.setAttribute('aria-expanded', 'false'); // NFR2
                            otherContent.classList.remove('show');
                            otherContent.setAttribute('aria-hidden', 'true'); // NFR2
                        }
                    });
                }

                // FR1: 切換當前項目的展開/收合狀態
                header.classList.toggle('active');
                content.classList.toggle('show');

                // NFR2: 更新 ARIA 屬性以增強螢幕閱讀器等輔助技術的可用性
                header.setAttribute('aria-expanded', !isActive);
                content.setAttribute('aria-hidden', isActive);
            }
        });
    </script>
</body>
</html>
```