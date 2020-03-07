const Item = require('../models/item');

module.exports = {
    showOne,
    addItem,
    index
};

async function showOne(req, res) {
    try {
        await Item.findByIdAndUpdate(req.body.itemId, function(err, item){
            res.status(200).json({ item });
        });
    } catch (error) {
       res.status(400).json(error); 
    }
}

async function addItem(req, res) {
    // console.log(req.user);
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        itemType: req.body.itemType,
        swapPref: req.body.swapPref,
        active: true,
        location: null,
        swapped: false,
        currentOwner: req.user,
        ownerHistory: [req.user]
    });
    try {
        await item.save();
        res.json({ item });
    } catch (error) {
        res.status(400).json(error);
    }
}

async function index(req, res) {
    try {
        await Item.find({}, function(err, items){
            res.status(200).json({ items });
        });
    } catch (error) {
       res.status(400).json(error); 
    }
}