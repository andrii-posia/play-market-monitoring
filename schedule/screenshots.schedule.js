const schedule = require('node-schedule');
const {makeScreenshots} = require('../services/screenshot.service');

const scheduleScreenshots = (timer) => {
    const job = schedule.scheduleJob(timer, function(){
        console.log('Time to make screenshots ' + new Date());
        makeScreenshots();
    });
};

module.exports = scheduleScreenshots;
