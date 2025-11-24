import express from 'express';
import cors from 'cors';
import pg from 'pg'; // Import the whole 'pg' library
import bcrypt from 'bcrypt';

// Extract Pool from the pg library
const { Pool } = pg; 

const app = express();

// PORT CONFIGURATION
const port = process.env.PORT || 3000; 

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// DATABASE CONFIGURATION
const pool = new Pool({
  connectionString: 'postgresql://postgres:Trabweb2@db.anftrfowihpmhnnuiszh.supabase.co:5432/postgres',
  ssl: {
    rejectUnauthorized: false, 
  },
});

// --- ROUTES ---

// ROTA 1: CADASTRAR USUÁRIO
app.post('/auth/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // 1. Check if email exists
    const userCheck = await pool.query('SELECT * FROM Cliente WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "Este e-mail já está cadastrado!" });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(senha, 10);

    // 3. Insert into DB
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
    // 1. Find user
    const result = await pool.query('SELECT * FROM Cliente WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const user = result.rows[0];

    // 2. Compare password
    const validPassword = await bcrypt.compare(senha, user.senha);

    if (!validPassword) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    // 3. Login success
    res.json({ message: "Login realizado!", user: { id: user.id_cliente, nome: user.nome } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// ROTA 3: GET PRODUCTS
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

// START SERVER
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});