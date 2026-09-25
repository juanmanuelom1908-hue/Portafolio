const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));