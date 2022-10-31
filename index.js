const express = require('express');
const app = require('express')()
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const { MongoClient } = require('mongodb');

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname + '/')))

app.use(bodyParser.json())

const uri = process.env.DATABASE_URL
const client = new MongoClient(uri);

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/add-info', async (req, res) => {
    res.send("Salon: "+ req.body.salon_name + "has been added.")
    async function run() {
          try {
            const database = client.db('salon_database');
            const restaurants = database.collection('salon_collection');
            // create a document to insert
            const doc = {
                salon_name: req.body.salon_name, 
                address: req.body.restaurant_address,
                phoneNumber: req.body.phoneNumber
            }
            
            const result = await restaurants.insertOne(doc);
            
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            } finally {
            await client.close();
            }
            }
            run().catch(console.dir);
          });

app.listen(3000, () => {
    console.log('Node server is running...')
});