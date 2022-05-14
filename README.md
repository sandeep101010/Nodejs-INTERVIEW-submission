# Restaurant Search 

Stack used: Node-js, Express, MySql, Sequelize

## Connect to MySql Database

To connect to your local mysql database, insert your password in database.js file under util folder and change the database name according to your machine. Currently saved as "restaurant-search".

```bash
nodemon app.js
```

## Contents
app.js - for all the queries and CRUD operations.

index.js - Initializing and Syncing Sequelize and then populating database with sample data

database.js - Connect to Database

restaurant.js - data structure (Model)

```javascript
const express = require("express");
const app = express();

# GET all restaurants from database
app.get("/api/restaurants", (req, res))

# GET restaurants with different filters
app.get("/api/restaurants/veg", (req, res))

# Add new restaurant to database
app.post("/api/restaurants", (req, res))

#UPDATE a restaurant open/close status from an ID of restaurant
app.patch("/api/restaurants/:id/:status", (req, res))

# DELETE a restaurant from database
app.delete("/api/restaurants/:id", (req, res))
```