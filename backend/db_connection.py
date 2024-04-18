import mysql.connector


def criar_conexao():
    conexao = mysql.connector.connect(
        user='humilde',
        password='pharma',
        host='localhost',
        database='pharma_database',
        charset="utf8mb4",
        collation="utf8mb4_unicode_ci"
    )
    return conexao


def criar_tabela():
    print('######## CRIOU ##########')
    conexao = criar_conexao()
    cursor = conexao.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS product(
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255),
            quantidade INT,
            preco FLOAT,
            descricao TEXT
        )
    ''')
    conexao.close()
