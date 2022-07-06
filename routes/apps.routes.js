const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const App = require('../models/App');
const {makeScreenshot} = require('../services/screenshot.service');
const config = require('config');
const router = Router();

router.post(
    '/',
    [check('url', 'Incorrect App URL').isURL()],
    async (req, resp) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return resp.status(400).json({errors: errors.array(), message: 'Incorrect input'});

        const {url} = req.body;
        const existedApp = await App.findOne({url});

        if (existedApp) resp.status(400).json({ message: 'App already added'});

        const appName = (new URL(url)).searchParams.get('id');
        const app = new App({url, name: appName, start_time: new Date()});

        await app.save();

        makeScreenshot(app);

        resp.status(200).json({message: 'App was added'});
    } catch (e) {
        resp.status(500);
    }
});

router.get('/', async (req, resp) => {
    try {
        const Apps = await App.find({})
            .sort({start_time: -1});

        resp.status(200).json({data: Apps})
    } catch (e) {
        resp.status(500);
    }
});

router.get('/:appId', async (req, resp) => {
    const appId = req.params.appId;
    const limit = 5;

    try {
        const app = await App.findById(appId)
            .limit(limit)
            .populate({path: 'screenshots', options: { sort: { time : -1 }, limit: limit}});

        if (app) {
            const baseUrl = config.get('baseUrl');
            app.screenshots
                .map((screenShot) =>
                    (screenShot.img = `${baseUrl}/assets/screenshots/${app.name}/${screenShot.img}`));
        }

        resp.status(200).json({data: app})
    } catch (e) {
        resp.status(500);
    }
});

module.exports = router;
