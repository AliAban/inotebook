const connectToMongo = require("./db");
const express = require('express')
const app = express()
const port = 3000

//making connection to mongodb
connectToMongo();

//required to deal with res.body
app.use(express.json());

//Availabel routes below
app.use('/api/auth', require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

