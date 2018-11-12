const Pauta = require('../sequelize').Pauta;
const Interesse = require('../sequelize').Interesse;
const User = require('../sequelize').User;

function getUserLikes(req) {
    return new Promise(
        async (resolve, reject) => {
            if (!req.body.userId) {
                resolve({
                    text: 'Usuário inválido'
                });
            } else {
                let res = [];
                let user = await User.findOne({
                    where: {
                        id: req.body.userId
                    },
                    include: [Pauta]
                });

                if (!user.pauta[0]) {
                    let pautas = await Pauta.findAll();
                    await pautas.map((pauta) => {
                        res.push({
                            id: pauta.id,
                            nome: pauta.nome,
                            score: 0
                        });
                    });
                    resolve(res);


                } else {
                    await user.pauta.map((pauta) => {
                        res.push({
                            nome: pauta.nome,
                            id: pauta.id,
                            score: pauta.interesse.score
                        });
                    });
                    resolve(res);
                }
            }
        });
};

function updateUserLikes(req) {
    return new Promise(
        async (resolve, reject) => {
            let res = {
                status: 'ok',
                text: 'Atualizado com sucesso!'
            };
            let user = await User.findOne({
                where: {
                    id: req.body.userId
                },
                include: [Pauta]
            });

            if (!user.pauta[0]) {
                await req.body.pautas.map(
                    async (pauta) => {
                        await Interesse.create({
                            id_usuario: req.body.userId,
                            id_pauta: pauta.id,
                            score: pauta.score
                        });
                    }
                );
                resolve(res);

            } else {

                await req.body.pautas.map(
                    async (pauta) => {
                        Interesse.findOne({
                                where: {
                                    id_usuario: req.body.userId,
                                    id_pauta: pauta.id
                                }
                            })
                            .then(dado => {
                                if (dado) {
                                    dado.updateAttributes({
                                        score: pauta.score
                                    });
                                }
                            });
                    }
                );
                resolve(res);
            }
        }
    );
}

function likeAudiencia(req) {
    return new Promise(
        async (resolve, reject) => {
            let interesse = await Interesse.findOne({
                where: {
                    id_usuario: req.body.userId,
                    id_pauta: req.body.pautaId
                }
            }).then(dado => {
                if (dado) {
                    let sum = dado.score + 20;
                    if (sum > 100) sum = 100;
                    dado.updateAttributes({
                        score: sum
                    });
                }
            });

            resolve({text: 'Curtido com sucesso'});
        }
    );

}

module.exports = {
    getUserLikes: getUserLikes,
    updateUserLikes: updateUserLikes,
    likeAudiencia: likeAudiencia
};