const express = require("express");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Allow cross-origin requests from React front-end

const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);

// Connect to MongoDB
async function connectMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (e) {
    console.error("Failed to connect to MongoDB:", e);
    process.exit(1);
  }
}

// Add user route
app.post("/addUser", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ error: "Username and password are required" });
  }

  try {
    const collection = client.db("InnovateHer").collection("Users");
    const existingUser = await collection.findOne({ username });
    if (existingUser) return res.status(400).send({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await collection.insertOne({ username, password: hashedPassword });
    res.status(201).send({ message: "User added successfully" });
  } catch (e) {
    res.status(500).send({ error: "Failed to add user" });
  }
});

// Verify user route
app.post("/verifyUser", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ error: "Username and password are required" });
  }

  try {
    const collection = client.db("InnovateHer").collection("Users");
    const user = await collection.findOne({ username });
    if (!user) return res.status(400).send({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).send({ error: "Invalid password" });

    res.status(200).send({ message: "User verified successfully" });
  } catch (e) {
    res.status(500).send({ error: "Failed to verify user" });
  }
});

// Start the server
const PORT = 3001;
app.listen(PORT, async () => {
  await connectMongoDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
