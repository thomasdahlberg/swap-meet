const SwapMeet = require('../models/swapMeet');
const Item = require('../models/item');

module.exports = {
    index,
    addOffer
};


async function addOffer(req, res) {
    let owner;
    Item.findById(req.body.wantItemId, function(err, item){
        owner = item.currentOwner
    });
    const meet = new SwapMeet({
        site: req.body.swapSiteId,
        dateTime: new Date(req.body.dateTime),
        transaction: {
            offerUser: req.body.offerUser,
            offerItem: req.body.offerItemId,
            wantItemUser: req.body.wantItemUser,
            wantItem: req.body.wantItemId
        },
        swapped: false,
        meetAccepted: false,
        active: true
    });
    try {
        await meet.save();
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

