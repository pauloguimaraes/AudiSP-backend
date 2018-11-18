const Tema = require('../sequelize').Tema;
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
                    include: [Tema]
                });

                let allTemas = await Tema.findAll();
                await Promise.all(allTemas.map((tema) => {
                    res.push({
                        id: tema.id,
                        nome: tema.nome,
                        score: 0
                    });
                }));

                await Promise.all(user.temas.map((likedTema) => {
                    // res.push({
                    //     nome: tema.nome,
                    //     id: tema.id,
                    //     score: tema.interesse.score
                    // });
                    allTemas.map((tema) => {

                        if (likedTema.id === tema.id) {
                            res.map((resTema) => {
                                if (resTema.nome === tema.nome) {
                                    resTema.score = likedTema.interesse.score;
                                }
                            });

                        }
                    });
                }));

                resolve(res);

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
                include: [Tema]
            });

            await req.body.temas.map(
                async (tema) => {
                    Interesse.findOne({
                            where: {
                                id_usuario: req.body.userId,
                                id_tema: tema.id
                            }
                        })
                        .then(dado => {
                            if (dado) {
                                dado.updateAttributes({
                                    score: tema.score
                                });
                            } else {
                                Interesse.create({
                                    id_usuario: req.body.userId,
                                    id_tema: tema.id,
                                    score: tema.score
                                });
                            }
                        });
                }
            );
            resolve(res);
        }

    );
}

function likeAudiencia(req) {
    return new Promise(
        async (resolve, reject) => {
            await Promise.all(req.body.temas.map(async (tema)=>{
                let interesse = await Interesse.findOne({
                    where: {
                        id_usuario: req.body.userId,
                        id_tema: tema.id
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
            }));
            

            resolve({
                text: 'Curtido com sucesso'
            });
        }
    );

}

module.exports = {
    getUserLikes: getUserLikes,
    updateUserLikes: updateUserLikes,
    likeAudiencia: likeAudiencia
};