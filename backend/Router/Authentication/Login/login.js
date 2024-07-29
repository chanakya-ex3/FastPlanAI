const { getLoginDetails } = require("../../../Database/auth");
const jwt = require("jsonwebtoken");
const dovenv = require("dotenv");

dovenv.config();
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getLoginDetails({ email: email });
  console.log(password)
  console.log(user.password.S)
  if (user.password.S !== password) {
    return res.status(403).json({
      error: "Invalid password",
    });
  }
  delete user.password;
  const token = jwt.sign(user, process.env.MY_SECRET, { expiresIn: "2m" });
  res.cookie("token", token, {
    httpOnly: true,
  });
  res.send(token);
};

module.exports = login;
