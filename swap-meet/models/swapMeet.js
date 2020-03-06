const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    offerUser: {type: Schema.Types.ObjectId, ref: 'User'},
    offerItem: {type: Schema.Types.ObjectId, ref: 'Item'},
    wantItemUser: {type: Schema.Types.ObjectId, ref: 'User'},
    wantItem: {type: Schema.Types.ObjectId, ref: 'Item'},
},{
    timestamps: true
});

const swapMeetSchema = new Schema({
    site: {type: Schema.Types.ObjectId, ref: 'SwapSite'},
    swapped: Boolean,
    dateTime: Date,
    transaction: transactionSchema,
    active: Boolean,
    meetAccepted: Boolean
},{
    timestamps: true
});

module.exports = mongoose.model('SwapMeet', swapMeetSchema);
