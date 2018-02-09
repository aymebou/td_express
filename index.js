'use strict';
const Express = require('express');
const BP = require('body-parser');
const DB = require('./db.js');

const app = Express();

app.use(BP.json());


/*
    Lorsqu'on utilise Postman, les requêtes POST ne fonctionne pas toujours en Json, (apparemment c'est un problème récurrent sur le web
    du coup dans body sur postman j'ai coché x-www-form-urlencoded et le petit bout de code suivant est pour pouvoir exploiter ce format
 */
app.use(BP.urlencoded({
    extended: true
}));
app.use(BP.urlencoded())


//Ici on définit les routes, c'est à dire dans /post on va utiliser le router de ./routes/posts,
//Une remarque importante est que si on met ici /posts, dans le fichier ./routes/posts, le / devient le /post d'ici
app.use('/posts', require('./routes/posts').router);
app.use('/users', require('./routes/adduser').router);
app.use('/bottles', require('./routes/addbottle').router);
app.use('/', require('./routes/getters').router);

app.use(require('./routes/users').router);

let port = 8081;

app.listen(port, (err) => {

    if (err) {
        console.log(err);
    }
    else {
        console.log('app listening on port '+ port);
    }
});

