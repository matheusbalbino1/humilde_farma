from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from db_connection import criar_conexao, criar_tabela

app = Flask(__name__)
CORS(app)


@app.route('/api/produtos', methods=['GET'])
def obter_produtos():
    # CONECTAR AO BANCO DE DADOS, PEGAR OS PRODUTOS E RETORNAR OS PRODUTOS
    try:
        # Conectar ao banco de dados
        conexao = criar_conexao()
        cursor = conexao.cursor()

        # Executar uma consulta para obter os produtos (substitua isso pela sua própria consulta)
        cursor.execute("SELECT * FROM product")

        # Obter todos os resultados
        resultados = cursor.fetchall()

        # Construir uma lista de dicionários para representar os produtos
        produtos = [{'id': row[0], 'nome': row[1], 'quantidade': row[2],
                     'preco': row[3], 'descricao': row[4]} for row in resultados]

        # Configurar o cabeçalho de resposta para indicar UTF-8
        resposta = jsonify(produtos)
        resposta.headers['Content-Type'] = 'application/json; charset=utf-8'
        # Retornar os produtos como JSON
        return resposta
    except Exception as e:
        # Código 500 significa Internal Server Error
        return jsonify({"mensagem": f"Erro ao obter produtos: {str(e)}"}), 500
    finally:
        # Fechar o cursor e a conexão, independentemente de ter ocorrido um erro ou não
        cursor.close()
        conexao.close()

    if __name__ == '__main__':
        app.run(debug=True)


@app.route('/api/produtos', methods=['POST'])
def criar_produto():
    nome = request.json['nome']
    preco = request.json['preco']
    quantidade = request.json['quantidade']
    descricao = request.json['descricao']
    try:
        # Conectar ao banco de dados
        conexao = criar_conexao()
        cursor = conexao.cursor()

        # Inserir novo produto na tabela
        cursor.execute("INSERT INTO product (nome, preco, quantidade, descricao) VALUES (%s, %s, %s, %s)",
                       (nome, preco, quantidade, descricao))

        # Commit para salvar as alterações no banco de dados
        conexao.commit()

        # Retornar uma resposta de sucesso
        # Código 201 significa Created
        return jsonify({"mensagem": "Produto criado com sucesso!"}), 201
    except Exception as e:
        # Em caso de erro, fazer rollback e retornar mensagem de erro
        conexao.rollback()
        # Código 500 significa Internal Server Error
        return jsonify({"mensagem": f"Erro ao criar produto: {str(e)}"}), 500
    finally:
        # Fechar o cursor e a conexão, independentemente de ter ocorrido um erro ou não
        cursor.close()
        conexao.close()

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

    try:
        # Conectar ao banco de dados
        conexao = criar_conexao()
        cursor = conexao.cursor()

        # Inserir novo produto na tabela
        cursor.execute("UPDATE product SET nome=%s, preco=%s, quantidade=%s, descricao=%s WHERE id=%s",
                       (nome, preco, quantidade, descricao, id_do_produto))

        # Commit para salvar as alterações no banco de dados
        conexao.commit()

        # Retornar uma resposta de sucesso
        # Código 201 significa Created
        return jsonify({"mensagem": "Produto editado com sucesso!"}), 201
    except Exception as e:
        # Em caso de erro, fazer rollback e retornar mensagem de erro
        conexao.rollback()
        # Código 500 significa Internal Server Error
        return jsonify({"mensagem": f"Erro ao editar produto: {str(e)}"}), 500
    finally:
        # Fechar o cursor e a conexão, independentemente de ter ocorrido um erro ou não
        cursor.close()
        conexao.close()


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
    criar_tabela()
    app.run(debug=True)
