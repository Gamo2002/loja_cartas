import express from 'express';
import cors from 'cors';
import pg from 'pg';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURAÇÃO DE CAMINHOS (Necessário para ES Modules) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;

const app = express();

// --- PORTA DO SERVIDOR (Ajuste para o Render) ---
const port = process.env.PORT || 3000;

// Habilita o CORS para o frontend acessar
app.use(cors());
app.use(express.json());

// --- SERVIR ARQUIVOS ESTÁTICOS (O Front End) ---
app.use(express.static(path.join(__dirname, 'dist')));

// Configuração do Banco de Dados
const pool = new Pool({
  connectionString: 'postgresql://postgres:Trabweb2@db.anftrfowihpmhnnuiszh.supabase.co:6543/postgres',
  ssl: {
    rejectUnauthorized: false, 
  },
});

// ================= ROTAS DA API (Back End) =================

// ROTA 1: CADASTRAR USUÁRIO (ATUALIZADA COM ENDEREÇO E TRANSAÇÃO)
app.post('/auth/register', async (req, res) => {
  // Recebe dados pessoais E endereço
  const { nome, email, senha, rua, numero, complemento, bairro, cidade, estado, cep } = req.body;

  const client = await pool.connect();

  try {
    // 1. Inicia a transação
    await client.query('BEGIN');

    // 2. Verifica se e-mail já existe
    const userCheck = await client.query('SELECT * FROM Cliente WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      await client.query('ROLLBACK'); 
      return res.status(400).json({ error: "Este e-mail já está cadastrado!" });
    }

    // 3. Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // 4. Insere Cliente
    const userQuery = `
      INSERT INTO Cliente (nome, email, senha) 
      VALUES ($1, $2, $3) 
      RETURNING id_cliente, nome
    `;
    const userResult = await client.query(userQuery, [nome, email, hashedPassword]);
    const novoUsuario = userResult.rows[0];

    // 5. Insere Endereço vinculado ao Cliente
    const addressQuery = `
      INSERT INTO Enderecos (id_cliente, rua, numero, complemento, bairro, cidade, estado, cep)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    
    // Usa '||' para garantir que campos opcionais não quebrem se vierem vazios
    await client.query(addressQuery, [
      novoUsuario.id_cliente, 
      rua, 
      numero || 'S/N', 
      complemento || '', 
      bairro, 
      cidade, 
      estado, 
      cep
    ]);

    // 6. Confirma tudo
    await client.query('COMMIT');

    res.json({ message: "Usuário e endereço cadastrados com sucesso!", user: novoUsuario });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Erro no cadastro:", err);
    res.status(500).json({ error: "Erro ao cadastrar usuário. Tente novamente." });
  } finally {
    client.release();
  }
});

// ROTA 2: LOGIN
app.post('/auth/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query('SELECT * FROM Cliente WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(senha, user.senha);

    if (!validPassword) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    res.json({ message: "Login realizado!", user: { id: user.id_cliente, nome: user.nome } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// ROTA 3: FINALIZAR COMPRA (CHECKOUT) - ATUALIZADA
app.post('/api/checkout', async (req, res) => {
  // Nota: Retiramos id_endereco do body pois vamos buscar no banco
  const { id_cliente, cartItems, total } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // --- NOVO: Busca o endereço do cliente automaticamente ---
    const endRes = await client.query('SELECT id_endereco FROM Enderecos WHERE id_cliente = $1 LIMIT 1', [id_cliente]);
    
    if (endRes.rows.length === 0) {
      throw new Error("Cliente sem endereço cadastrado.");
    }
    const idEnderecoAutomatico = endRes.rows[0].id_endereco;
    // -------------------------------------------------------

    // 2. Cria o pedido
    const pedidoQuery = `
      INSERT INTO Pedido (id_cliente, id_endereco_entrega, valor_total, status_pedido)
      VALUES ($1, $2, $3, 'Processando')
      RETURNING id_pedido
    `;
    const pedidoResult = await client.query(pedidoQuery, [id_cliente, idEnderecoAutomatico, total]);
    const idPedido = pedidoResult.rows[0].id_pedido;

    // 3. Processa itens
    for (const item of cartItems) {
      // 3.1 Atualiza estoque
      const updateStockQuery = `
        UPDATE Produtos 
        SET quantidade_estoque = quantidade_estoque - $1
        WHERE id_produto = $2 AND quantidade_estoque >= $1
      `;
      const stockResult = await client.query(updateStockQuery, [item.quantity, item.id]);

      if (stockResult.rowCount === 0) {
        throw new Error(`Produto ${item.name} sem estoque suficiente.`);
      }

      // 3.2 Insere item do pedido
      const itemPedidoQuery = `
        INSERT INTO Produto_Pedido (id_pedido, id_produto, quantidade, preco_unitario)
        VALUES ($1, $2, $3, $4)
      `;
      await client.query(itemPedidoQuery, [idPedido, item.id, item.quantity, item.price]);
    }

    await client.query('COMMIT');
    
    res.json({ message: "Pedido realizado com sucesso!", id_pedido: idPedido });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Erro no checkout:", err);
    res.status(500).json({ error: err.message || "Erro ao processar pedido" });
  } finally {
    client.release();
  }
});


// ROTA 4: HISTÓRICO DE PEDIDOS (Adicione isso no seu server.js)
app.get('/api/pedidos', async (req, res) => {
  const { userId } = req.query; // Recebe o ID do usuário pela URL

  if (!userId) {
    return res.status(400).json({ error: "ID do usuário é obrigatório" });
  }

  try {
    const query = `
      SELECT 
        p.id_pedido AS id,
        p.data_pedido AS created_at,
        p.valor_total AS total,
        p.status_pedido AS status,
        p.id_cliente AS user_id,
        (
          -- Subquery para criar o array de itens (JSON)
          SELECT json_agg(json_build_object(
            'name', pr.nome,
            'quantity', pp.quantidade,
            'price', pp.preco_unitario,
            'image', ip.url_imagem
          ))
          FROM Produto_Pedido pp
          JOIN Produtos pr ON pp.id_produto = pr.id_produto
          LEFT JOIN Imagens_Produto ip ON pr.id_produto = ip.id_produto
          WHERE pp.id_pedido = p.id_pedido
        ) AS itens
      FROM Pedido p
      WHERE p.id_cliente = $1
      ORDER BY p.data_pedido DESC
    `;

    const result = await pool.query(query, [userId]);
    
    // Se não achar nada, retorna array vazio, não erro
    res.json(result.rows);

  } catch (err) {
    console.error("Erro ao buscar pedidos:", err);
    res.status(500).json({ error: "Erro ao buscar histórico de pedidos" });
  }
});

// Rota para pegar todos os produtos
app.get('/api/produtos', async (req, res) => {
  try {
    const query = `
      SELECT 
        p.id_produto AS id,
        LOWER(p.categoria::text) AS category,
        p.nome AS name,
        p.preco::float AS price,
        i.url_imagem AS image,
        p.descricao AS description,
        p.quantidade_estoque AS stock
      FROM Produtos p
      LEFT JOIN Imagens_Produto i ON p.id_produto = i.id_produto
    `;
    
    const result = await pool.query(query);
    console.log("Produtos buscados com sucesso!");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao conectar no banco" });
  }
});

// ================= ROTA DO FRONT END (Coringa) =================
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ================= INICIALIZAÇÃO =================
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
});