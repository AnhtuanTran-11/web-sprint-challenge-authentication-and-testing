const User = require("../jokes/jokes-model");

async function checkUserAndPassword(req, res, next) {
  const {username , password} = req.body
  if (!username || !password) {
    res.status(422).json({
      message: "username and password required"
    })
  } else {
    next()
  }
}

async function checkUsernameFree(req, res, next) {
  try {
    const users = await User.findBy({ username: req.body.username });
    if (!users.length) {
      next();
    } else {
      res.status(422).json({
        message: "username taken"
      })
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkUserAndPassword,
  checkUsernameFree
};
