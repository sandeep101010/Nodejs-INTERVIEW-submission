const Sequelize = require("sequelize");

// Connect to Database
const sequelize = new Sequelize("restaurant-search", "root", "password", {
  dialect: "mysql",
  host: "localhost",
});

// Check Connection
checkConnection();

async function checkConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = sequelize;
