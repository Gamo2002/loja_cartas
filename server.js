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
// Usa a porta que o Render manda OU a 3000 se for local
const port = process.env.PORT || 3000;

// Habilita o CORS para o frontend acessar
app.use(cors());
app.use(express.json());

// --- SERVIR ARQUIVOS ESTÁTICOS (O Front End) ---
// Isso diz ao Node para usar a pasta 'dist' que o Vite criou
app.use(express.static(path.join(__dirname, 'dist')));

// Configuração do Banco de Dados
const pool = new Pool({
  connectionString: 'postgresql://postgres:Trabweb2@db.anftrfowihpmhnnuiszh.supabase.co:6543/postgres',
  ssl: {
    rejectUnauthorized: false, 
  },
});

// ================= ROTAS DA API (Back End) =================

// ROTA 1: CADASTRAR USUÁRIO
app.post('/auth/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const userCheck = await pool.query('SELECT * FROM Cliente WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "Este e-mail já está cadastrado!" });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

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
// ATENÇÃO: Essa rota deve ficar SEMPRE no final, depois de todas as APIs.
// Ela garante que qualquer rota que não seja API vai carregar o site.
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ================= INICIALIZAÇÃO =================
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
});