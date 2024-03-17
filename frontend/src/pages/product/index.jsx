import { Button, TextField } from "@mui/material";
import "./styles.css";
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dadosBackEnd, setDadosBackEnd] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    quantidade: "",
    descricao: "",
    preco: ""
  });

  function pegarDadosDoBackEnd() {
    fetch("http://localhost:5000/api/produtos")
      .then((response) => response.json())
      .then((data) => setDadosBackEnd(data));
  }

  function enviarDadosParaBackEnd() {
    fetch("http://localhost:5000/api/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novoProduto)
    })
      .then(() => {
        pegarDadosDoBackEnd();
        setOpenModal(false);
      })
      .catch((error) => {
        console.error("Erro ao adicionar produto:", error);
      });
  }

  useEffect(() => {
    pegarDadosDoBackEnd();
  }, []);

  useEffect(() => {
    if (openModal) {
      // Limpar os campos quando a caixa de diálogo for aberta
      setNovoProduto({
        nome: "",
        quantidade: "",
        descricao: "",
        preco: ""
      });
    }
  }, [openModal]);

  return (
    <main>
      <div>
        <h1>Cadastro e controle de produtos</h1>
        <div></div>

        <div className="container-button-add">
          <button onClick={() => setOpenModal(true)}>Adicionar produto</button>
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
            {dadosBackEnd.map((produto, index) => {
              return (
                <tr key={index}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.quantidade}</td>
                  <td>{produto.descricao}</td>
                  <td>{produto.preco}</td>
                </tr>
              );
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
          value={novoProduto.nome}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, nome: e.target.value })
          }
        />
        <TextField
          label="Quantidade"
          variant="outlined"
          style={{ marginBottom: "1rem" }}
          value={novoProduto.quantidade}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, quantidade: e.target.value })
          }
        />
        <TextField
          label="Descrição"
          variant="outlined"
          style={{ marginBottom: "1rem" }}
          value={novoProduto.descricao}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, descricao: e.target.value })
          }
        />
        <TextField
          label="Preço"
          variant="outlined"
          style={{ marginBottom: "1rem" }}
          value={novoProduto.preco}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, preco: e.target.value })
          }
        />
        <Button variant="contained" onClick={enviarDadosParaBackEnd}>
          Criar
        </Button>
      </Dialog>
    </main>
  );
};

export default ProductPage;
