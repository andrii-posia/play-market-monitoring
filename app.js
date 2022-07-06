const express = require('express');
const path = require('path');
const config = require('config');
const mongoose = require('mongoose');
const scheduleScreenshots = require('./schedule/screenshots.schedule');

const app = express();

app.use(express.json({extended: true}));

app.use('/api/apps', require('./routes/apps.routes'));

app.use('/assets', express.static(__dirname + 'assets'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'web', 'build')))

    app.get('*', (req, resp) => {
        resp.sendFile(path.resolve(__dirname, 'web', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 3333;
const SCREENSHOT_TIMER = config.get('screenShotTimer') || '*/5 * * * *';

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        //run schedule
        scheduleScreenshots(SCREENSHOT_TIMER);

        app.listen(PORT, () => console.log(`Started on port: ${PORT}...`))
    } catch (e) {
        console.log(e.messages);
        console.log(e);
        process.exit(1);
    }
}

start();
