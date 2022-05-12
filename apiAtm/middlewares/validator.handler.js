const boom = require("@hapi/boom");


/**
 * Pasar como parametro el esquema a validar y la propiedad de donde viene la data en el requets[body, params, headers]
 * @param {*} schema 
 * @param {*} property 
 * @returns 
 */
function validatorHandler(schema, property) {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(boom.badRequest(error));
        }
        next();
    }
}

module.exports = validatorHandler;