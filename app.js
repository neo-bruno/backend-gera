require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./config/db')

const PORT = process.env.PORT || 3000

app.use(express.json({ limit: '70mb' }))

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('hola desde el servidor BACK-ITZEL'))

async function connectionDB() {
  try {
    await db.authenticate()
    console.log('Connection has been successfully')
  } catch (error) {
    console.log('Unable to connect to the database', error)
  }
}

app.use('/api/1.0', require('./app/routes'))

connectionDB()

app.listen(PORT, () => {
  console.log(`api ready... on port: ${PORT}`)
})