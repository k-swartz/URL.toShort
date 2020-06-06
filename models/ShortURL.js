const Mongoose = require('mongoose');
const ShortID = require('shortid');

const ShortURLSchema = new Mongoose.Schema({
    FullURL: {
        type: String,
        required: true
    },
    Short: {
        type: String,
        required: true,
        default: ShortID.generate
    },
    Clicks: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = Mongoose.model('ShortURL', ShortURLSchema);
