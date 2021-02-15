'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class theGigs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  theGigs.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    title: DataTypes.STRING,
    technologies: DataTypes.STRING,
    budget: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    contact_email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'theGigs',
  });
  return theGigs;
};