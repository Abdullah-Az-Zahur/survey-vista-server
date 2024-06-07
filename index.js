const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nbrjeuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = "mongodb+srv://surveyVistaUser:VdvTOrFpsVNEMX8j@cluster0.nbrjeuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const surveyCollection = client.db("survey1DB").collection("survey");
    const usersCollection = client.db("survey1DB").collection("users");

    // user related api
    // save user data in DB
    app.put("/user", async (req, res) => {
      const user = req.body;
      const query = { email: user?.email };

      const options = { upsert: true };

      const updateDoc = {
        $set: {
          ...user,
          timestamp: Date.now(),
        },
      };

      const result = await usersCollection.updateOne(query, updateDoc, options);
    });

    // survey related api
    // get all survey
    app.get("/survey", async (req, res) => {
      const result = await surveyCollection.find().toArray();
      res.send(result);
    });

    // get a single survey
    app.get("/survey/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await surveyCollection.findOne(query);
      res.send(result);
    });

    // update survey
    app.patch("/survey/:id", async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          title: item.title,
          description: item.description,
          category: item.category,
          deadline: item.deadline,
        },
      };
      const result = await surveyCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // get latest data

    // save survey in db
    app.post("/create", async (req, res) => {
      const surveyData = req.body;
      const result = await surveyCollection.insertOne(surveyData);
      res.send(result);
    });

    // get all survey for Surveyor
    app.get("/my-listings/:email", async (req, res) => {
      const email = req.params.email;
      let query = { "surveyor.email": email };
      const result = await surveyCollection.find(query).toArray();
      res.send(result);
    });

    // delete survey
    app.delete("/my-listings/:id", async (req, res) => {
      const id = req.params.id;
      // const query = { _id: new ObjectId(id) }
      const query = { _id: new ObjectId(id) };
      const result = await surveyCollection.deleteOne(query);
      res.send(result);
    });

    // Logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
        console.log("Logout successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("survey vista start");
});

app.listen(port, () => {
  console.log(`survey vista in running on port ${port}`);
});
