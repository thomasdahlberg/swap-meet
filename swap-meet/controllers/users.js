const User = require('../models/user');

module.exports = {
    signup
};

async function signup(req, res) {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            adminUser: false,
            rating: 0,
            active: true,
            seeking: []
        });
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}