from flask import Flask, jsonify, request, url_for
from products import getProducts as products
from markupsafe import escape
from flask_cors import CORS
from flask import send_from_directory
import os

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins":["http://127.0.0.1:5500"]}})

@app.before_request
def before_request_func():
    print("Antes de la peticion...")

@app.after_request
def after_request_func(response):
    print("Despues de la peticion...")
    return response

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "Pong!"})

@app.route('/products', methods=['GET'])
def getProducts():
    product_list = products()  # Llama a la función para obtener la lista de productos
    return jsonify({"products": product_list, "message": "List of products"})

@app.route('/products/<string:product_name>', methods=['GET'])
def getProduct(product_name):
    product_list = products()  # Llama a la función para obtener la lista de productos
    productsFound = [product for product in product_list if product['name'] == product_name]
    if (len(productsFound) > 0):
        return jsonify({"product": productsFound[0]})
    return jsonify({"message": "Product not found"})

@app.route('/query_string', methods=['GET'])
def query_string():
    print(request)
    print(request.query_string)
    print(request.args)
    print(request.args.get('page'))
    print(request.args.get('jhon'))
    print(request.args.get('pepe'))
    return 'OK'

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    app.add_url_rule('/query_string', view_func=query_string)
    # app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon.ico'))
    app.run(debug=True)