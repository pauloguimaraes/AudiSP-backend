var router = require("express").Router();
var nluController = require('../controller/nlu-controller');

router.post('/', function (req, res) {

    nluController.getAudiencia(req)
    .then(
        (response) => {
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(error.mesage)
        });
});

router.get('/', function(req, res){
    nluController.trataPublicacao().then(
        (response) => {
            res.status(200).send(response)
        })
        .catch((error) => {
            res.status(500).send(error.mesage)
        });
});


module.exports = router;