from flask import Flask, request, render_template, jsonify
from base_datos.conexion import Conexion

from flask_cors import CORS

app=Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return render_template("formulario.html")

@app.route("/formulario", methods=['POST','GET'])
def formulario():
    if request.method=='POST':
        conexion=Conexion("base_datos/base_datos.db")
        conexion.crear_tabla_cliente()
        dni=request.form['dni']
        usuario_form=request.form['usuario']
        contrasenna=request.form['password']
        conexion.agregar_cliente(dni, usuario_form,contrasenna)
        clientes=conexion.mostrar_clientes()
        conexion.cerrar_conexion()
        return render_template("resultados.html", dni=dni, usuario=usuario_form, clientes=clientes)
    return render_template('index.html')

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

@app.route('/api/enviar-datos', methods=['POST'])
def recibir_datos():
    """
    Este endpoint espera recibir un JSON con, por ejemplo, {'nombre': '...', 'email': '...'}.
    Luego podrías procesarlos (guardarlos en BD, enviarlos por email, etc.). 
    Aquí simplemente devolvemos un JSON de confirmación.
    """
    datos = request.get_json()  
    dni = datos.get('dni')
    usuario = datos.get('usuario')
    contrasenna = datos.get('contrasenna')
    
    mi_conexion=Conexion("base_datos/base_datos.db")
    mi_conexion.agregar_cliente(dni,usuario,contrasenna)
    mi_conexion.cerrar_conexion()
    return jsonify({
        'status': 'ok',
        'mensaje': f'Recibido dni={dni}, usuario={usuario}'
    }), 200
