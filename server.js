var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');


var app = express()
var port = process.env.port || 3000;
app.use(express.static('Photos' ));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit:'5mb'}));

var fileRoutes = require('./routes/file')

app.use(function (req, res, next)
{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();});

// app.use('/Photos',fileRoutes);

app.get('/*', (req,res) => res.sendFile(path.join(__dirname)))


var server = http.createServer(app);

server.listen(port, () => console.log('Running...'))


