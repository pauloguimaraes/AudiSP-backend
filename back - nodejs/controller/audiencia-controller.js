const Audiencia = require('../sequelize').Audiencia;
const Pauta = require('../sequelize').Pauta;
const AudienciaPauta = require('../sequelize').AudienciaPauta;
const User = require('../sequelize').User;
const Interesse = require('../sequelize').Interesse;

const Op = require('Sequelize').Op;

var sugeridas = [{
        nome: 'Audiência Pública',
        data: '23/10/2018 11:30',
        pauta: ['Audiência Pública sobre desmatamento'],
        pautaId: 1,
        local: 'Amazônia'
    },
    {
        nome: 'Audiência Pública',
        data: '24/10/2018 11:30',
        pauta: ['Audiência Pública sobre pudim'],
        pautaId: 1,
        local: 'Cozinha'
    },
    {
        nome: 'Audiência Pública',
        data: '24/10/2018 13:30',
        pauta: ['Audiência Pública sobre Naruto'],
        pautaId: 1,
        local: 'Konoha'
    },
    {
        nome: 'Audiência Pública',
        data: '25/10/2018 15:30',
        pauta: ['Audiência Pública sobre necessidade de acabar com os animes'],
        pautaId: 3,
        local: 'Cemitério'
    },
    {
        nome: 'Audiência Pública',
        data: '26/10/2018 18:30',
        pauta: ['Audiência Pública sobre RP2'],
        pautaId: 2,
        local: 'EACH'
    }
];

function getAudienciaSugerida(req) {
    return new Promise(
        async (resolve, reject) => {

            res = [];

            await Promise.all(

            ).then(resolve(sugeridas));


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
                    include: [Pauta]
                })
            );
        });
}


module.exports = {
    getAudienciaSugerida: getAudienciaSugerida,
    getListaAudencias: getListaAudencias
};