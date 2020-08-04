const SwapMeet = require('../models/swapMeet');

module.exports = {
    updateOne,
    showOne,
    index,
    addOffer
};

async function updateOne(req, res) {
    try {
        if(req.body.name === "agree"){
            SwapMeet.findByIdAndUpdate(req.params.id, {
                meetAccepted: true
            }, function(error, meet){
                console.log(meet);
                res.status(200).json({ meet });
                console.log(error);
            });
        } 
        else if(req.body.dateTime){
            SwapMeet.findByIdAndUpdate(req.params.id, {
                dateTime: req.body.dateTime,
                counterOffer: true,
                meetAccepted: true
            }, function(error, meet){
                console.log(meet);
                res.status(200).json({ meet });
                console.log(error);
            });
        } else {
            SwapMeet.findByIdAndUpdate(req.params.id, {
                active: false
            }, function(error, meet){
                console.log(meet);
                res.status(200).json({ meet });
                console.log(error);
            });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

async function showOne(req, res) {
    try {
        await SwapMeet.findById(req.params.id, function(err, meet){
            console.log(meet);
            res.status(200).json({ meet });
            console.log(err);
        });
    } catch (error) {
       res.status(400).json(error); 
    }
}

async function addOffer(req, res) {
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
        await SwapMeet.find({active: true},function(err, meets){
            res.status(200).json({ meets });
        });
    } catch (error) {
       res.status(400).json(error); 
    }
}

