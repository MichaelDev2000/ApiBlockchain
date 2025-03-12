const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    height: { type: Number, required: true },
    body: {type:String,required:true },
    time: { type: String, required: true },
    previousBlockHash: { type: String, default: null }
});

const Block = mongoose.model("Block", BlockSchema);

module.exports = Block;