const App = require('../models/App');
const Screenshot = require('../models/Screenshot');
const schedule = require('node-schedule');
const Pageres = require('pageres');
const fs = require('fs');

const scheduleScreenshots = (timer) => {
    const job = schedule.scheduleJob(timer, function(){
        console.log('Time to make screenshots ' + new Date());
        makeScreenshots();
    });
}

const makeScreenshots = async () => {
    try {
        const apps = await App.find({});

        if (apps) {
            apps.map((app) => {
                makeScreenshot(app)
            });
        }
    } catch (e) {}
};

const makeScreenshot = async (app) => {
    try {
        const dir = `./assets/screenshots/${app.name}`;
        createNewDirectory(dir);

        const imgName = `${new Date().getTime()}`;
        await new Pageres({delay: 5})
            .src(app.url, ['1280x1024'], {filename: imgName, format: 'jpg'})
            .dest(dir)
            .run();

        saveScreenShot(app, imgName + '.jpg');
    } catch (e) {}
};

const saveScreenShot = async (app, img) => {
    try {
        const screenshot = new Screenshot({img, app: app._id, time: new Date()});
        await screenshot.save();

        app.screenshots.push(screenshot);
        app.save();
    } catch (e) {}
};

const createNewDirectory = (dir) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
}


module.exports = scheduleScreenshots;
