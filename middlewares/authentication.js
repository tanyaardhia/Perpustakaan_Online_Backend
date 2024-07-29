const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/");

async function authentication(req, res, next) {
  try {
    let access_token = req.headers.authorization;
    console.log(access_token, "authen middle");

    if (!access_token) {
      console.log("dari authen middlewares 1");
      throw { name: "InvalidToken" };
    }
    if (access_token.slice(0, 7) !== "Bearer ") {
      console.log("dari authen middlewares 2");
      throw { name: "InvalidToken" };
    }

    access_token = access_token.slice(7);
    let payload = verifyToken(access_token);
    // console.log(payload, ">> pyl");

    let user = await User.findByPk(payload.id);
    // console.log(user,"user nic");
    if (!user) {
      console.log("dari authen middlewares 3");
      throw { name: "InvalidToken" };
    }

    req.user = { id: user.id };

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "InvalidToken" || error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json(error);
  }
}
module.exports = authentication;
