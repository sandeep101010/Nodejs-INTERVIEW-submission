const Sequelize = require("sequelize");
const sequelize = require("../util/database");

// Restaurant Model
const Restaurant = sequelize.define("restaurant", {
  restaurantId: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  restaurantName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  vegOnly: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  cost: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cusineType: {
    type: Sequelize.STRING,
    allowNull: false,
    get: function() {
      return JSON.parse(this.getDataValue('cusineType'));
    }, 
    set: function(val) {
      return this.setDataValue('cusineType', JSON.stringify(val));
    }
  },
  isOpen: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Restaurant;
