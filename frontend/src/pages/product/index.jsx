import { Button, TextField } from "@mui/material";
import "./styles.css";
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dadosBackEnd, setDadosBackEnd] = useState([]);

  function pegarDadosDoBackEnd() {
    fetch("http://localhost:5000/api/produtos")
      .then((response) => response.json())
      .then((data) => setDadosBackEnd(data));
  }

  function enviarDadosParaBackEnd() {
    fetch("http://localhost:5000/api/produtos/5", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: "Produto 1",
        quantidade: 10,
        descricao: "Descrição do produto 1",
        preco: 1000,
      }),
    });
  }

  useEffect(() => {
    pegarDadosDoBackEnd();
    enviarDadosParaBackEnd();
  }, []);
  console.log(dadosBackEnd)
  return (
    <main>
      <div>
        <h1>Cadastro e controle de produtos</h1>
        <div>
          {" "}
        </div>

        <div className="container-button-add">
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
           {dadosBackEnd.map((produto,index)=>{
            return(<tr key={index}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.quantidade}</td>
              <td>{produto.descricao}</td>
              <td>{produto.preco}</td>              
            </tr>)
            })}
            
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
