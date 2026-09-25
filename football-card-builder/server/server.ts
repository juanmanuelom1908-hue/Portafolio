import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = new Database(path.join(__dirname, "cards.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    overallRating INTEGER NOT NULL,
    position TEXT NOT NULL,
    club TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    pac INTEGER NOT NULL,
    sho INTEGER NOT NULL,
    pas INTEGER NOT NULL,
    dri INTEGER NOT NULL,
    def INTEGER NOT NULL,
    phy INTEGER NOT NULL
  )
`);

// GET todas las tarjetas
app.get("/api/cards", (req, res) => {
  const cards = db.prepare("SELECT * FROM cards").all();
  res.json(cards);
});

// GET una tarjeta por id
app.get("/api/cards/:id", (req, res) => {
  const card = db.prepare("SELECT * FROM cards WHERE id = ?").get(req.params.id);
  if (!card) return res.status(404).json({ error: "Card not found" });
  res.json(card);
});

// POST crear tarjeta
app.post("/api/cards", (req, res) => {
  const { name, overallRating, position, club, imageUrl, pac, sho, pas, dri, def, phy } = req.body;
  const stmt = db.prepare(`
    INSERT INTO cards (name, overallRating, position, club, imageUrl, pac, sho, pas, dri, def, phy)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(name, overallRating, position, club, imageUrl, pac, sho, pas, dri, def, phy);
  res.status(201).json({ id: result.lastInsertRowid, ...req.body });
});

// PUT actualizar tarjeta
app.put("/api/cards/:id", (req, res) => {
  const { name, overallRating, position, club, imageUrl, pac, sho, pas, dri, def, phy } = req.body;
  const stmt = db.prepare(`
    UPDATE cards SET name=?, overallRating=?, position=?, club=?, imageUrl=?, pac=?, sho=?, pas=?, dri=?, def=?, phy=?
    WHERE id=?
  `);
  const result = stmt.run(name, overallRating, position, club, imageUrl, pac, sho, pas, dri, def, phy, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: "Card not found" });
  res.json({ id: Number(req.params.id), ...req.body });
});

// DELETE tarjeta
app.delete("/api/cards/:id", (req, res) => {
  const result = db.prepare("DELETE FROM cards WHERE id = ?").run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: "Card not found" });
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});