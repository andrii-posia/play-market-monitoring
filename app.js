const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const scheduleScreenshots = require('./schedule/screenshots.schedule');
const errorRespondHandler = require('./helpers/errorhandler.helper');

const PORT = config.get('port') || 3333;
const SCREENSHOT_TIMER = config.get('screenShotTimer') || '*/1 * * * *';

const app = express();

app.use(express.json({extended: true}));
app.use(compression({level: 3}));

app.use('/api/apps', require('./routes/apps.routes'));
app.use(errorRespondHandler);

app.use('/assets', express.static(__dirname + '/assets'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'web', 'build')))

    app.get('*', (req, resp) => {
        resp.sendFile(path.resolve(__dirname, 'web', 'build', 'index.html'))
    })
}

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
        console.error(e);
        process.exit(1);
    }
}

start();
