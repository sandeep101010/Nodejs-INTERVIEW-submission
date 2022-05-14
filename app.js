const express = require("express");
const app = express();
const Restaurant = require("./models/restaurant");
require('./index');
const { Op } = require("sequelize");

app.use(express.json());

// Root
app.get("/", (req, res) => {
  res.send("Welcome to Restaurant Search");
});

// GET all restaurants from database
app.get("/api/restaurants", (req, res) => {
  Restaurant.findAll({ raw: true }).then(function(err, restaurants) {
    if(err) {
      res.status(404).send(err);
      console.log(err);
    } else {
    console.log(restaurants);
    res.status(200).send(restaurants);
    }
  });
});

// GET restaurants with different filters
app.get("/api/restaurants/veg", (req, res) => {
  Restaurant.findAll({ where: {vegOnly: true}}).then(function(err, result){
    if(err) {
      res.status(404).send(err);
      console.log(err);
    } else {
    console.log(result);
    res.status(200).send(result);
    }
  });
});
app.get("/api/restaurants/lowcost", (req, res) => {
  Restaurant.findAll({ where: {cost: 'Low'}}).then(function(err, result){
    if(err) {
      res.status(404).send(err);
      console.log(err);
    } else {
    console.log(result);
    res.status(200).send(result);
    }
  });
});
app.get("/api/restaurants/lowcostfrench", (req, res) => {
  Restaurant.findAll({ where: {cost: 'Low', cusineType: { [Op.or]: ["french"] }}}).then(function(err, result){
    if(err) {
      res.status(404).send(err);
      console.log(err);
    } else {
    console.log(result);
    res.status(200).send(result);
    }
  });
});

// Add new restaurant to database
app.post("/api/restaurants", (req, res) => {
  const restaurantName = req.body.restaurantName;
  const address = req.body.address;
  const vegOnly = req.body.vegOnly;
  const cost = req.body.cost;
  const cusineType = req.body.cusineType;
  const isOpen = req.body.isOpen;

  Restaurant.create({restaurantName: restaurantName, address: address,
    vegOnly: vegOnly, cost: cost, cusineType: cusineType, isOpen: isOpen}).then(function(err, result) {
      if(err) {
          res.status(404).send(err);
          console.log(err);
      } else {
          res.status(200).send(result);
          console.log(result);
      }
    });
});

// UPDATE a restaurant open/close status from an ID of restaurant
app.patch("/api/restaurants/:id/:status", (req, res) => {
  const getRestaurantId = req.params.id;
  const isOpenStatus = (req.params.status === 'true');
  Restaurant.update({ isOpen: isOpenStatus }, {
    where: {
      restaurantId: getRestaurantId
    }
  }).then(function(err, result){
    if(err) {
      res.status(404).send(err);
      console.log(err);
  } else {
      res.status(200).send(result);
      console.log(result);
  }
  });
});

// DELETE a restaurant from database
app.delete("/api/restaurants/:id", (req, res) => {
  const getRestaurantId = req.params.id;
  Restaurant.destroy({
    where: {
      restaurantId: getRestaurantId
    }
  }).then(console.log("Deleted"));
  res.send("Deleted");
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
