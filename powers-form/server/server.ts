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
  CREATE TABLE IF NOT EXISTS heroes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    heroName TEXT NOT NULL,
    realName TEXT NOT NULL,
    powerSource TEXT NOT NULL,
    powers TEXT NOT NULL,
    powerLevel INTEGER NOT NULL
  )
`);


app.get("/api/heroes", (req, res) => {
  const heroes = db.prepare("SELECT * FROM heroes").all();
  const parsed = heroes.map((h: any) => ({ ...h, powers: JSON.parse(h.powers) }));
  res.json(parsed);
});

app.post("/api/heroes", (req,res)=>{
    const { heroName, realName, powerSource, powers, powerLevel} = req.body
    const smt = db.prepare(`INSERT INTO heroes (heroName, realName, powerSource, powers, powerLevel) VALUES(?,?,?,?,?)`)
    const powersJson = JSON.stringify(powers);
    const result = smt.run(heroName, realName, powerSource, powersJson, powerLevel)
    res.status(201).json({ id: result.lastInsertRowid, ...req.body });
})

app.put("/api/heroes/:id",(req,res)=>{
     const { heroName, realName, powerSource, powers, powerLevel} = req.body
     const smt = db.prepare(
  `UPDATE heroes SET heroName=?, realName=?, powerSource=?, powers=?, powerLevel=? WHERE id=?`
);
     const powersJson = JSON.stringify(powers);
     const result = smt.run(heroName, realName, powerSource, powersJson, powerLevel, req.params.id)
      if (result.changes === 0) return res.status(404).json({ error: "Hero not found" });
       res.json({ id: Number(req.params.id), ...req.body });

})

app.delete("/api/heroes/:id",(req,res)=>{
    const result = db.prepare("DELETE FROM heroes WHERE id=?").run(req.params.id)
    if (result.changes === 0) return res.status(404).json({ error: "Hero not found" });
    res.status(204).send();
})

app.listen(3001, () => console.log("Server running on port 3001"));