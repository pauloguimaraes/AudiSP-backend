var router = require("express").Router();
var temaController = require('../controller/tema-controller');

router.get('/lista',function(req,res){ //sem params
    temaController.getTemas(req)
        .then(
            (response)=>{
                res.status(200).send(response)
            })
        .catch((error)=>{
            res.status(500).send(error.message)
        })
});

router.post('/add',function(req,res){ 
    /*
    {
	    "temas":["T1","T2"]
    }
    */
    temaController.addTemas(req)
        .then(
            (response)=>{
                res.status(200).send(response)
            })
        .catch((error)=>{
            res.status(500).send(error.message)
        })
});

router.get('/busca',function(req,res){
    /*
    {
	    "busca":"bla"
    }
    */
    temaController.searchTema(req)
        .then(
            (response)=>{
                res.status(200).send(response)
            })
        .catch((error)=>{
            res.status(500).send(error.message)
        })
});

router.put('/update', function (req, res) {
    /*
    {
        "tema":{
            "id":2,
            "nome":"batataoAzul"
        }
    }
    */
    temaController.updateTema(req)
        .then(
            (response) => {
                res.status(200).send(response)
            })
        .catch((error) => {
            res.status(500).send(error.mesage)
        });
});

router.post('/addAud', function (req, res) {
    /* 
    {
    	"temaid":1,
        "audid":1
    }
    */
    temaController.addToAudiencia(req)
        .then(
            (response) => {
                res.status(200).send(response)
            })
        .catch((error) => {
            res.status(500).send(error.mesage)
        });
});

router.delete('/remAud', function (req, res) {
    /* 
    {
    	"temaid":1,
        "audid":1
    }
    */
    temaController.removeFromAudiencia(req)
        .then(
            (response) => {
                res.status(200).send(response)
            })
        .catch((error) => {
            res.status(500).send(error.mesage)
        });
});


module.exports = router;
