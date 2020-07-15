const SwapSite = require('../models/swapSite');

module.exports = {
    linkItem,
    addSite,
    index
};

async function linkItem(req, res) {
    console.log(req.body);
    try {
        await SwapSite.findById(req.body.site, function(err, site){
            site.items.push(req.body.item);
            site.save(); 
            console.log(site);
            res.json({ site });
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