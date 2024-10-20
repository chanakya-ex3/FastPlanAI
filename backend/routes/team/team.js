const router = require('express').Router();
const Team = require('../../models/Team');
const User = require('../../models/User');

router.post('/create', async (req, res) => {
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

router.patch('/join', async (req, res) => {
  try {
    const { code, user } = req.body;
    const team = await Team.findOne({ _id: code });
    if (!team) {
      return res.status(400).json({ message: 'Team does not exist' });
    }
    const userData = await User.findOne({ _id: user.id });
    if (team.members.includes(user.id)) {
      return res.status(400).json({ message: 'User is already in the team' });
    }
    team.members.push(userData);
    await team.save();
    await User.findOneAndUpdate({ _id: user.id }, { team: team._id });
    res.status(200).json({ message: 'User joined team successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/view', async (req, res) => {
  try {
    // if user.id is in team.members show team
    const team = await Team.findOne({ members: req.body.user.id });
    res.status(200).json(team !== null ? team : { message: 'No team found' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
