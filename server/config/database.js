const { MongoClient } = require('mongodb');
require("dotenv").config();

exports.connect = () => {
    const client = new MongoClient(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    client.connect()
    .then(() => console.log("Database connected successfully"))
    .catch((error) => {
        console.log("Database connection failed");
        console.log("Error:", error);
        process.exit(1);
    });
}