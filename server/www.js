
var debug = require('debug')('MEAN');
var app = require('./app');
var gameSockets = require('./routes/socket.js');
var fs = require('fs');
var https = require('https');
var http = require('http');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config/config.js')[env];
var auth = require('http-auth');


var basic = auth.basic({
    authRealm: 'Private area',
    authFile: __dirname + '/htpasswd',
    authType: 'basic'
});

if(config.Auth=='Basic'){
    app.use(auth.connect(basic));
};



var server = null;
if(config.SSL){
    var file = fs.readFileSync('cert.pfx');
    var options = {
        pfx: file,
        passphrase: 'CertPassPhrase'
    };


    app.set('port', process.env.PORT || 8080);
    server = https.createServer(options, app);
} else{

    var options = {
    };


    app.set('port', process.env.PORT || 8080);
    server = http.createServer(app);


};


//error handler for listen
server.on('error', function (e) {

        console.log(e.code);


});



server.listen(app.get('port'), function(){

    console.log('Express server listening on port ' + server.address().port);
});

var io = require('socket.io')(server);
io.sockets.on('connection', gameSockets);



