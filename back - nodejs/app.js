var express = require("express");
var app = express();;
var cors = require("cors");
require('dotenv').load();

app.use(cors());
app.use(express.json());

var nluRoutes = require('./routes/nlu-routes');
var routes = require('./routes/root-routes');

app.use('/', routes);
app.use('/nlu', nluRoutes);

var port = 6005;
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
}); 
