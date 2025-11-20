// server/index.js
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// O CORS permite que o React (porta 5173) fale com o Node (porta 3000)
app.use(cors());
app.use(express.json());

// Rota de Teste
app.get('/', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT NOW()');
        res.json({ 
            mensagem: "Back-end funcionando!", 
            hora_banco: resultado.rows[0].now 
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao conectar no banco" });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});