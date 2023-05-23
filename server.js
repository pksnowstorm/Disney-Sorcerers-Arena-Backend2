///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4000
// pull MONGODB_URL from .env
const { PORT = 4000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const NewsSchema = new mongoose.Schema({
    date: String,
    description: String,
});

const News = mongoose.model("News", NewsSchema);

const SpellsSchema = new mongoose.Schema ({
    name: String,
    description: String,
    farm: String
})

const Spells = mongoose.model("Spells", SpellsSchema);

const ClubSchema = new mongoose.Schema({
    name: String,
    members: Number,
    clubExpeditionTier: String,
    forbiddenDepthsRaidTier: String,
    siegeOfOlympusTier: String,
    alliance: String,
    contactInfo: String
});

const Club = mongoose.model("Club", ClubSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("hello world");
});

// NEWS INDEX ROUTE
app.get("/news", async (req, res) => {
    try {
        // send all people
        res.json(await News.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// NEWS CREATE ROUTE
app.post("/news", async (req, res) => {
    try {
        // send all people
        res.json(await News.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// NEWS DELETE ROUTE
app.delete("/news/:id", async (req, res) => {
    try {
      // send all people
      res.json(await News.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // NEWS UPDATE ROUTE
  app.put("/news/:id", async (req, res) => {
    try {
      // send all people
      res.json(
        await News.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

  // Spells INDEX ROUTE
app.get("/spells", async (req, res) => {
    try {
        // send all people
        res.json(await Spells.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// SPELLS CREATE ROUTE
app.post("/spells", async (req, res) => {
    try {
        // send all people
        res.json(await Spells.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// SPELLS DELETE ROUTE
app.delete("/spells/:id", async (req, res) => {
    try {
      // send all people
      res.json(await Spells.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // Spells UPDATE ROUTE
  app.put("/spells/:id", async (req, res) => {
    try {
      // send all people
      res.json(
        await Spells.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

  // Club INDEX ROUTE
  app.get("/club", async (req, res) => {
    try {
        // send all people
        res.json(await Club.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

  //Club Create Route
app.post("/club", async (req, res) => {
    try {
        res.json(await Club.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

//Club Delete Route
app.delete("/club/:id", async (req, res) =>{
    try {
        res.json(await Club.findByIdAndRemove(req.params.id))
    } catch(error) {
        res.status(400).json(error)
    }
})

//Club Update Route
app.put("/club/:id", async (req, res) => {
    try {
        res.join(await Club.findByIdAndUpdate(req.params.id, req.body, {new: true}));
    } catch (error) {
        res.status(400).json(error);
    }
})

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));