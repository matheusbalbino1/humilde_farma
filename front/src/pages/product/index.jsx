import "./styles.css";

const ProductPage = () => {
  return (
    <main>
      <div>
        <h1>Cadastro e controle de produtos</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Editar</th>
              <th></th>
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
              <td>
                <button>Editar</button>
              </td>
              <td>
                <button className="button-danger">Apagar</button>
              </td>
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
              <td>
                <button>Editar</button>
              </td>
              <td>
                <button className="button-danger">Apagar</button>
              </td>
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
              <td>
                <button>Editar</button>
              </td>
              <td>
                <button className="button-danger">Apagar</button>
              </td>
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
              <td>
                <button>Editar</button>
              </td>
              <td>
                <button className="button-danger">Apagar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ProductPage;
