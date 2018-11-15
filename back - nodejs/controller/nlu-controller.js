var request = require('request');
const Audiencia = require('../sequelize').Audiencia;
const Tema = require('../sequelize').Tema;
const AudienciaTema = require('../sequelize').AudienciaTema;

var options = {
    uri: process.env.NLU_URL + process.env.NLU_PATH + 'version=2018-03-19',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + new Buffer(process.env.NLU_USER + ':' + process.env.NLU_PASSWORD).toString('base64')
    },
    json: {}
};


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
                if (error)
                    reject(error);
                else {
                    var audiencia = {
                        titulo: '',
                        data: '',
                        horario: '',
                        local: '',
                        pauta: []
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

                        }
                    });


                    resolve(criarAudiencia(audiencia, req.body.id));
                }
            });

        });

};

function criarAudiencia(audi, id_publicacao) {
    return new Promise(
        async (resolve, reject) => {

            pautaText = '';
            pautas = [];
            await Promise.all(audi.pauta.map(async (pauta) => {
                pautaText += pauta + ', '
            }));


            audiencia = await Audiencia.create({
                data: '2018-09-21',
                horario: audi.horario,
                local: audi.local,
                id_publicacao: 5,
                pauta: pautaText,
                id_publicacao: id_publicacao
            });

            resolve({
                text: 'Sucesso'
            });

        });
}

module.exports = {
    getAudiencia: getAudiencia
};