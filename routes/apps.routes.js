const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const App = require('../models/App');
const config = require('config');
const router = Router();

router.post(
    '/',
    [check('url', 'Incorrect App URL').isURL()],
    async (req, resp, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return next({status: 400, errors: errors.array(), message: 'Incorrect input'});

        const {url} = req.body;
        const appName = (new URL(url)).searchParams.get('id');

        if (!appName) return next({status: 400, message: 'No package name found'});

        const existedApp = await App.findOne({url});

        if (existedApp) return next({status: 400, message: 'App already added'});

        const app = new App({url, name: appName, start_time: new Date()});

        await app.save();

        App.makeScreenshot(app);

        resp.status(200).json({message: 'App was added'});
    } catch (e) {
        next(e);
    }
});

router.get('/', async (req, resp, next) => {
    try {
        const Apps = await App.find({})
            .sort({start_time: -1});

        resp.status(200).json({data: Apps})
    } catch (e) {
        next(e);
    }
});

router.get('/:appId', async (req, resp, next) => {
    const appId = req.params.appId;
    const limit = config.get('screenshotsLimit');

    try {
        const app = await App.findById(appId)
            .limit(limit)
            .populate({path: 'screenshots', options: { sort: { created_at : -1 }, limit: limit}});

        if (app) {
            const baseUrl = config.get('baseServerUrl');
            app.screenshots
                .map((screenShot) =>
                    (screenShot.img_path = `${baseUrl}/assets/screenshots/${app.name}/${screenShot.img_path}`));
        }

        resp.status(200).json({data: app})
    } catch (e) {
        next(e);
    }
});

module.exports = router;
