
const { route } = require("./api");
const router = require("express").Router();
const {User,Task,CompletedTask} =  require("../models")
const dayjs = require('dayjs');




router.get('/', (req, res) => {
    res.render('homepage', {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    })
  });





  router.get('/login', (req, res) => {

    if (!req.session.logged_in) {
      res.render('loginsignup')
    }
    else {
      res.redirect('/dashboard');
    }
  });




  router.put('/home/edittask/:id', async (req, res) => {
    const taskId = req.params.id;
    const taskData = req.body.taskData;
  

    try {
      const taskToUpdate = await Task.findOne({ where: { id: taskId } });
  
      if (!taskToUpdate) {
        return res.status(404).json({ error: 'Task not found' });
      }
      await taskToUpdate.update({
        name: taskData.name,
        priority: taskData.priority,
        dueDate: taskData.dueDate,
        description: taskData.description
      });

      res.json(taskToUpdate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  

router.get("/home", async (req, res) => {
  if (!req.session.logged_in) {
    res.render('loginsignup');
  } else {
    try {
      const user = await User.findByPk(req.session.user_id, {
        include: [{ model: Task , include :{model : CompletedTask ,include : {model:Task}}}]
      });



      const allData = user.get({ plain: true });
      const colorClasses = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];

   

      const today = dayjs();
      const dueTodayTasks = allData.tasks.filter(task => {
        const dueDate = dayjs(task.dueDate);
        return dueDate.isSame(today, 'day');
      });
      
  

      res.render('chatbot', {
        ...allData,
        colorClasses,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
        dueTodayTasks
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});






router.post("/home/complete-task", async (req, res) => {
  const { taskId } = req.body;
  const userId = req.session.user_id;

  try {
    const existingCompletedTask = await CompletedTask.findOne({
      where: { task_id: taskId, user_id: userId }, 
    });

    if (existingCompletedTask) {
      return res.status(400).json({ error: "Task is already completed." });
    }

    const completedTask = await CompletedTask.create({ task_id: taskId, user_id: userId });

    res.sendStatus(200);
  } catch (error) {
    console.error("Error completing task:", error);
    res.sendStatus(500);
  }
});



router.get("/learn" ,async (req,res) =>{

  res.render("lernmore")
})









router.post("/home/newtask", async (req, res) => {
  try {
    const data = req.body.taskData;

    const addTask = await Task.create({
      name: data.name,
      priority: data.priority,
      user_id: req.session.user_id,
      dueDate: data.dueDate,
      description: data.description
    });

    res.status(200).json({ addTask });
  } catch (error) {
    res.status(500).json({ message: "Unable to create task", error: error.message });
  }
});




router.delete("/home/deletetask/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const deletedTask = await Task.destroy({ where: { id: taskId } });

    if (deletedTask) {
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to delete task", error: error.message });
  }
});




module.exports = router;