const { putCreateAccount } = require("../../../Database/auth");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signup = async (req, res) => {
  const { email, password, name, role } = req.body;
  const user = {
    email: { S: email },
    name: { S: name },
    password: { S: password },
    role: { S: role },
  };
  const register = await putCreateAccount(user);
  if (register.error) {
    res.send(register);
    return register;
  }
  const token = jwt.sign(user, process.env.MY_SECRET, { expiresIn: "2m" });
  res.cookie("token", token, {
    httpOnly: true,
  });
  res.send({ message: register.message, cookie: token });
};

module.exports = signup;
