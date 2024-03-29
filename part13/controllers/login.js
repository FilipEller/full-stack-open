const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { SECRET } = require('../util/config');
const User = require('../models/user');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res.status(401).send({ error: 'username or password missing' });
  }

  const user = await User.findOne({
    where: {
      username,
    },
  });

  const passwordCorrect = password === 'secret';

  if (!(user && passwordCorrect)) {
    return res.status(401).send({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;
