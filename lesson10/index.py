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

@app.route("/classes")
def classes():
    conn = psycopg2.connect(conn_string)
    with conn.cursor() as cur:
        sql = """
        SELECT DISTINCT "課程類別" FROM "進修課程";
        """
        cur.execute(sql)
        temps = cur.fetchall()
        kinds = [kind[0] for kind in temps]
        kinds.reverse()
    print(kinds)
    return render_template("classes.html.jinja2",kinds=kinds)

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

