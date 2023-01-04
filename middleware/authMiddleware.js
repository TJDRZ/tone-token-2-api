const { client } = require("../config/db");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await client.query(
          `SELECT * FROM players WHERE _id = '${decoded._id}';`
        );
        delete user.rows[0].password;
        req.user = user.rows[0];
        next();
      } catch (err) {
        res.status(401).json({ message: "Not authorized", error: err.message });
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to get current user", error: err.message });
  }
};

module.exports = { protect };
