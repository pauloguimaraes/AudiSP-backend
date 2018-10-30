const Audiencia = require('../sequelize').Audiencia
var sugeridas = [
    {
        nome: 'Audiência Pública',
        data: '23/10/2018 11:30',
        pauta: 'Audiência Pública sobre desmatamento',
        local: 'Amazônia'
    },
    {
        nome: 'Audiência Pública',
        data: '24/10/2018 11:30',
        pauta: 'Audiência Pública sobre pudim',
        local: 'Cozinha'
    },
    {
        nome: 'Audiência Pública',
        data: '24/10/2018 13:30',
        pauta: 'Audiência Pública sobre Naruto',
        local: 'Konoha'
    },
    {
        nome: 'Audiência Pública',
        data: '25/10/2018 15:30',
        pauta: 'Audiência Pública sobre necessidade de acabar com os animes',
        local: 'Cemitério'
    },
    {
        nome: 'Audiência Pública',
        data: '26/10/2018 18:30',
        pauta: 'Audiência Pública sobre RP2',
        local: 'EACH'
    }
];

var lista = [
    {
        nome: 'Audiência Pública',
        data: '23/10/2018 11:30',
        pauta: 'Audiência Pública sobre desmatamento',
        local: 'Amazônia'
    },
    {
        nome: 'Audiência Pública',
        data: '24/10/2018 11:30',
        pauta: 'Audiência Pública sobre pudim',
        local: 'Cozinha'
    },
    {
        nome: 'Audiência Pública',
        data: '24/10/2018 13:30',
        pauta: 'Audiência Pública sobre Naruto',
        local: 'Konoha'
    },
    {
        nome: 'Audiência Pública',
        data: '25/10/2018 15:30',
        pauta: 'Audiência Pública sobre necessidade de acabar com os animes',
        local: 'Cemitério'
    },
    {
        nome: 'Audiência Pública',
        data: '26/10/2018 18:30',
        pauta: 'Audiência Pública sobre RP2',
        local: 'EACH'
    },
    {
        nome: 'Audiência Pública',
        data: '29/10/2018 12:30',
        pauta: 'Audiência Pública sobre CSGO',
        local: 'Dust II'
    },
    {
        nome: 'Audiência Pública',
        data: '30/10/2018 13:40',
        pauta: 'Audiência Pública sobre Fake News',
        local: 'Zap'
    }, {
        nome: 'Audiência Pública',
        data: '31/10/2018 15:23',
        pauta: 'Audiência Pública sobre RDR2',
        local: 'ESPERANDO SAIR NA STEAM'
    }
];

function getAudienciaSugerida(req) {
    return new Promise(
        (resolve, reject) => {
            resolve(sugeridas);
        });
};

function getListaAudencias(req,res) {
    return new Promise(
        (resolve, reject) => {
            resolve(
                Audiencia.findAll());
        });
}

module.exports = {
    getAudienciaSugerida: getAudienciaSugerida,
    getListaAudencias: getListaAudencias
};