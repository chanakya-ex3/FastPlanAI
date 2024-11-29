const router = require('express').Router();
const Team = require('../../../models/Team');
const User = require('../../../models/User');



router.patch('/', async (req, res) => {
  try {
    const { code, user } = req.body;
    const team = await Team.findOne({ _id: code });
    if (!team) {
      return res.status(400).json({ message: 'Team does not exist' }, {inteam: false});
    }
    const userData = await User.findOne({ _id: user.id });
    if (team.members.includes(user.id)) {
      return res.status(400).json({ message: 'User is already in the team' });
    }
    team.members.push(userData);
    await team.save();
    await User.findOneAndUpdate({ _id: user.id }, { team: team._id });
    res.status(200).json({ message: 'User joined team successfully',inteam: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error',inteam: false });
  }
});


module.exports = router;
