from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/produtos', methods=['GET'])
def obter_produtos():
    # CONECTAR AO BANCO DE DADOS, PEGAR OS PRODUTOS E RETORNAR OS PRODUTOS
    return jsonify("TESTE 231")


@app.route('/api/produtos', methods=['POST'])
def criar_produto():
    nome = request.json['nome']
    preco = request.json['preco']
    quantidade = request.json['quantidade']
    descricao = request.json['descricao']

    # CONECTAR AO BANCO DE DADOS, CRIAR UM NOVO PRODUTO E RETORNAR O PRODUTO
    return jsonify("TESTE 231")


@app.route('/api/produtos/<id>', methods=['PATCH'])
def alterar_produto(id):
    id_do_produto = id
    nome = request.json['nome']
    preco = request.json['preco']
    quantidade = request.json['quantidade']
    descricao = request.json['descricao']
    # CONECTAR AO BANCO DE DADOS E ALTERAR O PRODUTO

    return jsonify("TESTE 231")


@app.route('/api/produtos/<id>', methods=['DELETE'])
def deletar_produto(id):
    id_do_produto = id
    # CONECTAR AO BANCO DE DADOS E DELETAR O PRODUTO
    return jsonify("TESTE 231")


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/produtos')
def produtos():
    return render_template('produtos.html')


@app.route('/contato')
def contato():
    return render_template('contato.html')


@app.route('/sobre')
def sobre():
    return render_template('sobre.html')


if __name__ == '__main__':
    app.run(debug=True)
