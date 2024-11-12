const router = require('express').Router();
const mongoose = require('mongoose');
const Project = require('../../../../models/Project');
const Milestone = require('../../../../models/Milestone');
const Task = require('../../../../models/Task');
const Team = require('../../../../models/Team');
const User = require('../../../../models/User');


router.post('/create',async (req,res)=>{
    const session = await mongoose.startSession(); // Start a new session for the transaction
    session.startTransaction(); // Start a transaction
    
    try {
        const { project_name, description, start_date, end_date, roadmap } = req.body.project;
        const { tech_stack} = req.body;


        // Map through the roadmap and create milestones and tasks within the transaction
        const milestones = await Promise.all(
            roadmap.map(async (milestoneData) => {
                const tasks = await Promise.all(
                    milestoneData.tasks.map(async (taskData) => {
                        // Create each task inside the transaction
                        const user = await User.findOne({ _id: taskData.assigned_to });
                        const task = new Task({
                            name: taskData.name,
                            description: taskData.description,
                            assigned_to: user,
                            estimated_time: taskData.estimated_time,
                            flags: taskData.flags.type,
                        });
                        return task.save({ session }); // Save task to the database using the session
                    })
                );

                // Create each milestone with the associated tasks inside the transaction
                const milestone = new Milestone({
                    milestone: milestoneData.milestone,
                    deadline: milestoneData.deadline,
                    tasks, // Attach the saved tasks
                });
                return milestone.save({ session }); // Save milestone using the session
            })
        );

        // Create the project with the associated milestones inside the transaction
        const project = new Project({
            project_name,
            description,
            tech_stack,
            start_date,
            end_date,
            roadmap: milestones, // Attach the saved milestones
        });
        await project.save({ session }); // Save the project using the session

        // also update project reference in team
        const user = await User.findOne({ _id: req.body.user.id });
        teamid = user.team;
        await Team.findOneAndUpdate({ _id:teamid}, { project: project._id }, { session });


        // Commit the transaction if everything is successful
        await session.commitTransaction();
        session.endSession(); // End the session

        res.status(201).json({ message: 'Project created successfully', project });

    } catch (error) {
        // Abort the transaction if any error occurs
        await session.abortTransaction();
        session.endSession(); // End the session

        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Error creating project', error });
    }
})

// get details
router.get('/get', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.user.id });
        team = await Team.findOne({ _id: user.team });
        project_id = team.project;
        const project = await Project.findOne({ _id: project_id }).populate({
            path:'roadmap',
            populate:{
                path:'tasks',
                populate: {
                    path:'assigned_to'
                }
            }
        });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json(project);
    } catch (error) {
        console.error('Error getting project:', error);
        res.status(500).json({ message: 'Error getting project', error });
    }
})



module.exports = router;
