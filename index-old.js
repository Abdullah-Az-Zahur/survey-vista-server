import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

// Initialize dotenv
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nbrjeuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5000",
    "https://survey-vista.web.app",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Verify Token Middleware
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "Unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

async function run() {
  try {
    const surveyCollection = client.db("survey1DB").collection("survey");
    const usersCollection = client.db("survey1DB").collection("users");
    const paymentCollection = client.db("survey1DB").collection("payments");
    const SurveyResultCollection = client
      .db("survey1DB")
      .collection("surveyResult");

    // verify admin middleware
    const verifyAdmin = async (req, res, next) => {
      console.log("hello");
      const user = req.user;
      const query = { email: user?.email };
      const result = await usersCollection.findOne(query);
      console.log(result?.role);
      if (!result || result?.role !== "admin")
        return res.status(401).send({ message: "unauthorized access!!" });

      next();
    };
    // verify host middleware
    const verifySurveyor = async (req, res, next) => {
      console.log("hello");
      const user = req.user;
      const query = { email: user?.email };
      const result = await usersCollection.findOne(query);
      console.log(result?.role);
      if (!result || result?.role !== "surveyor") {
        return res.status(401).send({ message: "unauthorized access!!" });
      }

      next();
    };

    // auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // user related api
    // save a user data in DB
    app.put("/user", async (req, res) => {
      const user = req.body;

      const query = { email: user?.email };
      // check if user already exists in db
      const isExist = await usersCollection.findOne(query);
      if (isExist) {
        if (user.status === "Requested") {
          // if existing user try to change his role
          const result = await usersCollection.updateOne(query, {
            $set: { status: user?.status },
          });
          return res.send(result);
        } else {
          // if existing user login again
          return res.send(isExist);
        }
      }

      // save user for the first time
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...user,
          timestamp: Date.now(),
        },
      };
      const result = await usersCollection.updateOne(query, updateDoc, options);
      // welcome new user
      // sendEmail(user?.email, {
      //   subject: "Welcome to Survey vista!",
      //   message: `Hope you will find you destination`,
      // });
      res.send(result);
    });

    // get a user info by email from db
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email });
      res.send(result);
    });

    // get all users data from db
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    //update a user role
    app.patch("/users/update/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const query = { email };
      const updateDoc = {
        $set: { ...user, timestamp: Date.now() },
      };
      const result = await usersCollection.updateOne(query, updateDoc);
      res.send(result);
    });
    
    //update a user role for payments
    app.patch("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const query = { email };
      const updateDoc = {
        $set: {
          pro: user.pro,
          timestamp: Date.now(),
        },
      };
      const result = await usersCollection.updateOne(query, updateDoc);
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

    // Get all surveys data from db for pagination
    app.get("/all-survey", async (req, res) => {
      const size = parseInt(req.query.size);
      const page = parseInt(req.query.page) - 1;
      const filter = req.query.filter;
      const sort = req.query.sort;
      const search = req.query.search;
      console.log(size, page);

      let query = {
        title: { $regex: search, $options: "i" },
      };
      if (filter) query.category = filter;
      let options = {};
      if (sort) options = { sort: { deadline: sort === "asc" ? 1 : -1 } };
      const result = await surveyCollection
        .find(query, options)
        .skip(page * size)
        .limit(size)
        .toArray();

      res.send(result);
    });

    // Get all survey data count from db
    app.get("/survey-count", async (req, res) => {
      const filter = req.query.filter;
      const search = req.query.search;
      let query = {
        title: { $regex: search, $options: "i" },
      };
      if (filter) query.category = filter;
      const count = await surveyCollection.countDocuments(query);

      res.send({ count });
    });

    // update survey Vote
    app.patch("/surveyVote/:id", async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      if (item?.selectedValue == "Yes") {
        const updateDoc = {
          $inc: { yes: 1 },
        };
        const result = await surveyCollection.updateOne(filter, updateDoc);
        return res.send(result);
      } else if (item?.selectedValue == "No") {
        const updateDoc = {
          $inc: { no: 1 },
        };
        const result = await surveyCollection.updateOne(filter, updateDoc);
        return res.send(result);
      }
    });

    // save survey in db
    app.post("/create", async (req, res) => {
      const surveyData = req.body;
      const result = await surveyCollection.insertOne(surveyData);
      res.send(result);
    });

    // get all survey for Surveyor
    app.get(
      "/my-listings/:email",
      // verifyToken,
      // verifySurveyor,
      async (req, res) => {
        const email = req.params.email;
        let query = { "surveyor.email": email };
        const result = await surveyCollection.find(query).toArray();
        res.send(result);
      }
    );

    // delete survey
    app.delete("/my-listings/:id", async (req, res) => {
      const id = req.params.id;
      // const query = { _id: new ObjectId(id) }
      const query = { _id: new ObjectId(id) };
      const result = await surveyCollection.deleteOne(query);
      res.send(result);
    });

    // Survey submit related api

    // get all users data from db
    app.get("/all-survey-result", async (req, res) => {
      const result = await SurveyResultCollection.find().toArray();
      res.send(result);
    });

    app.put("/survey-result", async (req, res) => {
      const surveyData = req.body;
      const query = {
        $and: [
          { userEmail: surveyData?.userEmail },
          { surveyId: surveyData?.surveyId },
        ],
      };
      const options = { upsert: true };
      const updateDoc = {
        $set: surveyData,
      };
      const result = await SurveyResultCollection.updateOne(
        query,
        updateDoc,
        options
      );

      if (surveyData?.selectedValue == "yes") {
        const filter = { _id: surveyData?.surveyId };
        await surveyCollection.updateOne(filter, { $inc: { yes: 1 } });
      }
      if (surveyData?.selectedValue == "no") {
        const filter = { _id: surveyData?.surveyId };
        await surveyCollection.updateOne(filter, { $inc: { no: 1 } });
      }

      res.send(result);
    });

    // get survey result by email
    app.get("/survey-result/:email", async (req, res) => {
      const email = req.params.email;
      let query = { userEmail: email };
      const result = await SurveyResultCollection.find(query).toArray();
      res.send(result);
    });

    // payment intent
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      console.log(amount, "amount inside the intent");

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.insertOne(payment);

      res.send({ paymentResult });
    });

    // get all payments data from db
    app.get("/payments", async (req, res) => {
      const result = await paymentCollection.find().toArray();
      res.send(result);
    });

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("survey vista start from index.js");
});

app.listen(port, () => {
  console.log(`survey vista in running on port ${port}`);
});
