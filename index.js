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




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z46cs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const run = async () => {
   try{
      await client.connect();
      const database = client.db("exploreBangladesh")
      const placesCollection = database.collection("places")
      const usersCollection = database.collection("users")

      // GET API for all places
      app.get('/places', async (req, res) => {
         const query = {}
         const cursor = placesCollection.find(query)
         const places = await cursor.toArray()
         res.send(places)
      })

      //GET API for a specific place
      app.get('/places/:id', async (req, res) => {
         const id = req.params.id
         const query = {_id: ObjectId(id)}
         const place = await placesCollection.findOne(query)
         res.send(place)
      })

      // GET API for single user
      app.get('/users/:email', async (req, res) => {
         const email = req.params.email 
         const query = {email: email}
         const user = await usersCollection.findOne(query)
         console.log(user)
         res.send(user ? user : {} )
      })

      // POST API for each unique user
      app.post('/users', async (req, res) => {
         const user = req.body
         const result = await usersCollection.insertOne(user)
         console.log(result)
         res.send(result)
      })

   } finally {

   }
}

run().catch(console.dir)











app.get('/', (req, res) => {
   // console.log(uri)
   res.send("server is running well!")
})

app.listen(port, () => {
   console.log('This server running at port no: ', port)
})













