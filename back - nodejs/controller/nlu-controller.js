var request = require('request');

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
                        titulo: String,
                        data: String,
                        horario: String,
                        local: String,
                        pauta: String
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
                                audiencia.pauta = entity.text;
                                break;

                        }
                    });

                    resolve(audiencia);
                }
            });

        });

};

module.exports = {
    getAudiencia: getAudiencia
};