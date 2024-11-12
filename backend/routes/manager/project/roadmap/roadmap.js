const router = require('express').Router();

const genAIModel = require('../../../../gemini/gemini')
const format = require('../../../../datasets/responsetemplate.json');

router.post('/get', async (req, res) => {
    const {projectDescription, techstack, teammembers } = req.body;
    const message = `${projectDescription}. This is my project description and this is my decided tech stack to proceed with ${techstack}.`
    const tune = `Create a complete roadmap for this project following the format given below. No Extra Text! And also assign tasks to team members to their _id (assigned_to field should have that member's _id). My Team Members with their skills are ${JSON.stringify(teammembers)} . If there is anything that user needs to learn in order to complete the task then as another task to learn and mark the flag as L`;
    const roadmap = await genAIModel({message: message, tune: tune, format: format});
    return res.status(200).json(roadmap);

})

module.exports = router;