import { Button, TextField } from "@mui/material";
import "./styles.css";
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dadosBackEnd, setDadosBackEnd] = useState("");

  function pegarDadosDoBackEnd() {
    fetch("http://localhost:5000/api/produtos")
      .then((response) => response.json())
      .then((data) => setDadosBackEnd(data));
  }

  function enviarDadosParaBackEnd() {
    fetch("http://localhost:5000/api/produtos/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: "Produto 1",
        quantidade: 10,
        descricao: "Descrição do produto 1",
        preco: 100,
      }),
    });
  }

  useEffect(() => {
    pegarDadosDoBackEnd();
    enviarDadosParaBackEnd();
  }, []);

  return (
    <main>
      <div>
        <h1>Cadastro e controle de produtos</h1>
        <div>
          {" "}
          <h1>{dadosBackEnd}</h1>
        </div>

        <div class="container-button-add">
          <button
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Adicionar produto
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Descrição</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Produto 1</td>
              <td>10</td>
              <td>
                Descrição do produto 1 Descrição do produto 1 Descrição do
                produto 1 Descrição do produto 1 Descrição do produto 1
              </td>
              <td>R$ 100,00</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Produto 1</td>
              <td>10</td>
              <td>
                Descrição do produto 1 Descrição do produto 1 Descrição do
                produto 1 Descrição do produto 1 Descrição do produto 1
              </td>
              <td>R$ 100,00</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Produto 1</td>
              <td>10</td>
              <td>
                Descrição do produto 1 Descrição do produto 1 Descrição do
                produto 1 Descrição do produto 1 Descrição do produto 1
              </td>
              <td>R$ 100,00</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Produto 1</td>
              <td>10</td>
              <td>
                Descrição do produto 1 Descrição do produto 1 Descrição do
                produto 1 Descrição do produto 1 Descrição do produto 1
              </td>
              <td>R$ 100,00</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        style={{ padding: "2rem" }}
      >
        <TextField
          label="Nome"
          variant="outlined"
          style={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Quantidade"
          variant="outlined"
          style={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Descrição"
          variant="outlined"
          style={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Preço"
          variant="outlined"
          style={{ marginBottom: "1rem" }}
        />
        <Button variant="contained">Criar</Button>
      </Dialog>
    </main>
  );
};

export default ProductPage;
