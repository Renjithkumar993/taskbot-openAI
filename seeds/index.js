const sequelize = require('../config/connection');
const userSeed= require("./user-seeds")
const seedTasks = require("./task-seed")


 const seedAll  = async () => {
    await sequelize.sync({ force: true});
      await userSeed();
      console.log('Seed data for users table inserted successfully.');
       await seedTasks();
  console.log('Seed data for task table inserted successfully.');
      process.exit
  }

  seedAll();