const router = require("express").Router();
const login = require('./Login/login');
const signup = require("./Signup/signup")


router.post("/login", login);
// router.post
router.post("/signup",signup)


module.exports = router;
