const express = require('express');
const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler')
const { createUserSchema } = require('./../schemas/user.schema')
const router = express.Router();
const service = new UserService();


router.get('/', async (req, res, next) => {
    try {
        const users = await UserService.find();
        res.json(users)
    } catch (error) {
        next(error)
    }
})

router.post('/',validatorHandler(createUserSchema,'body'), async (req, res, next) =>{
    try {
        const body = req.body;
        const user = await service.create(body);
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
})


module.exports = router;