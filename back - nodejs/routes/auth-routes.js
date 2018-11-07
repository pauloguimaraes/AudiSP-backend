var router = require("express").Router();
var authController = require('../controller/auth-controller');

router.post('/register', function (req, res) {
    authController.registerUser(req).then(
        (response) => {
            res.status(200).send(response)
        }).catch(
        (error) => {
            res.status(500).send(error.text)
        });
});

router.post('/validate', function (req, res) {
    authController.validateUser(req).then(
        (response) => {
            res.status(200).send(response);
        }).catch((error) => {
        res.status(500).send(error);
    })
});

module.exports = router;