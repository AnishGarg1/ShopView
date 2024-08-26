const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/database");
const { MongoClient } = require("mongodb");

// middlewares
dotenv.config();
app.use(express.json());
app.use(
    cors({
        origin: "*",
        credentials: true
    })
)

async function main(){
    // Mongodb client
    const client = new MongoClient(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        // Connecting to database
        dbConnect.connect();
        
        // Define a database and a collection
        const database = client.db('RQ_Analytics');
        const collection1 = database.collection('shopifyCustomers');
        const collection2 = database.collection('shopifyOrders');
        const collection3 = database.collection('shopifyProducts');
        
        // Fetch and sort customers by created_at in descending order
        const customers = await collection1.find({}).sort({ "created_at": 1 }).toArray();
        // console.log('Sorted Customers:', customers);

        // Fetch and sort orders by created_at in descending order
        const orders = await collection2.find({}).sort({ "created_at": 1 }).toArray();
        // console.log('Sorted Orders:', orders);

        // Fetch and sort products by created_at in descending order
        const products = await collection3.find({}).sort({ "created_at": 1 }).toArray();
        // console.log('Sorted Products:', products);
        
        app.get("/customers", (req, res) => {
            return res.status(200).json({
                message: "Customers fetched successfully",
                customers,
            })
        });
        app.get("/orders", (req, res) => {
            return res.status(200).json({
                message: "Orders fetched successfully",
                orders,
            })
        });
        app.get("/products", (req, res) => {
            return res.status(200).json({
                message: "Products fetched successfully",
                products,
            })
        });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    } finally {
        // Ensure the client closes when you finish/error
        await client.close();
    }    
}

main().catch(console.error);

app.get("/", (req, res) => {
    res.send("ShopView");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});