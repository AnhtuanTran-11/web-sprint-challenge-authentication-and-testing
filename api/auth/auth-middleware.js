const User = require("../jokes/jokes-model");

async function checkUserAndPassword(req, res, next) {
  try {
    const users = await User.findBy({ username: req.body.username });
    if (!users.length) {
      next();
    } else {
      next({ message: "username taken"});
    }
  } catch (err) {
    next(err);
  }
}

async function checkUsernameFree(req, res, next) {
  try {
    const users = await User.findBy({ username: req.body.username });
    if (!users) {
      next();
    } else {
      res.json({
        message: "username taken"
      })
      next()
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkUserAndPassword,
  checkUsernameFree
};
