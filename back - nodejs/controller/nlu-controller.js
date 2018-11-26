var request = require('request');
var moment = require('moment');
moment.locale('pt-br');
const Audiencia = require('../sequelize').Audiencia;
const Tema = require('../sequelize').Tema;
const AudienciaTema = require('../sequelize').AudienciaTema;
const Pubicacao = require('../sequelize').Publicacao;
const PubicacaoLimpa = require('../sequelize').PublicacaoLimpa;

var options = {
    uri: process.env.NLU_URL + process.env.NLU_PATH + 'version=2018-03-19',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + new Buffer(process.env.NLU_USER + ':' + process.env.NLU_PASSWORD).toString('base64')
    },
    json: {}
};

function trataTexto(aud) {
    /*LOCAL: XXXXX*/
    aud.local = aud.local.replace('LOCAL: ', '').replace('LOCAL ', '');

    /*TEMA: XXXXXXX; AUDIENCIA PUBLICA TEMATICA: XXXXXX; PAUTA: XXXXX; TEMATICA: XXXXXXX*/
    pautas = [];
    aud.pauta.map((p) => {
        nova = p.replace('PAUTA: ', '').replace('TEMA: ', '').replace('AUDIENCIA PUBLICA TEMATICA: ', '').replace('TEMATICA: ', '')
        pautas.push(nova);
    });

    aud.pauta = pautas;
    /*HORARIO: || HORA:*/
    aud.horario = aud.horario.replace('HORARIO: ', '').replace('HORA: ', '');
    /*XXHXX; XX:XX H; DAS XXHXX AS XXHXX */
    aud.horario = aud.horario.replace('HORAS', '').replace(' H', '').replace('H', ':');
    if (aud.horario.trim().length === 2) {
        aud.horario += ':00';
    } else if (aud.horario.trim().length === 3) {
        aud.horario += '00';
    }
    aud.data = aud.data.replace('DIA ', '').replace('DATA: ', '').replace('DATA DA REUNIAO: ', '');

    if (aud.data.includes('DE')) {
        aud.data = moment(aud.data, 'DD ** MMMM ** YYYY').format('YYYY-MM-DD')
    } else {
        aud.data = moment(aud.data, 'DD/MM/YYYY').format('YYYY-MM-DD');
    }
    return aud;
}

function trataPublicacao() {
    return new Promise(
        async (resolve, reject) => {
            res = [];
            await PubicacaoLimpa.findAll({
                where: {
                    processada: 0
                },
                include: [Pubicacao]
            }).then(
                async (publicacao) => {
                    await publicacao.map(
                        async (pub) => {
                            obj = {
                                body: {
                                    id: pub.fk_id_publicacao,
                                    text: pub.texto
                                }
                            }
                            await getAudiencia(obj).then(
                                pub.updateAttributes({
                                    processada: 1
                                })
                            );

                        }
                    );
                }
            );
            resolve({
                text: 'ok'
            });
        }
    );
}

function getAudiencia(req) {
    return new Promise(
        (resolve, reject) => {
            options.json = {
                "text": req.body.text,
                "features": {
                    "entities": {
                        "model": process.env.NLU_MODEL
                    },
                    "relations": {
                        "model": process.env.NLU_MODEL
                    }
                }
            };
            request.post(options, function (error, response, body) {
                if (error || !body.entities)
                    reject(error);
                else {
                    var audiencia = {
                        titulo: '',
                        data: '',
                        horario: '',
                        local: '',
                        pauta: [],
                        comissao: []
                    };
                    response.body.entities.map((entity) => {
                        switch (entity.type) {
                            case "titulo":
                                audiencia.titulo = entity.text;
                                break;
                            case "data":
                                audiencia.data = entity.text;
                                break;
                            case "horario":
                                audiencia.horario = entity.text;
                                break;
                            case "local":
                                audiencia.local = entity.text;
                                break;
                            case "pauta":
                                audiencia.pauta.push(entity.text);
                                break;
                            case "comissao":
                                audiencia.comissao.push(entity.text);
                                break;

                        }
                    });

                    if (audiencia.data) {
                        audiencia = trataTexto(audiencia);
                        resolve(criarAudiencia(audiencia, req.body.id));
                    }
                }
            });

        });

};

function criarAudiencia(audi, id_publicacao) {
    return new Promise(
        async (resolve, reject) => {

            pautaText = '';
            await Promise.all(audi.pauta.map(async (pauta) => {
                pautaText += pauta + ', '
            }));

            comText = '';
            await Promise.all(audi.comissao.map(async (com) => {
                comText += com + ', '
            }));


            audiencia = await Audiencia.create({
                data: audi.data,
                horario: audi.horario,
                local: audi.local,
                id_publicacao: 5,
                pauta: pautaText,
                id_publicacao: id_publicacao,
                comissao: comText
            });

            resolve({
                text: 'Sucesso'
            });

        });
}

module.exports = {
    getAudiencia: getAudiencia,
    trataPublicacao: trataPublicacao
};