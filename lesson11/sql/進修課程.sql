SELECT DISTINCT "課程類別" FROM "進修課程";

SELECT
    "課程名稱",
    "老師",
    "進修人數",
    "報名開始日期",
    "報名結束日期",
    "課程內容",
    "進修費用"
FROM
    "進修課程"
WHERE
    "課程類別" = '一般課程'
LIMIT 6;

