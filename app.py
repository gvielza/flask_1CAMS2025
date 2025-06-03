from flask import Flask, request, render_template

app=Flask(__name__)

@app.route("/")
def hello():
    return "Hola"

@app.route("/<nombre>")
def saludo(nombre):
    return f"Bienvenido {nombre}"

@app.route('/post/<int:post_id>')
def show_post(post_id):
  return f'Post {post_id}'

@app.route('/login',methods=['GET', 'POST'])
def login():
    if request.method =='POST':
        return do_the_login()
    else:
        return show_the_login()
    

def show_the_login():
    return "Acá iríamos a login"

@app.route("/form")
def form():
    return render_template("form.html")