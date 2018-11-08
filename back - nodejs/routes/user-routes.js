var router = require("express").Router();
var userController = require('../controller/user-controller');

router.post('/likes', function (req, res) {
    userController.getUserLikes(req)
        .then(
            (response) => {
                res.status(200).send(response)
            })
        .catch((error) => {
            res.status(500).send(error.mesage)
        });
});


router.put('/updateLikes', function (req, res) {
    userController.updateUserLikes(req)
        .then(
            (response) => {
                res.status(200).send(response)
            })
        .catch((error) => {
            res.status(500).send(error.mesage)
        });
});



module.exports = router;
