'use strict';

const Express = require('express');
//NB : App est un serveur entier alors que plusieurs routeur peuvent etre utilisés pour une app
const router = Express.Router();
const Joi = require('joi');
const Celebrate = require('celebrate');
const DB = require('../db.js');
const Bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/', Celebrate.celebrate({ // BEWARE : is is / but in the main (index.js) it is used in '/users' so it is in /users/.

    //Joi is a plugin here to make sure that the input data is in correct state, managing errors without trouble.
    //Celebrate is just an interface used for Joi

    body: Joi.object().keys({
        username: Joi.string(),
        password: Joi.string()

    })
}), (req, res, next) => {
    //We recieved correct data, the password is however stored in clear for now
    var salt = Bcrypt.genSaltSync(saltRounds);
    var hash = Bcrypt.hashSync(req.body.password, salt);
    req.body.password = undefined;
    //Password no longer clear
    res.end(JSON.stringify(req.body));
    console.log('INSERT new user ' + req.body.username);
    DB.run('INSERT INTO USERS (USERNAME, ROLE, PASSWORD) VALUES (?, ?, ?)', [req.body.username, 1, hash], (err) => {

        if (err) {
            return next(err);
        }
        res.status(201);
        //res.end("User " + req.body.username + " correctly added");
    });
});


router.get('/', (req, res, next) => {

    console.log('GET /users');
    DB.all('SELECT * FROM USERS', (err, data) => {

        if (err) {
            return next(err);
        }
        return res.json(data);
    });
});


module.exports.router = router;