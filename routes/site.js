const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Site = require('../models/Sites');

const md5 = require('md5');

//PATCH: Add access
router.patch('/access', async (req, res) => {
    try {
        const site = await Site.find({ url: req.body.mainDomain }).exec();
        if (site.lenght === 0) {
            return res.status(404).json({ error: "Site não encontrado" })
        }

        site[0].access.push({
            date: req.body.date,
            navigator: req.body.navigator,
            deviceType: req.body.deviceType,
            url: req.body.url,
        });

        site[0].save().then((site) => {
            return res.status(200).json({
                message: 'Acesso registrado com sucesso!',
                site: site
            })
        }).catch((error) => {
            return res.status(400).json({ error: error });
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//POST: Get access
router.post('/access', async (req, res) => {
    try {
        const site = await Site.find({ url: req.body.mainDomain }).exec();
        if (site.lenght === 0) {
            return res.status(404).json({ error: "Site não encontrado" })
        }
        return res.status(200).json(site[0].access);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

module.exports = router;