
const { models } = require('./../libs/sequelize');

class AtmService {

    constructor(){

    }
    
    async initAccount(accountId, quantity){
        const accont = await models.Atm.create({
            quantity,
            operationType:'entry',
            accountId
        })
        return accont;
    }

    async deposit(accountId, amount, type){
        const OPERATION_TYPE = 'entry';
        const operation = await models.Atm.create({
            quantity: amount,
            operationType: OPERATION_TYPE,
            accountId
        })
        return operation;
    }

    async withdraw(accountId, amount){
        const OPERATION_TYPE = 'exit';
        const operation = await models.Atm.create({
            quantity: amount,
            operationType: OPERATION_TYPE,
            accountId
        })
        return operation;
    }

    async pay(accountId, amount){
        const OPERATION_TYPE = 'pay';
        const operation = await models.Atm.create({
            quantity: amount,
            operationType: OPERATION_TYPE,
            accountId
        })
        return operation;
    }
}


module.exports = AtmService;