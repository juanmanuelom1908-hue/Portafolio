import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
const PORT = 3000;
app.get("/api/motorcycles", async (req, res) => {
    try {
        const response = await fetch("https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json");
        if (!response.ok) {
            return res.status(404).json({ error: "Motorcycle not found" });
        }
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
app.listen(PORT, () => console.log(`Servidor corriendo en ${PORT}`));
//# sourceMappingURL=server.js.map