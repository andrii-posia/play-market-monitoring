const schedule = require('node-schedule');
const App = require('../models/App');

const scheduleScreenshots = (timer) => {
    schedule.scheduleJob(timer, function(){
        console.log('Time to make screenshots ' + new Date());

        makeScreenshots();
    });
};

const makeScreenshots = async () => {
    const maxTimeToWait = 60 * 1000; // 1 min

    try {
        const apps = await App.find({});

        if (apps) {
            apps.map((app) => {
                const randomTime = Math.random() * maxTimeToWait;

                setTimeout(() => App.makeScreenshot(app), randomTime);
            });
        }
    } catch (e) {
        console.error(e);
    }
};

module.exports = scheduleScreenshots;
