const router = require('express').Router();
const { Configuration, OpenAIApi } = require('openai');
const { User,Task } = require('../../models');

require('dotenv').config();
// Setup API config
const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);
// Generate the AI responses for the overview and work experience



router.get('/:id', async (req, res) => {
    try {



        const SugestData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Task ,where : {id : req.params.id} }
            ]
        });



const taskName = SugestData.tasks[0].name;
const taskDesscription = SugestData.tasks[0].description
const taskDue = SugestData.tasks[0].dueDate
const taskPriority = SugestData.tasks[0].priority

console.log(taskPriority, taskDue)


        const prompt = `i am giving you my task name ${taskName} and description of the task ${taskDesscription} and it is due on ${taskDue} and the priority for this task is ${taskPriority} please give me some suggestions ,tips and important things to remember to finish the task.            
         `

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": prompt }],
            temperature: 0.2,
            max_tokens: 250,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });


       returnData =  response.data.choices[0].message.content
     res.json(returnData).status(200)
    }
        catch (err) {
            res.status(400).json(err);
        }

    })

module.exports = router;