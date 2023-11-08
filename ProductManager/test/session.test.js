import supertest from 'supertest'
import { expect } from 'chai';
import express from 'express';
import userRouter from '../src/router/users.router.js';
const app = express();

app.use(express.json());
app.use('/user', userRouter);
const request = supertest(app);

describe('User API Endpoints', function () {
    it('should authenticate a user with valid credentials', async function () {
    const response = await request
        .post('/user')
        .send({ username: 'jbelfort@gmail.com', password: '1234' });
    expect(response.status).to.equal(200);
    expect(response.body.respuesta).to.equal('ok');
    });

    it('should handle failed authentication with invalid credentials', async function () {
    const response = await request
        .post('/user')
        .send({ username: 'jbelfort@gmail.com', password: '1234' });

    expect(response.status).to.equal(401);
    expect(response.body.respuesta).to.equal('error');
    });

    // it('should handle successful user login', async function () {
    // });

    // it('should handle failed user login', async function () {
    // });

});
