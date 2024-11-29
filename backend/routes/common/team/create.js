const router = require('express').Router();
const Team = require('../../../models/Team');
const User = require('../../../models/User');

router.post('/', async (req, res) => {
  try {
    const { name, user } = req.body;
    const manager = await User.findOne({ _id: user.id });
    if (manager.role !== 'PM') {
      return res.status(400).json({ message: 'User is not a Project Manager' });
    }
    const team = await Team.findOne({ name });
    if (team) {
      return res.status(400).json({ message: 'Team already exists' });
    }
    const newTeam = new Team({
      name,
      manager,
    });
    await newTeam.save();
    await User.findOneAndUpdate({ _id: user.id }, { team: newTeam._id });
    res
      .status(200)
      .json({ message: 'Team created successfully', code: newTeam._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
