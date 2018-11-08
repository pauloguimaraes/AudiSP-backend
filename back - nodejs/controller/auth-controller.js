var crypto = require('crypto');
const User = require('../sequelize').User;

function registerUser(req) {
    return new Promise(
        async (resolve, reject) => {
            let user = await User.findAll({
                where: {
                    email: req.body.email
                }
            });

            if (user[0]) {
                resolve({
                    status: 'nok',
                    text: 'Usuário já existe'
                });
            } else {
                var hash = crypto.createHash('sha256').update(req.body.email + req.body.senha).digest('base64');
                User.create({
                    nome: req.body.nome,
                    email: req.body.email,
                    nascimento: req.body.nascimento,
                    token_fb: hash
                });
            }
            resolve({
                status: 'ok',
                text: 'Usuário criado!'
            });
        });
};

function validateUser(req) {
    return new Promise(
        async (resolve, reject) => {
            var hash = crypto.createHash('sha256').update(req.body.email + req.body.senha).digest('base64');
            let user = await User.findOne({
                attributes: ['id'],
                where: {
                    token_fb: hash
                }
            });
            if(!user){
                resolve({status: 'nok', user: 'none'});
            }
            resolve(
                resolve({status: 'ok', user: user.id})
            );
        }
    );
}
module.exports = {
    registerUser: registerUser,
    validateUser: validateUser
};