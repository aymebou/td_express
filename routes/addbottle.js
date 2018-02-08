'use strict';

const Express = require('express');


//NB : App est un serveur entier alors que plusieurs routeur peuvent etre utilisés pour une app


const router = Express.Router();
const Joi = require('joi');
const Celebrate = require('celebrate');
const DB = require('../db.js');

const Passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;


router.patch('/stock',Celebrate.celebrate({

        //Joi is a plugin here to make sure that the input data is in correct state, managing errors without trouble.
        //Celebrate is just an interface used for Joi

        body: Joi.object().keys({
            brand: Joi.string().required(),
            amount: Joi.number().integer().required()
        })
    }), Passport.authenticate('basic', { session: false }),
    function(req, res) {
        if (req.user.role === 0) {
            DB.run('UPDATE BOTTLES SET Stock = Stock + ? WHERE Brand=?', [req.body['amount'], req.body['brand']]);
            res.send('Stock of ' +req.body['brand']+ ' increased by '+ req.body['amount'] );
        }
        else {
            res.send('You do not have authorization to do this');
        }
    });

router.post('/new',Celebrate.celebrate({

        //Joi is a plugin here to make sure that the input data is in correct state, managing errors without trouble.
        //Celebrate is just an interface used for Joi

        body: Joi.object().keys({
            brand: Joi.string().required(),
            price:Joi.number().integer().required(),
            volume: Joi.number().integer().required(),
            stock: Joi.number().integer().required(),

        })
    }), Passport.authenticate('basic', { session: false }),
    function(req, res) {

        DB.run('INSERT INTO BOTTLES (BRAND, PRICE, VOLUME, STOCK ) VALUES (?, ?, ?, ?)', [req.body['brand'], req.body['price']
            , req.body['volume'], req.body['stock']], (returned, err) => {

            if (err) {
                res.send('Bottle already exists');
            }

            else {
                res.send('Added bottle' + req.body['brand']);
            }

        });
    });


module.exports.router = router;