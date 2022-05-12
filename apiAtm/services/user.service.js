
const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const AccountService = require('./account.service');
const AtmService = require('./atm.service');
const accontService = new AccountService();
const atmService = new AtmService();
class UserService {

    constructor() {

    }

    async findOneByEmail(email) {
        const rta = await models.User.findOne({
            where: { email:email }
        });
        if (rta) {
            throw boom.conflict('the email already exists');
        }
        return rta

    }

    async findByEmail(email){
        const rta = await models.User.findOne({
            where: { email:email }
        });
        if (!rta) {
            throw boom.conflict('the email already not exists');
        }
        return rta
    }

    async create(data) {
        const hashPass = await bcrypt.hash(data.password, 15);
        const rta = await this.findOneByEmail(data.email)

        let user = await models.User.create({
            ...data,
            password: hashPass
        });
        if (user) {
            const accounts = await accontService.initAccounts(user.dataValues.id)
            delete user.dataValues.password;
            //inicializar saldos en tarjetas.
            try {
                accounts.forEach(async (account) => {
                    const balance = await atmService.initAccount(account.id);
                });
            } catch (error) {
                throw boom.conflict('Fail balance init');
            }
            user = user.toJSON();
            user.accounts = accounts;
            return user;
        }










        //TODO: crear cuentas bancarias
    }
    async find(data) {
        const newUser = await models.User.findAll()
        return newUser;

        //TODO: crear cuentas bancarias
    }
}


module.exports = UserService;