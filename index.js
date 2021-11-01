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
      const ordersCollection = database.collection("orders")

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
         res.send(user ? user : {} )
      })

      // GET API for all the orders for a specific user has given
      app.get(`/orders/:email`, async (req, res) => {
         const email = req.params.email
         const query = {email: email}
         const cursor = ordersCollection.find(query)
         const orders = await cursor.toArray()
         res.send(orders)
      })

      // GET API for all the orders
      app.get(`/orders`, async (req, res) => {
         const cursor = ordersCollection.find({})
         const orders = await cursor.toArray()
         res.send(orders)
      })

      // POST API for each unique user
      app.post('/users', async (req, res) => {
         const user = req.body
         const result = await usersCollection.insertOne(user)
         res.send(result)
      })

      // POST API for orders
      app.post('/orders', async (req, res) => {
         const order = req.body
         const result = await ordersCollection.insertOne(order)
         cnsole.log('Api hitted by the request')
         res.send(result)
      })

      // POST API to add a neq place into places route
      app.post('/places', async (req, res) => {
         const place = req.body
         const result = await placesCollection.insertOne(place)
         res.send(result)
      })

      // DELETE API for deleting an ordered item
      app.delete(`/orders/:id`, async (req, res) => {
         const id = req.params.id
         const query = {_id: ObjectId(id)}
         const result = await ordersCollection.deleteOne(query)
         res.send(result)
      })

      // UPDATE API for a singe order
      app.put('/orders/:id', async (req, res) => {
         const id = req.params.id
         const updatedOrder = req.body
         const filter = {_id: ObjectId(id)}
         const options = { upsert: false };
         const updateDoc = {
            $set: {
               orderStatus: updatedOrder.orderStatus
            },
          };
         const result = await ordersCollection.updateOne(filter, updateDoc, options)
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













