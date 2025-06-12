from flask import Flask,render_template,request
import os
from dotenv import load_dotenv
import psycopg2
from psycopg2 import OperationalError

# 載入 .env 檔案
load_dotenv()
conn_string = os.getenv('RENDER_DATABASE')

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html.jinja2")

@app.route("/classes")
def classes():
    # 從 URL 查詢參數獲取課程類型，預設為 '一般課程'
    # 這與 classes.html.jinja2 中的 url_for('classes', kind=kind) 相對應
    course_types = request.args.get('kind', '一般課程', type=str)
    conn = psycopg2.connect(conn_string)
    with conn.cursor() as cur:
        sql = """
        SELECT DISTINCT "課程類別" FROM "進修課程";
        """
        cur.execute(sql)
        temps = cur.fetchall()
        kinds = [kind[0] for kind in temps]
        kinds.reverse()

        sql_course = """
        SELECT
            "課程名稱",
            "群組",
            "進修人數",
            "進修時數",
            "進修費用",
            "上課時間",
            "課程開始日期"
        FROM
            "進修課程"
        WHERE
            "課程類別" = %s;
        """
        cur.execute(sql_course, (course_types,))
        course_data = cur.fetchall()
        page = request.args.get('page', 1, type=int)
        per_page = 6
        total = len(course_data)
        
        # 修正分頁總數計算，避免在項目剛好是 per_page 的倍數時產生多餘頁面
        total_pages = (total + per_page - 1) // per_page
        if total_pages == 0:
            total_pages = 1

        start = (page - 1) * per_page
        end = start + per_page
        items = course_data[start:end]  # 取得該頁資料

    # 將 current_kind 傳遞給模板，用於標記當前選中的課程類型
    return render_template("classes.html.jinja2",
                           kinds=kinds,
                           course_data=items,
                           page=page,
                           total_pages=total_pages,
                           current_kind=course_types)

@app.route("/new")
def new():
    try:
        conn = psycopg2.connect(conn_string)
        with conn.cursor() as cur:
            sql = """SELECT * FROM public.最新訊息
                     ORDER BY 上版日期 desc"""
            cur.execute(sql)
        # 取得所有資料
            rows = cur.fetchall()
            
        
    except OperationalError as e:
        print("連線失敗")
        print(e)
        return render_template("error.html.jinja2",error_message="資料庫錯誤"),500
    except:
        return render_template("error.html.jinja2",error_message="不知名錯誤"),500
    conn.close()
    return render_template("new.html.jinja2",rows=rows)

@app.route("/traffic")
def traffic():
    return render_template("traffic.html.jinja2")

@app.route("/contact")
def contact():
    return render_template("contact.html.jinja2")
