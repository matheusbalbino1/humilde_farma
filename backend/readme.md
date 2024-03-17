Back end Python Flask da Humildefarm

criar database no utf8mb4
CREATE DATABASE pharma_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

criar tabela product
CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    quantidade INT,
    preco DECIMAL(10, 2),
    descricao TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
);

inserir dados

INSERT INTO product (nome, quantidade, preco, descricao) 
VALUES ('novagina', 10, 12.99, 'Dor de cabeça');

selecionar dados
select * from product