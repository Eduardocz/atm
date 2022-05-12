const Joi = require('joi');


const email = Joi.string().email();
const name = Joi.string();
const paLastName = Joi.string();
const MoLastName = Joi.string();
const phone = Joi.number().integer();
const password = Joi.string().min(8);



const createUserSchema = Joi.object({
    email: email.required(),
    name: name.required(),
    paLastName: paLastName.required(),
    moLastName: MoLastName.required(),
    phone: phone.required(),
    password: password.required()
});


module.exports = { createUserSchema };