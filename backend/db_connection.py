import mysql.connector

def criar_conexao():
    conexao = mysql.connector.connect(
        user = 'humilde',
        password= 'pharma',
        host = 'localhost',
        database = 'pharma_database',
        charset="utf8mb4",
        collation="utf8mb4_unicode_ci"
    )
    return conexao
    