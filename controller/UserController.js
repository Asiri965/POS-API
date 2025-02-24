const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/UserSchema");
const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
  const { username, password, fullname, role } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: "already exists", data: null });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hash(password, salt);
    const createdUser = new User({
      username,
      password: hashPassword,
      fullname,
      role,
      isActive: true,
    });
    await createdUser.save();
    res.status(201).json({ message: "user saved..", data: null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });
  if (!userExists) {
    return res.status(404).json({ message: "not found", data: null });
  }

  const isMatch = await bcrypt.compare(password, userExists.password);
  if (!isMatch) {
    return res.status(403).json({ message: "wrong password", data: null });
  }

  const payload = {
    userId: userExists._id,
    username: userExists.userName,
    role: userExists.role,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  return res.status(200).json({ message: "success", data: { token: token } });
};

module.exports = { signup, login };
