import express from 'express';
import cors from 'cors';
import pg from 'pg'; // Importação diferente para o pacote 'pg'
import bcrypt from 'bcrypt';
const path = require('path'); // <--- 1. Importe o 'path'

const { Pool } = pg; // Desestrutura o Pool daqui

const app = express();
const port = 3000;

// ... O resto do código continua igual daqui para baixo ...

// Habilita o CORS para o frontend acessar
app.use(cors());
app.use(express.json());

// Configuração do Banco de Dados
const pool = new Pool({
  // Opção 1: Usando a String de Conexão (Recomendado)
  // Cole aqui a URL que o Supabase/Neon te deu.
  // Ela parece com: postgres://usuario:senha@host-do-banco.com:5432/nome-do-banco
  connectionString: 'postgresql://postgres:Trabweb2@db.anftrfowihpmhnnuiszh.supabase.co:5432/postgres',

  // Opção 2: Se preferir colocar separado (igual você tinha antes):
  // user: 'usuario_da_nuvem',
  // host: 'db.xyz.supabase.co',
  // database: 'postgres',
  // password: 'senha_da_nuvem',
  // port: 5432,

  // IMPORTANTE: Bancos na nuvem EXIGEM isso aqui para aceitar conexão externa:
  ssl: {
    rejectUnauthorized: false, 
  },
});

// Adicione essa linha lá no topo do arquivo server.js junto com os outros requires


// ... (seu código de conexão pool e rota de produtos continua igual) ...

// ROTA 1: CADASTRAR USUÁRIO
app.post('/auth/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // 1. Verifica se o email já existe
    const userCheck = await pool.query('SELECT * FROM Cliente WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "Este e-mail já está cadastrado!" });
    }

    // 2. Criptografa a senha (O Segredo!)
    const hashedPassword = await bcrypt.hash(senha, 10);

    // 3. Insere no banco
    const newUser = await pool.query(
      'INSERT INTO Cliente (nome, email, senha) VALUES ($1, $2, $3) RETURNING id_cliente, nome',
      [nome, email, hashedPassword]
    );

    res.json({ message: "Usuário criado com sucesso!", user: newUser.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

// ROTA 2: LOGIN
app.post('/auth/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // 1. Busca o usuário pelo email
    const result = await pool.query('SELECT * FROM Cliente WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const user = result.rows[0];

    // 2. Compara a senha digitada com a senha criptografada do banco
    const validPassword = await bcrypt.compare(senha, user.senha);

    if (!validPassword) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    // 3. Login aprovado!
    res.json({ message: "Login realizado!", user: { id: user.id_cliente, nome: user.nome } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// ... app.listen ...

// Rota para pegar todos os produtos
app.get('/api/produtos', async (req, res) => {
  try {
    const query = `
      SELECT 
        p.id_produto AS id,
        LOWER(p.categoria::text) AS category,
        p.nome AS name,
        TO_CHAR(p.preco, 'FM999G990D00') AS price,
        i.url_imagem AS image,
        p.descricao AS description,
        p.quantidade_estoque AS stock  -- <--- ADICIONE ESTA LINHA AQUI (COM A VÍRGULA ANTES)
      FROM Produtos p
      LEFT JOIN Imagens_Produto i ON p.id_produto = i.id_produto
    `;
    
    const result = await pool.query(query);
    console.log("Produtos buscados com sucesso!"); // Log para debug
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao conectar no banco" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
