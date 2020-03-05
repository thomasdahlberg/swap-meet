const SwapSite = require('../models/swapSite');

module.exports = {
    addSite,
    index
};


async function addSite(req, res) {
    // console.log(req.user);
    const site = new SwapSite({
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
        await SwapSite.save();
        res.json({ site });
    } catch (error) {
        res.status(400).json(error);
    }
}

async function index(req, res) {
    try {
        await SwapSite.find({},function(err, sites){
            res.status(200).json({ sites });
        });
    } catch (error) {
       res.status(400).json(error); 
    }
}