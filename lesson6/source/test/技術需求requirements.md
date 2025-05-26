# 技術需求：房源推薦輪播區塊

## 1. 總體概述

本文件旨在詳細說明 "Homes For You" 房源推薦輪播區塊的 HTML 結構與 CSS 樣式技術需求。此區塊將作為一個獨立的組件，未來可手動整合至主要網頁中。

## 2. 功能需求

*   **房源展示**：以卡片形式展示推薦房源。
*   **輪播功能**：
    *   使用者可以透過左右導航箭頭切換顯示的房源卡片組。
    *   提供分頁指示點（dots）顯示目前所在的頁數以及總頁數，並允許點擊切換。
*   **響應式設計 (RWD)**：區塊佈局需能適應不同螢幕尺寸。

## 3. 技術規格

*   **HTML 結構**：語義化 HTML5。
*   **CSS 樣式**：
    *   使用 CSS Flexbox 或 Grid 進行佈局。
    *   樣式需獨立，避免與主要網頁樣式衝突 (可考慮 BEM 命名法或 CSS Modules 概念)。
    *   **註解**：所有 CSS 註解請使用 **繁體中文**。
*   **圖片**：
    *   房源圖片請使用假圖服務，例如 `https://via.placeholder.com/寬x高`。
    *   卡片圖片建議尺寸：寬度約 350px，高度約 230px (可依實際設計調整)。
*   **圖標 (Icons)**：
    *   地點、床、浴室、面積等圖標，可使用 Font Awesome 或 SVG 圖標。在此需求中，可暫時使用文字示意，或預留 class 給未來圖標庫。

## 4. 區塊細節

### 4.1. 整體區塊 (`homes-for-you-section`)

*   **容器**：
    *   背景色：淺灰色 (類似圖片所示，例如 `#F8F9FA` 或透明，依賴父層背景)。
    *   內邊距 (Padding)：上下約 `60px`，左右隨 RWD 調整。
    *   最大寬度：約 `1140px` (或依主要網站容器寬度設定)，並水平置中。

### 4.2. 標題區域 (`homes-for-you-section__header`)

*   **主標題 (`homes-for-you-section__title`)**：
    *   文字內容："Homes For You"
    *   樣式：字體較大、加粗、深灰色。
    *   置中顯示。
*   **副標題 (`homes-for-you-section__subtitle`)**：
    *   文字內容："Based on your view history"
    *   樣式：字體較小、一般粗細、灰色。
    *   置中顯示，位於主標題下方，有適當間距。

### 4.3. 輪播容器 (`homes-for-you-section__carousel-wrapper`)

*   包含輪播內容、導航箭頭。
*   `overflow: hidden;` 以隱藏超出範圍的卡片。
*   相對定位，以便絕對定位導航箭頭。

### 4.4. 輪播軌道 (`homes-for-you-section__carousel-track`)

*   使用 Flexbox (`display: flex;`) 排列房源卡片。
*   透過 `transform: translateX()` 實現輪播效果 (JavaScript 控制)。
*   卡片間有固定間距 (Gap)，例如 `20px` 或 `30px`。

### 4.5. 房源卡片 (`property-card`) - 重複單元

每個卡片包含以下元素：

*   **卡片容器 (`property-card__container`)**:
    *   背景色：白色。
    *   圓角：`8px` 或 `10px`。
    *   陰影：輕微的 box-shadow。
*   **圖片區域 (`property-card__image-wrapper`)**:
    *   相對定位，以便放置標籤。
    *   `img` 標籤：`src` 使用假圖 URL。
        *   `alt` 屬性：房源名稱。
        *   圓角 (僅上方)：與卡片容器一致。
    *   **狀態標籤 (`property-card__status-badge`)**:
        *   例如 "FOR SALE", "FOR RENT"。
        *   絕對定位於圖片左上角或右上角。
        *   背景色：深綠色 (FOR SALE/RENT) 或 黃色 (FEATURED)。
        *   文字顏色：白色。
        *   內邊距、圓角。
        *   可有多個標籤，例如 "FOR SALE" 和 "FEATURED" 同時存在。
*   **內容區域 (`property-card__content`)**:
    *   內邊距：約 `20px`。
*   **房源名稱 (`property-card__name`)**:
    *   文字：例如 "Skyper Pool Apartment"。
    *   樣式：字體大小適中、加粗、深灰色。
*   **價格 (`property-card__price`)**:
    *   文字：例如 "$280,000" 或 "$250 /month"。
    *   樣式：顯眼的顏色 (例如橘紅色)、字體稍大、加粗。
    *   靠右對齊 (或與房源名稱在同一行，價格靠右)。
*   **地點 (`property-card__location`)**:
    *   包含圖標和文字。
    *   圖標：地點圖標 (可暫用文字 `[地標]` )。
    *   文字：例如 "1020 Bloomingdale Ave"。
    *   樣式：灰色文字、圖標與文字垂直對齊。
*   **房源規格列表 (`property-card__specs`)**:
    *   使用 Flexbox 排列。
    *   每個規格項 (`property-card__spec-item`):
        *   包含圖標和文字。
        *   例如：
            *   `[床圖標]` 4 Beds
            *   `[浴室圖標]` 2 Baths
            *   `[面積圖標]` 450 sqft
        *   樣式：灰色文字、圖標與文字垂直對齊、項目間有適當間距。

### 4.6. 導航箭頭

*   **左箭頭 (`carousel-arrow carousel-arrow--prev`)**:
    *   絕對定位於輪播容器左側中間。
    *   樣式：圓形或方形按鈕，背景色，箭頭圖標 (可使用 `<` 或 SVG)。
*   **右箭頭 (`carousel-arrow carousel-arrow--next`)**:
    *   絕對定位於輪播容器右側中間。
    *   樣式：同左箭頭，箭頭圖標 (可使用 `>` 或 SVG)。
    *   在 RWD 佈局中，箭頭可能需要調整位置或大小。

### 4.7. 分頁指示點 (`carousel-pagination`)

*   位於輪播內容下方，水平置中。
*   由多個小圓點 (`carousel-pagination__dot`) 組成。
*   當前頁對應的圓點有不同樣式 (`carousel-pagination__dot--active`)，例如顏色更深或更大。

## 5. 響應式設計 (RWD) 中斷點

*   **大螢幕 (Desktop, > 992px)**:
    *   預計顯示 3 張房源卡片。
    *   輪播容器內邊距適中。
*   **中螢幕 (Tablet, 576px - 991px)**:
    *   預計顯示 2 張房源卡片。
    *   輪播容器內邊距可能需要調整。
    *   導航箭頭大小/位置可能調整。
*   **小螢幕 (Mobile, < 576px)**:
    *   預計顯示 1 張房源卡片。
    *   卡片寬度接近 100% (減去左右邊距)。
    *   導航箭頭可能更小，或移至卡片下方。
    *   標題字體大小等可適當縮小。

## 6. 預期產出

*   一個 HTML 檔案，包含 "Homes For You" 區塊的結構。
*   一個 CSS 檔案，包含對應的樣式，並使用繁體中文註解。
*   JavaScript 輪播邏輯**非**此次產出範圍，但 HTML/CSS 結構需能支援 JS 操作。

## 7. 範例假圖 URL

*   `https://via.placeholder.com/350x230/CCCCCC/969696?text=Property+Image` (灰色背景，深灰文字)
*   `https://via.placeholder.com/350x230/A9A9A9/FFFFFF?text=房產圖片` (深灰背景，白色文字)

## 8. 注意事項

*   此需求專注於靜態 HTML 結構與 CSS 樣式。
*   顏色的具體色碼，若圖片中不明顯，可選用接近的通用網頁安全色。
*   字體族群可先使用通用無襯線字體 (e.g., `sans-serif`)。