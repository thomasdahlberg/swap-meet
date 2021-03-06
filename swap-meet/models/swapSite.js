const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const swapSiteSchema = new Schema({
    siteName: String,
    latitude: Number,
    longitude: Number,
    address: String,
    city: String,
    usState: String,
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
    active: Boolean,
},{
    timestamps: true
});

module.exports = mongoose.model('SwapSite', swapSiteSchema);
