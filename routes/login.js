const express = require('express');
const router = express.Router();
const User = require('../models/Users');

const md5 = require('md5');

//POST: Login
router.post('/', async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email }).exec();
        if (user.lenght === 0) {
            return res.status(404).json({ error: 'E-mail ou senha inválidos!' })
        }
        if (user[0].password != md5(req.body.password)) {
            return res.status(404).json({ error: 'E-mail ou senha inválidos!' })
        }
        return res.status(200).json({ user: user[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});

module.exports = router;