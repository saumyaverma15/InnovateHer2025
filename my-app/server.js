const express = require("express");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./src/config.env" });

const cors = require("cors");
const app = express();


app.use(cors()); // Enable CORS for all routes

  


app.use(express.json()); // For parsing application/json

// MongoDB connection string
const Db = "mongodb+srv://saumyav9876:eEIpDCfJQ06lxqEV@cluster0.mprzn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tls=true";
const client = new MongoClient(Db, {
    tls: true,
    tlsAllowInvalidCertificates: false,  // Set to false to enforce proper certificate validation
  });

let db; // Declare a global variable for the database

// Function to connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("InnovateHer"); // Set the database name
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the application if the connection fails
  }
}

// Connect to MongoDB before starting the server
connectToDatabase();

// Route to add a new user
app.post("/addUser", async (req, res) => {
  const { username, password } = req.body;

  // Check for missing fields
  if (!username || !password) {
    return res.status(400).send({ error: "Username and password are required" });
  }

  try {
    const collection = db.collection("Users");
    const existingUser = await collection.findOne({ username });

    // Check if the username already exists
    if (existingUser) {
      return res.status(400).send({ error: "Username already exists" });
    }

    // Hash the password and store the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await collection.insertOne({ username, password: hashedPassword });
    res.status(201).send({ message: "User added successfully", result });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Failed to add user" });
  }
});

app.post("/verifyUser", async (req, res) => {
    const { username, password } = req.body;
  
    // Check for missing fields
    if (!username || !password) {
      return res.status(400).send({ error: "Username and password are required" });
    }
  
    try {
      const collection = db.collection("Users");
      const user = await collection.findOne({ username });
  
      // Check if the user exists
      if (!user) {
        return res.status(400).send({ error: "User not found" });
      }
  
      // Validate the password
      // const isPasswordValid = password === user.password;
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (isPasswordValid) {
        return res.status(200).send({ message: "User verified successfully" });
      }
  
      return res.status(400).send({ error: "Invalid password!" });
    } catch (e) {
      console.error(e);
      return res.status(500).send({ error: "Failed to verify user" });
    }
  });
  

// Start the server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
