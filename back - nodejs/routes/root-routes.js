var router = require("express").Router();

router.get('/', function(req, res) {
    res.send('SERVER ONLINE');
});

module.exports = router;
