const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const session = require('express-session');

const withAuth = require('../../utils/auth');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Logout
router.put('/logout', (req, res) => {
  console.log("data")
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Remembering the id of the user in session`
    req.session.save(() => {
    
    req.session.user_id = dbUserData.dataValues.id

      res.sendStatus(200)
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
      where: {id: req.params.id}
  })
  .then(userData => {
      if(!userData) {
          res.status(404).json({ message: 'no user found with provided information'})
          return;
      }
      res.json(userData);
  })
  .catch(err=> {
      console.log(err);
      res.status(500).json(err)
  })
})


// Login
router.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email. Please try again!' });
      return;
    }
     console.log(dbUserData.password)
    const validPassword = await dbUserData.checkPassword(req.body.password, dbUserData.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password. Please try again!' });
      return;
    }

    // Remembering the id of the user in session'
    req.session.save(() => {    
        req.session.user_id = dbUserData.dataValues.id    
          res.sendStatus(200)
        });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;

