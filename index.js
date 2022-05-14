const sequelize = require("./util/database");
const Restaurant = require("./models/restaurant");

// Initializing and Syncing Sequelize and then populating database with sample data
sequelize
  .sync({ force: true })
  .then((result) => {
    console.log(result);
    console.log("Sample database created with 3 restaurants")
    Restaurant.create({restaurantName: "Indian Coffee House", address: "Devendra Nagar",
      vegOnly: true, cost:"Medium", cusineType: ["South Indian", "Chinese"], isOpen: true})
    Restaurant.create({restaurantName: "Nutrihealth Box", address: "Shankar Nagar",
      vegOnly: false, cost:"High", cusineType: ["Continental"], isOpen: true})
    Restaurant.create({restaurantName: "Rasoi", address: "Mowa Raipur",
      vegOnly: true, cost:"Low", cusineType: ["North Indian", "Chinese", "Italian"], isOpen: true})
  })
  .catch((err) => {
    console.log(err);
  });