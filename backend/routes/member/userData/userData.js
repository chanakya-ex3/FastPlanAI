const router = require('express').Router();
const User = require('../../../models/User')

router.patch('/skills', async (req, res) => {
  try {
    const { skills, user } = req.body;
    // console.log(user)
    // condition to check if role is TM with id user.id
    const newUser = await User.findOne({ _id: user.id, role: 'TM' });
    if (!newUser) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    newUser.skills = skills;
    await newUser.save();
    res.status(200).json({ message: 'Skills registered successfully' });
    } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
    }
}
);

module.exports = router;