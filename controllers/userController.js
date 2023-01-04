const { client } = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uniqid = require("uniqid");

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const existingUser = await client.query(
      `SELECT email FROM players WHERE EXISTS(SELECT email FROM players WHERE email = '${email}');`
    );
    if (existingUser.rowCount !== 0) {
      res.status(400);
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const _id = uniqid();
    await client.query(
      `INSERT INTO players (_id, email, password) VALUES ('${_id}', '${email}', '${hashedPassword}');`
    );
    res
      .status(201)
      .json({ message: "User added successfully", token: generateToken(_id) });
  } catch (err) {
    res.status(400).json({ message: "Failed to add user", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await client.query(
      `SELECT * FROM players WHERE email = '${email}';`
    );
    if (user.rowCount === 0) {
      res.status(400);
      throw new Error("User does not exist");
    }
    if (user && (await bcrypt.compare(password, user.rows[0].password))) {
      res.status(200).json({
        message: "User logged in successfully",
        token: generateToken(user.rows[0]._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid password");
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to login user", error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(400).json({ message: "User not found", error: err.message });
  }
};

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
