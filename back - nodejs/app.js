var express = require("express");
var app = express();;
var cors = require("cors");
var schedule = require("node-schedule");
require('dotenv').load();

app.use(cors());
app.use(express.json());

var nlu = require('./controller/nlu-controller');

var nluRoutes = require('./routes/nlu-routes');
var audRoutes = require('./routes/audiencia-routes');
var userRoutes = require('./routes/user-routes');
var authRoutes = require('./routes/auth-routes');
var temaRoutes = require('./routes/tema-routes');
var routes = require('./routes/root-routes');

app.use('/', routes);
app.use('/nlu', nluRoutes);
app.use('/aud', audRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/tema', temaRoutes);

var j = schedule.scheduleJob("* 23 * * *", function () {
    nlu.trataPublicacao().then((res) => console.log(res))
});

var port = 6005;
app.listen((process.env.PORT || port), function () {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});