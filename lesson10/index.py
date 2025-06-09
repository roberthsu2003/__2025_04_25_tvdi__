from flask import Flask,render_template
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

@app.route("/classes",defaults={'course_types':'一般課程'})
@app.route("/classes/<course_types>")
def classes(course_types):
    print(course_types)
    conn = psycopg2.connect(conn_string)
    with conn.cursor() as cur:
        sql = """
        SELECT DISTINCT "課程類別" FROM "進修課程";
        """
        cur.execute(sql)
        temps = cur.fetchall()
        kinds = [kind[0] for kind in temps]
        kinds.reverse()

        sql_course = f"""
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
            "課程類別" = '{course_types}'
        LIMIT 6;
        """
        cur.execute(sql_course)
        course_data = cur.fetchall()
        print(course_data)

    return render_template("classes.html.jinja2",kinds=kinds,course_data=course_data)

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

