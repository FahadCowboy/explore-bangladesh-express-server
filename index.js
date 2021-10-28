const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 4000
const ObjectId = require('mongodb').ObjectId


// testDB
// 1AjED9K55V0aJxab

// Middlewire
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.z46cs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });













app.get('/', (req, res) => {
   console.log(uri)
   res.send("server is running well!")
})

app.listen(port, () => {
   console.log('This server running at port no: ', port)
})













