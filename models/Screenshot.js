const {Schema, model} = require('mongoose');

const schema = new Schema({
    img_path: {type: String},
    created_at: {type: Date, default: new Date()}
});

module.exports = model('Screenshot', schema);
