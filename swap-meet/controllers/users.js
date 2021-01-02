const User = require('../models/user');
const Item = require('../models/item');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
    signup,
    login,
    getMyItems,
};

function createJWT(user) {
    return jwt.sign(
        {user},
        SECRET,
        {expiresIn: '24h'}
    );
}

async function signup(req, res) {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        adminUser: false,
        rating: 0,
        active: true,
        seeking: []
    });
    try {
        await user.save();
        const token = createJWT(user);
        res.json({ token });
    } catch (error) {
        res.status(400).json(error);
    }
}

async function login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(401).json({err: 'bad credentials'});
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          const token = createJWT(user);
          res.json({token});
        } else {
          return res.status(401).json({err: 'bad credentials'});
        }
      });
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  async function getMyItems(req, res) {
    try {
      await Item.find({currentOwner: req.params.id}, function(error, myItems){
        res.status(200).json({ myItems })
      })
    } catch (error) {
      res.status(400).json(error) 
    }
  }
  