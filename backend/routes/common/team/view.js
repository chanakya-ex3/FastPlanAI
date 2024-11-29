const router = require('express').Router();
const Team = require('../../../models/Team');
const User = require('../../../models/User');

router.get('/', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.user.id });
    if (user.role == 'PM') {
      const team_mgr = await Team.findOne({ manager: req.body.user.id }).populate('members').populate('manager');
      return res
        .status(200)
        .json(
          team_mgr !== null
            ? { team: team_mgr, inteam: true }
            : { message: 'No team found', inteam: false }
        );
    }

    // if user.id is in team.members show team
    const team = await Team.findOne({ members: req.body.user.id }).populate('members').populate('manager');
    return res
      .status(200)
      .json(
        team !== null
          ? { team, inteam: true }
          : { message: 'No team found', inteam: false }
      );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
