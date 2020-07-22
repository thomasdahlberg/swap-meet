const SwapSite = require('../models/swapSite');

module.exports = {
    showOne,
    linkItem,
    addSite,
    index
};

async function showOne(req, res) {
    try {
        await SwapSite.findById('5f1103c7eec84a2d3815ce7f', function(err, site){
            console.log(site);
            res.status(200).json({ site });
            console.log(err);
        });
    } catch (error) {
       res.status(400).json(error); 
    }
}


async function linkItem(req, res) {
    // console.log(req.body);
    try {
        await SwapSite.findById(req.body.site, function(err, site){
            console.log(req.body.item);
            let pushItem = true;
            site.items.forEach(element => {
                if(element === req.body.item){
                    pushItem = false;
                }
            });
            console.log(pushItem);
            if(pushItem === true){
                site.items.push(req.body.item);
                site.save(); 
                console.log(site);
                res.json({ site });    
            } else {
                alert('Item already listed');
                res.json({ site });
            }
        });
    } catch (error) {
        res.status(400).json(error);
    }
}

async function addSite(req, res) {
    const site = new SwapSite({
        siteName: req.body.siteName,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        address: req.body.address,
        city: req.body.city,
        usState: req.body.usState,
        active: true,
        items: []
    });
    try {
        await site.save();
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