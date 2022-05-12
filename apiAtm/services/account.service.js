
const { models } = require('../libs/sequelize');
const generator = require('creditcard-generator');
const boom = require('@hapi/boom');
const AtmService = require('./atm.service');

const atmService = new AtmService();


class AccountService {

    constructor() {

    }
    async findOne(id) {
        const accont = await models.Account.findByPk(id);
        if (!accont) {
            throw boom.notFound('customer not found');
        }
        return accont;
    }

    async findOneByNumber(numberAccount,user) {
        const accont = await models.Account.findOne({
            where: { number: numberAccount, userId: user }
        });
        if (!accont) {
            throw boom.notFound('Account not found');
        }
        return accont;
    }

    async initAccounts(userId) {
        const dataAccountDebit = {
            userId,
            "number": generator.GenCC("VISA")[0],
            "type": "debit",
            "balance": 1000,
            "balanceInitial": 1000
        };
        const dataAccountCredit = {
            userId,
            "number": generator.GenCC("VISA")[0],
            "type": "credit",
            "balance": 0,
            "balanceInitial": 1000
        };
        const accontDebit = await models.Account.create(dataAccountDebit)
        const accontCredit = await models.Account.create(dataAccountCredit)

        return [accontDebit.dataValues, accontCredit.dataValues]

    }

    async deposit(numberAccount, amount, user) {
        let rtaAccount = await this.findOneByNumber(numberAccount, user);
        let balance = rtaAccount.dataValues.balance;

        if (rtaAccount.dataValues.type === "debit") {
            let newBalance = parseFloat(balance) + parseFloat(amount)
            const updatedAccount = await rtaAccount.update({ balance: newBalance })
            const operationAtm = await atmService.deposit(rtaAccount.dataValues.id, amount)
            let data = operationAtm.toJSON()
            return { ...data, "balance": updatedAccount.dataValues.newBalance }
        } else {
            throw boom.conflict(rtaAccount.dataValues.number + ': you can not deposit in a credit account ');
        }

    }

    async withdraw(numberAccount, amount, user) {
        let amountFee = 0
        let rtaAccount = await this.findOneByNumber(numberAccount,user);
        let balance = rtaAccount.dataValues.balance;
        //Si es tipo de credito descontar tambien el 5%
        if (rtaAccount.dataValues.type === "credit") {
            let fee = 0.05
            amountFee = amount * fee

        }
        amount = amount + amountFee

        if (this.validateWithdraw(rtaAccount, amount)) {
            let newBalance = balance - amount
            const updatedAccount = await rtaAccount.update({ balance: newBalance })
            const operationAtm = await atmService.withdraw(rtaAccount.dataValues.id, amount * -1)
            let data = operationAtm.toJSON()
            return { ...data, "balance": updatedAccount.dataValues.newBalance }
        } else {

            throw boom.conflict(rtaAccount.dataValues.number + ' Insuficient balance');
        }

    }

    async payCredit(numberAccount, amount, user) {
        let rtaAccount = await this.findOneByNumber(numberAccount,user);
        let balance = rtaAccount.dataValues.balance;

        if (rtaAccount.dataValues.type === "credit") {

            if (parseFloat(amount) > balance) {
                throw boom.conflict(rtaAccount.dataValues.number + ': current debt: ' + balance);
            } else {
                let newBalance = parseFloat(balance) + parseFloat(amount)
                const updatedAccount = await rtaAccount.update({ balance: newBalance })
                const operationAtm = await atmService.pay(rtaAccount.dataValues.id, amount)
                let data = operationAtm.toJSON()
                return { ...data, "balance": updatedAccount.dataValues.newBalance }
            }

        } else {
            throw boom.conflict(rtaAccount.dataValues.number + ': it is a debit account!');
        }
    }

    validateWithdraw(rtaAccount, amount) {
        let balance = parseFloat(rtaAccount.dataValues.balance);
        let balanceInitial = parseFloat(rtaAccount.dataValues.balanceInitial);

        if (rtaAccount.dataValues.type === "credit") {
            balanceInitial = balanceInitial + balance;
            if (balanceInitial - amount >= 0) {
                return true
            } else {
                false
            }
        } else {
            if (parseFloat(amount) <= parseFloat(balance)) {
                return true
            } else {
                false
            }
        }

    }

}


module.exports = AccountService;