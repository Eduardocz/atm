const express = require('express');
const passport = require('passport');

const router = express.Router();
const AccountService = require('../services/account.service');
const _accountService = new AccountService();
router.get('/', async (req, res, next) => {
    try {
        const users = await ["ewewe", "dksdhdsh"]
        res.json(users)
    } catch (error) {
        next(error)
    }
});

router.patch('/deposit/:numberAccount',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { numberAccount } = req.params;
            const { amount } = req.body;
            const withdraw = await _accountService.deposit(numberAccount, amount);
            res.json(withdraw)
        } catch (error) {
            next(error)
        }
    });

router.patch('/withdraw/:numberAccount',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { numberAccount } = req.params;
            const { amount } = req.body;
            const withdraw = await _accountService.withdraw(numberAccount, amount);
            res.json(withdraw)
        } catch (error) {
            next(error)
        }
    });

router.patch('/pay-credit/:numberAccount',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { numberAccount } = req.params;
            const { amount } = req.body;
            const withdraw = await _accountService.payCredit(numberAccount, amount);
            res.json(withdraw)
        } catch (error) {
            next(error)
        }
    });

module.exports = router;