const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const swapMeetSchema = new Schema({
    site: {type: Schema.Types.ObjectId, ref: 'SwapSite'},
    swapped: Boolean,
    dateTime: Date,
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
    active: Boolean,
    meetAccepted: Boolean
},{
    timestamps: true
});

module.exports = mongoose.model('SwapMeet', swapMeetSchema);
