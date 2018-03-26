var path = require('path');
var rootPath = path.normalize(__dirname + '/../client/');
var pjson = require('../../package.json');
var pname = pjson.name;
module.exports = {
  development: {
      db: 'mongodb://localhost:27017/' + pname,
      rootPath: rootPath,
      SSL: false,
      port: process.env.PORT || 8081,
      privateKey: "ImmaPrivateKey",
      Auth:'Forms'
    },
    docker: {
        db: 'mongodb://mongodb:27017/' + pname,
        rootPath: rootPath,
        SSL: false,
        port: process.env.PORT || 8080,
        privateKey: "ImmaPrivateKey",
        Auth:'Forms'

    },
    production: {
        rootPath: rootPath,
        SSL: false,
        db: 'mongodb://user1:password1@ds046867.mlab.com:46867/' + pname,
        port: process.env.PORT || 80,
        privateKey: "",
        Auth:'NTLM'
    }
};
