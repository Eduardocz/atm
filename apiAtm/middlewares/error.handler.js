const { ValidationError } = require('sequelize');
const boom = require('@hapi/boom');

/**
 * Esto Para mantener un log del error 
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const logErrors = (err, req, res, next) => {
    console.log(err);
    next(err)
}

/**
 * si el codigo salta a algún try catch todos los errores caeran aquí
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
}

/**
 * 
 */
function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
      const { output } = err;
      res.status(output.statusCode).json(output.payload);
    }
    next(err);
  }
  
  /**
   * Pasear errores de sequelize
   * @param {*} err 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  function ormErrorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
      res.status(409).json({
        statusCode: 409,
        message: err.name,
        errors: err.errors
      });
    }
    next(err);
  }
  

module.exports = { logErrors, errorHandler,boomErrorHandler, ormErrorHandler}