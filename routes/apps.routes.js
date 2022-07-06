const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const App = require('../models/App');
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

        resp.status(200).json({message: 'App was added'});
    } catch (e) {
        resp.status(500);
    }
});

router.get('/', async (req, resp) => {
    try {
        const Apps = await App.find({}).sort({start_time: -1});

        resp.status(200).json({data: Apps})
    } catch (e) {
        resp.status(500);
    }
});

router.get('/:appId', async (req, resp) => {
    const appId = req.params.appId;

    try {
        const app = await App.findById(appId).populate({path: 'screenshots', options: { sort: { time : -1 } }});

        resp.status(200).json({data: app})
    } catch (e) {
        resp.status(500);
    }
});

module.exports = router;
