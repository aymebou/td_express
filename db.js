'use strict';
const DB_NAME = 'tests-express-sqlite';
const Fs = require('fs');
const Path = require('path');
const Sqlite = require('sqlite3');



let DB;

/*
        La DB est créée au préalable puis simplement connectée au programme.
        Le fichier init.sql n'est même pas utilisé

        Il suffit de le run au début ou alors de créer la bonne DB

 */

const initAll = function (name) {

        DB = new Sqlite.Database(DB_NAME);

};

initAll();


//Make the DB useable from every fils simply by typing require('db.js')
module.exports = DB;
