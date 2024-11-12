const router = require('express').Router();

const genAIModel = require('../../../../gemini/gemini')

router.post('/get', async (req, res) => {
    const {projectDescription } = req.body;
    const tune = `This is my project Description.Suggest Various techstacks that can be used. give as per the format No extra text.`;
    const format = "{'techStack':[[Tech Stack 1], [Tech Stack 2], [Tech Stack 3].. [Tech Stack n]]}";
    const techStacks = await genAIModel({message: projectDescription, tune: tune,format:format});
    return res.status(200).json(techStacks);
}
);

module.exports = router;