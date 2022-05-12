const Joi = require('joi');


const amount = Joi.number();



const operationSchemaAccount = Joi.object({
    amount: amount.required()
});


module.exports = { operationSchemaAccount };