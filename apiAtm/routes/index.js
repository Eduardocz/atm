const express = require('express');

const userRouter = require('./users.router');
const accountRouter = require('./account.router');
const authRouter = require('./auth.router');
const versionApi = "v1"

const api = (app) => {
    const router = express.Router();
    app.use('/api/' + versionApi, router);
    router.use('/users', userRouter);
    router.use('/account', accountRouter);
    router.use('/auth', authRouter);
    
}

module.exports = api;