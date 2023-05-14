

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');



class Task extends Model {}


Task.init(
{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
    },
    user_id :{
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
    },
},
    dueDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "task",
  }
);

module.exports = Task;