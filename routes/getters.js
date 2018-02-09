const Express = require('express');
//NB : App est un serveur entier alors que plusieurs routeur peuvent etre utilisés pour une app
const router = Express.Router();
const Joi = require('joi');
const Celebrate = require('celebrate');
const DB = require('../db.js');


router.get('/users', (req, res, next) => {

    console.log('GET /users');
    DB.all('SELECT * FROM USERS', (err, data) => {

        if (err) {
            return next(err);
        }
        return res.json(data);
    });
});

router.get('/bottles', (req, res, next) => {

    console.log('GET /users');
    DB.all('SELECT * FROM bottles', (err, data) => {

        if (err) {
            return next(err);
        }
        return res.json(data);
    });
});

module.exports.router = router;