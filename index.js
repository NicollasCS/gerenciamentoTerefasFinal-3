require('dotenv').config()

const express = require('express')
const Routes = require('./src/config/routes')

let app = express()
app.use(express.json())

Routes(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}!`)
})
