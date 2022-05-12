const {User, UserSchema } = require('./user.model'); 
const {Account, AccountSchema } = require('./account.model');
const {Atm, AtmSchema } = require('./atm.model');

function setupModel (sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Account.init(AccountSchema, Account.config(sequelize));

    Atm.init(AtmSchema, Atm.config(sequelize));

    //Asocciaciones
    Account.associate(sequelize.models);
    //Atm.associate(sequelize.models);
}


module.exports = setupModel;