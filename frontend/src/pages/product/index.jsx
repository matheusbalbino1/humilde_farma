import { Button, TextField } from "@mui/material"
import "./styles.css"
import Dialog from "@mui/material/Dialog"
import { useEffect, useState } from "react"

const ProductPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [dadosBackEnd, setDadosBackEnd] = useState([])
  const [novoProduto, setNovoProduto] = useState({
    id: "",
    nome: "",
    quantidade: "",
    descricao: "",
    preco: "",
  })

  function pegarDadosDoBackEnd() {
    fetch("http://localhost:5000/api/produtos")
      .then((response) => response.json())
      .then((data) => setDadosBackEnd(data))
  }

  function enviarDadosParaBackEnd() {
    if (novoProduto.id) {
      editarProdutoNoBackEnd()
    } else {
      criarProdutoNoBackEnd()
    }
  }

  function criarProdutoNoBackEnd() {
    fetch("http://localhost:5000/api/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoProduto),
    })
      .then(() => {
        pegarDadosDoBackEnd()
        setOpenModal(false)
        setNovoProduto({
          nome: "",
          quantidade: "",
          descricao: "",
          preco: "",
          id: "",
        })
      })
      .catch((error) => {
        console.error("Erro ao adicionar produto:", error)
      })
  }

  function editarProdutoNoBackEnd() {
    fetch(`http://localhost:5000/api/produtos/${novoProduto.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoProduto),
    })
      .then(() => {
        pegarDadosDoBackEnd()
        setOpenModal(false)
        setNovoProduto({
          nome: "",
          quantidade: "",
          descricao: "",
          preco: "",
          id: "",
        })
      })
      .catch((error) => {
        console.error("Erro ao editar produto:", error)
      })
  }

  function deletarProdutoNoBackEnd(id) {
    fetch(`http://localhost:5000/api/produtos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        pegarDadosDoBackEnd()
      })
      .catch((error) => {
        console.error("Erro ao deletar produto:", error)
      })
  }

  function chamadaAoClicarNoBotaoEditar(produto) {
    setOpenModal(true)
    setNovoProduto({
      nome: produto.nome,
      quantidade: produto.quantidade,
      descricao: produto.descricao,
      preco: produto.preco,
      id: produto.id,
    })
  }

  console.log(novoProduto)

  useEffect(() => {
    pegarDadosDoBackEnd()
  }, [])

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
              <th style={{ width: "100px" }}></th>
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
                  <td>
                    <div
                      className="container-button-add"
                      style={{
                        margin: 0,
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "8px",
                      }}
                    >
                      <button
                        onClick={() => chamadaAoClicarNoBotaoEditar(produto)}
                        style={{ background: "#0B5ED7", margin: 0 }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deletarProdutoNoBackEnd(produto.id)}
                        style={{ background: "#DC3545", margin: 0 }}
                      >
                        Deletar
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Dialog
        open={openModal}
        onClose={() => {
          setOpenModal(false)
          setNovoProduto({
            nome: "",
            quantidade: "",
            descricao: "",
            preco: "",
          })
        }}
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
        <Button
          style={novoProduto.id ? { background: "#0B5ED7" } : {}}
          variant="contained"
          onClick={enviarDadosParaBackEnd}
        >
          {novoProduto.id ? "EDITAR" : "CRIAR"}
        </Button>
      </Dialog>
    </main>
  )
}

export default ProductPage
