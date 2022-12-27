const connectToMongo = require("./db");
const express = require('express')
const app = express()
const port = 3000

connectToMongo();

// import connectToMongo from "./db"

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send('about page')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

