var crypto = require('crypto');
const User = require('../sequelize').User;

function registerUser(req) {
    return new Promise(
        (resolve, reject) => {
            var hash = crypto.createHash('sha256').update(req.body.email + req.body.senha).digest('base64');
            User.create({
                nome: req.body.nome,
                email: req.body.email,
                nascimento: req.body.nascimento,
                token_fb: hash
            });

            resolve('Usuário criado!');
        });
};

function validateUser(req) {
    return new Promise(
        (resolve, reject) => {
            var hash = crypto.createHash('sha256').update(req.body.email + req.body.senha).digest('base64');
            
             resolve(
                User.findAll({where:{token_fb: hash}})
            );
        }
    );
}
module.exports = {
    registerUser: registerUser,
    validateUser: validateUser
};