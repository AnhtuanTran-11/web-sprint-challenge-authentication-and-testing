const User = require("../jokes/jokes-model");

async function checkUserAndPassword(req, res, next) {
  try {
    const users = await User.findBy({ username: req.body.username });
    if (!users.length) {
      next();
    } else {
      next({ message: "username taken", status: 422 });
    }
  } catch (err) {
    next(err);
  }
}

function checkPassword(req, res, next) {
  if (!req.body.password) {
    next({ message: "Password must be longer than 3 chars", status: 422 });
  } else {
    next();
  }
}

module.exports = {
  checkUsernameFree,
};
