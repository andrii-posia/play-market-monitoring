const {Schema, model} = require('mongoose');

const schema = new Schema({
    img: {type: String},
    time: {type: Date, default: new Date()},
    app: {
        type: Schema.Types.ObjectId,
        ref: 'App'
    }
})

module.exports = model('Screenshot', schema);
