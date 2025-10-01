import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3230;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // Porta do React

// Conexão com MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cimatec",
  database: "ORBITTA"
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).send("Email e senha são obrigatórios");

  db.query(
    "SELECT id, email, senha_hash FROM usuario WHERE id = ? LIMIT 1",
    [email],
    async (err, results) => {
      if (err) return res.status(500).send("Erro no servidor");
      if (results.length === 0) return res.status(401).send("Email ou senha inválidos");

      const usuario = results[0];
      const ok = await bcrypt.compare(senha, usuario.senha_hash);
      if (!ok) return res.status(401).send("Email ou senha inválidos");

      return res.status(200).json({ id: usuario.id, email: usuario.email });
    }
  );
});

// CADASTRO
app.post("/cadastro", async (req, res) => {
  const { cpf, email, senha } = req.body;
  if (!cpf || !email || !senha) return res.status(400).send("Todos os campos são obrigatórios");

  const senha_hash = await bcrypt.hash(senha, 10);

  db.query(
    "INSERT INTO usuario (cpf, email, senha_hash) VALUES (?, ?, ?)",
    [cpf, email, senha_hash],
    (err) => {
      if (err) return res.status(500).send("Erro ao cadastrar usuário");
      res.status(201).send("Usuário cadastrado com sucesso!");
    }
  );
});

app.listen(PORT, () => console.log(`🚀 API rodando na porta ${PORT}`));
