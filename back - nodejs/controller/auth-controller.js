var crypto = require('crypto');
const User = require('../sequelize').User;

/*REGISTRA O USUÁRIO*/
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
                    text: 'Usuário já existe',
                });
            } else if (req.body.nome == '' ||req.body.email == '' ||req.body.nascimento == '' ||req.body.senha == '') {
                resolve({
                    status: 'nok',
                    text: 'Dados incorretos'
                });

            } else {
                var hash = crypto.createHash('sha256').update(req.body.email + req.body.senha).digest('base64');
                User.create({
                    nome: req.body.nome,
                    email: req.body.email,
                    nascimento: req.body.nascimento,
                    hash_senha: hash
                }).then(
                    resolve({
                        status: 'ok',
                        text: 'Usuário criado!'
                    })
                ).catch(
                    (error) => {
                        resolve({
                            status: 'nok',
                            text: 'Dados incorretos'
                        })
                    }
                );
            }

        });
};


/*VALIDA O USUÁRIO*/
function validateUser(req) {
    return new Promise(
        async (resolve, reject) => {
            var hash = crypto.createHash('sha256').update(req.body.email + req.body.senha).digest('base64');
            let user = await User.findOne({
                attributes: ['id'],
                where: {
                    hash_senha: hash
                }
            });
            if (!user) {
                resolve({
                    status: 'nok',
                    user: 'none'
                });
            } else {
                resolve(
                    resolve({
                        status: 'ok',
                        user: user.id
                    })
                );
            }
        }
    );
}
module.exports = {
    registerUser: registerUser,
    validateUser: validateUser
};