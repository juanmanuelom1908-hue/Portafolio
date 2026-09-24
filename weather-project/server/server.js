const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const PORT = 5000
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city
    const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`)
    
    if (!response.ok) {
      return res.status(404).json({ error: "City not found" })
    }
    
    const data = await response.json()
    res.json(data)
    
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))