const Audiencia = require('../sequelize').Audiencia;
const Tema = require('../sequelize').Tema;
const AudienciaTema = require('../sequelize').AudienciaTema;
const User = require('../sequelize').User;
const Interesse = require('../sequelize').Interesse;
const Publicacao = require('../sequelize').Publicacao;
const Sequelize = require('sequelize');
const moment = require('moment');
const Op = require('Sequelize').Op;

var sugeridas = [{
    nome: 'Audiência Pública',
    data: '23/10/2018 11:30',
    pauta: ['Audiência Pública sobre desmatamento'],
    local: 'Amazônia',
    temas: [{
            id: 1,
            nome: "Naruto",
            audienciaTema: {
                id_audiencia: 4,
                id_tema: 1
            }
        },
        {
            id: 3,
            nome: "GTX 1060",
            audienciaTema: {
                id_audiencia: 4,
                id_tema: 3
            }
        }
    ]
}];

/* DEVOLVE UMA LISTA DE AUDIÊNCIAS SUGERIDAS, CONFORME O GOSTO DO USUÁRIO.
RECEBE O ID POR PARÂMETRO, DEPOIS:
1-) ACHA O USUÁRIO NO BD DANDO JOIN COM A TABELA TEMA, PARA PEGAR SEUS GOSTOS
2-) FAZ UM MAP NESSES TEMAS QUE O USUÁRIO DEU LIKE E VÊ SEU SCORE
3-) ACHA UM NÚMERO N DE AUDIÊNCIAS DE ACORDO COM O SCORE NAQUELE TEMA
4-) VERIFICA SE A AUDIÊNCIA JÁ ESTÁ NA RESPOSTA USANDO O MÉTODO array.some()
-> se sim, ignora, se não, adiciona*/
function getAudienciaSugerida(req) {
    return new Promise(
        async (resolve, reject) => {

            response = [];
            auds = [];
            await User.findOne({
                where: {
                    id: req.params.id
                },
                include: [Tema]
            }).then(
                async (user) => {
                    await Promise.all(
                        user.temas.map(
                            async (tema) => {
                                let n = 0;
                                if (tema.interesse.score >= 75) n = 4;
                                else if (tema.interesse.score >= 50) n = 3;
                                else if (tema.interesse.score >= 25) n = 2;
                                else if (tema.interesse.score > 0) n = 1;
                                await Audiencia.findAll({
                                    include: [{
                                        model: Tema,
                                        through: {
                                            where: {
                                                id_tema: tema.id,
                                            }
                                        }
                                    }, ],
                                    limit: n,
                                    where: {
                                        data: {
                                            [Op.gte]: moment().format('YYYY/MM/DD')
                                        }
                                    }

                                }).then(
                                    async audiencias => {
                                        await Promise.all(
                                            await audiencias.map(
                                                (aud) => {
                                                    if (!auds.some(r => (r.id === aud.id))) auds.push(aud);
                                                }
                                            )
                                        );
                                    }
                                );
                            }
                        )
                    );
                }
            );

            await Promise.all(await auds.map(async (aud) => {
                await Audiencia.findOne({
                    where: {
                        id: aud.id
                    },
                    include: [Tema]
                }).then((res) => response.push(res));
            }));

            resolve(response);

        });
};

/*RETORNA TODAS AS AUDIÊNCIAS PÚBLICAS, ORDENADAS POR DATA*/
function getListaAudencias(req, res) {
    return new Promise(
        (resolve, reject) => {
            resolve(
                Audiencia.findAll({
                    order: [
                        ['data', 'DESC']
                    ],
                    include: [Tema]
                })
            );
        });
}

/*RETORNA TODAS AUDIÊNCIAS PÚBLICAS NO DIA REQUISITADO*/
function getListaAudienciaPorData(req, res) {
    return new Promise(
        (resolve, reject) => {
            resolve(
                Audiencia.findAll({
                    where: {
                        data: req.body.data
                    },
                    order: [
                        ['data', 'DESC']
                    ],
                    include: [Tema]
                })
            );
        });
}

/*ATUALIZA A AUDIÊNCIA REQUISITADA, CRIA NOVOS TEMAS NO BANCO SE NECESSÁRIO*/
function updateAudiencia(req, res) {
    return new Promise(
        async (resolve, reject) => {
            temas = [];

            await Promise.all(req.body.temas.map(async (tema) => {
                tema = tema.toLowerCase();
                await Tema.findOne({
                    where: {
                        nome: tema
                    }
                }).then(async (res) => {
                    if (res) temas.push(res);
                    else {
                        await Tema.create({
                            nome: tema
                        }).then((created) => {
                            temas.push(created);
                        });
                    }
                });
            }));

            await Promise.all(
                temas.map(
                    async (tema) => {
                        await AudienciaTema.findOne({
                            where: {
                                id_audiencia: req.body.id,
                                id_tema: tema.id
                            }
                        }).then(
                            async (res) => {
                                if (!res) {
                                    await AudienciaTema.create({
                                        id_audiencia: req.body.id,
                                        id_tema: tema.id
                                    });
                                }
                            }
                        );
                    })
            );

            await Audiencia.findOne({
                where: {
                    id: req.body.id
                }
            }).then(
                (res) => {
                    if (res) {
                        res.updateAttributes({
                            data: moment(req.body.data, 'YYYY-MM-DD').format('YYYY-MM-DD'),
                            horario: req.body.horario,
                            local: req.body.local,
                            pauta: req.body.pauta,
                            comissao: req.body.comissao,
                        });
                    }
                }
            );

            resolve({
                text: 'Atualizado com sucesso'
            });
        }
    );
}
/*RETORNA A URL NO COLAB DA PUBLICAÇÃO DE ONDE A AUDIÊNCIA FOI TIRADA*/
function getUrlPublicacao(req) {
    return new Promise(
        async (resolve, reject) => {
            resolve(Audiencia.findById(req.params.id, {
                attributes: [
                    [Sequelize.literal('publicacao.url_devcolab'), 'url']
                ],
                include: {
                    model: Publicacao,
                    attributes: []
                }
            }))

        }
    );
}

module.exports = {
    getAudienciaSugerida: getAudienciaSugerida,
    getListaAudencias: getListaAudencias,
    getListaAudienciaPorData: getListaAudienciaPorData,
    updateAudiencia: updateAudiencia,
    getUrlPublicacao: getUrlPublicacao
};