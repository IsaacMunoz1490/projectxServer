const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    // meta: { //defining the likes or heart for future reference.
    //     votes: Number,
    //     favs: Number
    // },
}, {
    timestamps: true
});

const Shoes = mongoose.model('Shoes', shoesSchema);

module.exports = Shoes; 