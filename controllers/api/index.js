const router = require('express').Router();

const userRoutes =require("./userRoutes.js")

const generate = require("./generate.js")

router.use('/users', userRoutes);

router.use('/summarize', generate);



module.exports = router;
