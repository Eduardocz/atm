const { Sequelize, Model, DataTypes } = require("sequelize");
const { ACCOUNT_TABLE } = require('./account.model');


const ATM_TABLE = 'atm';

const AtmSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    operationType:{
        allowNull: false,
        type: DataTypes.STRING
    },
    accountId: {
        field: 'account_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: ACCOUNT_TABLE,
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

class Atm extends Model {
    static associate(models){
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: ATM_TABLE,
            modelName: 'Atm',
            timestamps: false
        }
    }
}


module.exports = { ATM_TABLE, AtmSchema, Atm}