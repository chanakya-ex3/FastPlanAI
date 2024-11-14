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
// update task route
router.post('/update', async (req, res) => {
    const { tasks } = req.body;
    // iterate through tasks
    tasks.forEach(async (task) => {
        // find task by id and update status
        if(task.status){
            // update status
            await Task.findByIdAndUpdate
            (task._id, { status: task.status });
        }
        if(task.assigned_to){
            // update assigned_to
            await Task.findByIdAndUpdate
            (task._id, { assigned_to: task.assigned_to });
        }
        Task
    }
    );
    return res.status(200).json({ message: 'Task updated successfully' });
});
module.exports = router;