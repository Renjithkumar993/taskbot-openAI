const { Task } =  require("../models")

const taskSeeds = [
  {
    name: 'Task 1',
    priority: 'low',
    taskUsername: 1,
    dueDate: '2023-05-31',
    description: 'Task 1 description',
  },
  {
    name: 'Task 2',
    priority: 'medium',
    taskUsername: 1,
    dueDate: '2023-06-15',
    description: 'Task 2 description',
  },
  {
    name: 'Task 3',
    priority: 'high',
    taskUsername: 1,
    dueDate: '2023-07-01',
    description: 'Task 3 description',
  },
];

const seedTasks = () => Task.bulkCreate(taskSeeds);

module.exports = seedTasks;
