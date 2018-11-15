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

                    
                    resolve(criarAudiencia(audiencia));
                }
            });

        });

};

function criarAudiencia(audi) {
    return new Promise(
        async (resolve, reject) => {

            temas = [];
            novas = [];
            await Promise.all(audi.pauta.map(async (pauta) => {
                let res = await Tema.findOne({
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
                    let res = await Tema.create({
                        nome: pauta
                    });

                    pautas.push(res);
                }
            ));

            
            audiencia = await Audiencia.create({
                data: '2018-09-21',
                horario: audi.horario,
                local: audi.local,
                id_publicacao: 5,
            });

            await Promise.all(pautas.map(async (pauta) => {
                await AudienciaTema.create({
                    id_audiencia: audiencia.id,
                    id_tema: pauta.id
                });
            }));

            resolve({
                text: 'Sucesso'
            });

        });
}

module.exports = {
    getAudiencia: getAudiencia
};