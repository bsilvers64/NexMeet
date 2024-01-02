// our express and socketio server

const fs = require('fs'); // file system
const https = require('https'); 
const socketio = require("socket.io"); 
const cors = require("cors")
const express = require("express"); 
const exp = require('constants');
const app = express();
// react app will be on our server so this is not needed but in case we need 

app.use(cors()) // this will open our express API to ANY domain
app.use(express.static(__dirname+'/public'))
app.use(express.json()) // this wil allow us to parse json in the body with the body parser

const key = fs.readFileSync('./certs/cert.key')
const cert = fs.readFileSync("./certs/cert.crt");

const expressServer = https.createServer({key, cert}, app)
const io = socketio(expressServer, {
  cors: ["https://localhost:3000"],
});


expressServer.listen(9000)

module.exports = {io, expressServer, app}