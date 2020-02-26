const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
    signup
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