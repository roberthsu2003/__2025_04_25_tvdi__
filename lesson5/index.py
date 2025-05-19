from flask import Flask,render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html.jinja2")

@app.route("/classes")
def classes():
    return render_template("classes.html.jinja2")

@app.route("/product")
def product():
    return "<h1>product!</h1><p>這是我的第3頁</p>"

