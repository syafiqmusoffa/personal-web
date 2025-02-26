'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.User, {
        foreignKey: "authorId",
        as: "user",
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      })
    }
  }
  Project.init({
    authorId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    content: DataTypes.TEXT,
    technoligies: DataTypes.STRING,
    startAt: DataTypes.STRING,
    endAt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};