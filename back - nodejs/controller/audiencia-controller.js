const Audiencia = require('../sequelize').Audiencia;
const Pauta = require('../sequelize').Pauta;
const AudienciaPauta = require('../sequelize').AudienciaPauta;
const Op = require('Sequelize').Op;

var sugeridas = [{
        nome: 'Audiência Pública',
        data: '23/10/2018 11:30',
        pauta: 'Audiência Pública sobre desmatamento',
        pautaId: 1,
        local: 'Amazônia'
    },
    {
        nome: 'Audiência Pública',
        data: '24/10/2018 11:30',
        pauta: 'Audiência Pública sobre pudim',
        pautaId: 1,
        local: 'Cozinha'
    },
    {
        nome: 'Audiência Pública',
        data: '24/10/2018 13:30',
        pauta: 'Audiência Pública sobre Naruto',
        pautaId: 1,
        local: 'Konoha'
    },
    {
        nome: 'Audiência Pública',
        data: '25/10/2018 15:30',
        pauta: 'Audiência Pública sobre necessidade de acabar com os animes',
        pautaId: 3,
        local: 'Cemitério'
    },
    {
        nome: 'Audiência Pública',
        data: '26/10/2018 18:30',
        pauta: 'Audiência Pública sobre RP2',
        pautaId: 2,
        local: 'EACH'
    }
];

function getAudienciaSugerida(req) {
    return new Promise(
        (resolve, reject) => {
            resolve(sugeridas);
        });
};

function getListaAudencias(req, res) {
    return new Promise(
        (resolve, reject) => {
            resolve(
                Audiencia.findAll(
                    /*{include: [{
                                        model:Pauta, 
                                        attributes: ['nome']
                                    }]}*/
                )
            );
        });
}

function criarAudiencia(req) {
    return new Promise(
        async (resolve, reject) => {

            pautas = [];
            novas = [];
            await Promise.all(req.body.pauta.map(async (pauta) => {
                let res = await Pauta.findOne({
                    where: {
                        nome: pauta
                    }
                });

                if (!res) {
                    novas.push(pauta)
                } else {
                    pautas.push(res);

                }

            }));

            await Promise.all(novas.map(
                async pauta => {
                    let res = await Pauta.create({
                        nome: pauta
                    });

                    pautas.push(res);
                }
            ));

            audiencia = await Audiencia.create({
                data: req.body.data,
                horario: req.body.horario,
                local: req.body.local,
                id_publicacao: 5,
            });

            await Promise.all(pautas.map(async (pauta) => {
                await AudienciaPauta.create({
                    id_audiencia: audiencia.id,
                    id_pauta: pauta.id
                });
            }));

            resolve({
                text: 'Sucesso'
            });

        });
}

module.exports = {
    getAudienciaSugerida: getAudienciaSugerida,
    getListaAudencias: getListaAudencias,
    criarAudiencia: criarAudiencia
};