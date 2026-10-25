const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    const initialDB = { calculos: [] };
    await fs.writeFile(DB_PATH, JSON.stringify(initialDB, null, 2));
    return initialDB;
  }
}

async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// Obtener historial de cálculos
app.get('/api/calculos', async (req, res) => {
  const db = await readDB();
  res.json({ ok: true, data: db.calculos });
});

// Guardar nuevo cálculo en el JSON
app.post('/api/calculos', async (req, res) => {
  const db = await readDB();
  const nuevoCalculo = {
    id: Date.now().toString(),
    ...req.body
  };
  db.calculos.push(nuevoCalculo);
  await writeDB(db);
  res.status(201).json({ ok: true, data: nuevoCalculo });
});

app.listen(PORT, () => {
  console.log(`Servidor de Calculadora activo en http://localhost:${PORT}`);
});