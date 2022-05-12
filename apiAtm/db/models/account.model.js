const { Sequelize, Model, DataTypes } = require("sequelize");
const { USER_TABLE } = require('./user.model');


const ACCOUNT_TABLE = 'acount';

const AccountSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    number: {
        allowNull: false,
        type: DataTypes.STRING
    },
    type: {
        allowNull: false,
        type: DataTypes.STRING
    },
    balance:{
        allowNull: false,
        type: DataTypes.DECIMAL
    },
    balanceInitial:{
        field: 'balance_initial',
        allowNull: false,
        type: DataTypes.DECIMAL
    },
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }

}

class Account extends Model {
    static associate(models) {
        this.belongsTo(models.User, { as: 'user' });
        this.hasMany(models.Atm, {
            as: 'operations',
            foreignKey: 'accountId'
          });

    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: ACCOUNT_TABLE,
            modelName: 'Account',
            timestamps: false
        }
    }
}


module.exports = { ACCOUNT_TABLE, AccountSchema, Account }