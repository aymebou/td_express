'use strict';

const Express = require('express');
//NB : App est un serveur entier alors que plusieurs routeur peuvent etre utilisés pour une app
const router = Express.Router();
const Passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const DB = require('../db.js');
const Bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = Bcrypt.genSaltSync(saltRounds);
const Joi = require('joi');
const Celebrate = require('celebrate');

/*

ATHENTICATION SYSTEM USING BASIC STRATEGY

 */


//Nous allons expliquer à passport ce qu'il doit faire pour gérer un login (unique)

Passport.use(new BasicStrategy( (username, password, done) => {

    DB.get('SELECT * FROM USERS WHERE USERNAME=?', [username], (err, user) => {
        //Checking if errors
        if (err) {
            return done(err);
        }
        //Checking if username exists
        if (!user) {
            return done(null, false);
        }
        //Checking if password is right
        if (Bcrypt.compareSync(password, user.password)) {
            user.PASSWORD = undefined;
            return done(null, user);
        }
        //Else, password isn't right
        return done(null, false)

    });

}));

router.get('/login', Passport.authenticate('basic', {session:false}), (req, res) => {

    res.end('Hello ' + req.user.USERNAME);
});

router.patch('/users/:id',Celebrate.celebrate({

        //Joi is a plugin here to make sure that the input data is in correct state, managing errors without trouble.
        //Celebrate is just an interface used for Joi

        body: Joi.object().keys({
            role: Joi.string().required(),
        })
    }), Passport.authenticate('basic', { session: false }),
    function(req, res) {
        if (req.user.role === 0) {
            DB.run('UPDATE USERS SET ROLE=0 WHERE ID=4');
            res.send('Updated authorization');
        }
        else {
            res.send('You do not have authorization to do this');
        }
    });




module.exports.router = router;