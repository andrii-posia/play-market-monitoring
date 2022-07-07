const {Schema, model} = require('mongoose');
const Pageres = require('pageres');
const createNewDirectory = require('../helpers/createdirectory.helper');
const Screenshot = require('../models/Screenshot');

const schema = new Schema({
    url: {type: String, required: true, unique: true},
    start_time: {type: Date, default: new Date()},
    name: {type: String, required: true, unique: true},
    screenshots: [{
        type: Schema.Types.ObjectId,
        ref: 'Screenshot',
    }]
});

schema.statics.makeScreenshot = async (app) => {
    const saveScreenShot = async (app, img_path) => {
        try {
            const screenshot = new Screenshot({img_path, app: app._id, created_at: new Date()});
            await screenshot.save();

            app.screenshots.push(screenshot);
            app.save();
        } catch (e) {
            console.error(e);
        }
    };

    try {
        const dir = `./assets/screenshots/${app.name}`;
        createNewDirectory(dir);

        const imgName = `${new Date().getTime()}`;

        await new Pageres({delay: 5})
            .src(app.url, ['1280x1024'], {filename: imgName, format: 'jpg'})
            .dest(dir)
            .run();

        await saveScreenShot(app, imgName + '.jpg');
    } catch (e) {
        console.error('Cannot make screenshot');
        console.error(e);
    }
};

module.exports = model('App', schema);
