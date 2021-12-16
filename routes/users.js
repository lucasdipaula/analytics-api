const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Site = require('../models/Sites');

const md5 = require('md5');

//POST: Create User
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        siteUrl: req.body.siteUrl
    });
    const userSite = new Site({
        url: req.body.siteUrl,
        access: [],
    });
    user.save().then((user) => {
        userSite.save().catch(() => { console.log("error criar site") });
        res.status(200).json(user);
    }).catch((error) => {
        res.status(500).json({ error: error });
    });
});

module.exports = router;