const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('./user.service');
const service = new UserService();
const { config } = require('./../config/config');

class AuthService {

    async getUser(email, password) {
        const user = await service.findByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw boom.unauthorized();;
        }
        delete user.dataValues.password;
        return user;
    }

    signToken(user) {
        const payload = {
            sub: user.id,
        }
        const token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: '300s'
        });
        return {
            user,
            token
        };
    }
}

module.exports = AuthService;
