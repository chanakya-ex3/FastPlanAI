const router = require('express').Router();
const Task = require('../../../../models/Task');


router.get('/get', async (req, res) => {
    // get tasks that are assigned_to this user
    console.log(req.body.user.id);
    // oldest tasks first
    const tasks = await Task.find({ assigned_to: req.body.user.id, created_at: { $gte: new Date('2021-01-01') } }).sort({ created_at: 1 });
    return res.status(200).json({tasks});
}
);

module.exports = router;