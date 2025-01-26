const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const ATLAS_URI = "mongodb+srv://saumyav9876:eEIpDCfJQ06lxqEV@cluster0.mprzn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
    const client = new MongoClient(ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tls: true, // Ensure TLS is explicitly enabled
        tlsAllowInvalidCertificates: false, // Enforce valid certificates
    });

    try {
        await client.connect(); // Connect to the cluster
        console.log("Successfully connected to MongoDB Atlas!");

        // Fetch and log collections
        const collections = await client.db("InnovateHer").collections();
        collections.forEach((collection) => 
            console.log(collection.s.namespace.collection)
        );
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
    } finally {
        await client.close(); // Ensure the client is closed
    }
}

main();
