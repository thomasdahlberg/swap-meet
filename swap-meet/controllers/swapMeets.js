const SwapMeet = require('../models/swapMeet');

module.exports = {
    index
};


async function createMeet(req, res) {
    // console.log(req.user);
    const meet = new SwapMeet({
    //     name: req.body.name,
    //     description: req.body.description,
    //     image: req.body.image,
    //     itemType: req.body.itemType,
    //     swapPref: req.body.swapPref,
    //     active: true,
    //     location: null,
    //     swapped: false,
    //     currentOwner: req.user,
    //     ownerHistory: [req.user]
    });
    try {
        await SwapMeet.save();
        res.json({ meet });
    } catch (error) {
        res.status(400).json(error);
    }
}

async function index(req, res) {
    try {
        await SwapMeet.find({},function(err, meets){
            res.status(200).json({ meets });
        });
    } catch (error) {
       res.status(400).json(error); 
    }
}