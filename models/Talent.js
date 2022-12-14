const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Talent extends Model {}
Talent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      onDelete: 'CASCADE',
    },
    venue_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'venue',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'talent',
  }
);

module.exports = Talent;
