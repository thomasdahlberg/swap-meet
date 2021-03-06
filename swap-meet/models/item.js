const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const itemSchema = new Schema({
    name: String,
    description: String,
    image: String,
    itemType: String,
    swapPref: Object,
    active: Boolean,
    location: Object,
    swapped: Boolean,
    currentOwner: {type: Schema.Types.ObjectId, ref: 'User'},
    ownerHistory:[{type: Schema.Types.ObjectId, ref: 'User'}]
},{
    timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);