const Audiencia = require('../sequelize').Audiencia;
const Tema = require('../sequelize').Tema;
const AudienciaTema = require('../sequelize').AudienciaTema;
const User = require('../sequelize').User;
const Interesse = require('../sequelize').Interesse;

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

function getAudienciaSugerida(req) {
    return new Promise(
        async (resolve, reject) => {

            res = [];

            resolve(sugeridas);


        });
};

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

function updateAudiencia(req, res) {
    return new Promise(
        async (resolve, reject) => {
            temas = [];

            await Promise.all(req.body.temas.map(async (tema) => {
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
                            data: req.body.data,
                            horario: req.body.horario,
                            local: req.body.local,
                            pauta: req.body.pauta,
                            comissao: req.body.comissao,
                        });
                    }
                }
            );

            resolve({text: 'Atualizado com sucesso'});
        }
    );
}
module.exports = {
    getAudienciaSugerida: getAudienciaSugerida,
    getListaAudencias: getListaAudencias,
    getListaAudienciaPorData: getListaAudienciaPorData,
    updateAudiencia: updateAudiencia
};