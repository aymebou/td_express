'use strict';
const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab  = module.exports.lab = Lab.script();

const Supertest = require('supertest');
const Express = require('express');
const PostRouter = require('../../routes/posts.js').router;
const DB = require('../../db.js');

const describe = lab.describe;
const it = lab.it;

describe('posts', () => {

    describe('list', () => {

        it('should return the list of posts in database', (done) => {

            DB.initAll('posts.list');
            const app = Express();
            app.use('/posts', PostRouter);
            Supertest(app)
                .get('/posts')
                .end((err, response) => {

                    if (err) {
                        return done(err);
                    }

                    const body = response.body;

                    expect(body).to.be.an.array();
                    expect(body).to.have.length(2);

                    done();
                });


        });
    });

    describe('unique', () => {

        it('Should return the Json of a post of a certain ID : in this case, ID=1', (done) => {

            DB.initAll('posts.unique');
            const app = Express();
            app.use('/posts', PostRouter);

            Supertest(app)
                .get('/posts/1')
                .end((err, response) => {

                    if (err) {
                        return done(err);
                    }

                    const body = response.body;

                    expect(body.ID).to.equal(1);
                    expect(body).to.have.length(3);

                    done();
                });
        });
    });
});


