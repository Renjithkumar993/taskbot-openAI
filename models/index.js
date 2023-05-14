const User = require("./user")
const Task = require("./task");
const CompletedTask = require("./completed");



User.hasMany(Task, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });

Task.belongsTo(User,{
    foreignKey: "user_id"
})

Task.hasOne(CompletedTask, {
  foreignKey: "task_id",
  onDelete: "CASCADE",
});
CompletedTask.belongsTo(Task,{
  foreignKey: "task_id"
})


module.exports = { User, Task,CompletedTask}