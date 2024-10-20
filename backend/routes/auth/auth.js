const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hash,
      role,
    });
    await newUser.save();
    const payload = {
      user: {
        id: newUser.id,
      },
    };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
    );
    res.status(200).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect Password' });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    const token  = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
    );
    res.status(200).json({ message: "Logged In successfully" ,token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
