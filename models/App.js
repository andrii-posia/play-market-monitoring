const {Schema, model} = require('mongoose');

const schema = new Schema({
    url: {type: String, required: true, unique: true},
    start_time: {type: Date, default: new Date()},
    name: {type: String, required: true, unique: true},
    screenshots: [{
        type: Schema.Types.ObjectId,
        ref: 'Screenshot',
    }]
})

module.exports = model('App', schema);
