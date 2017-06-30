const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var routes = require('./routes');
var cookieParser = require('cookie-parser');

var compress = require('compression');
var port = process.env.PORT || 4000;

var app = express(),
  dir = __dirname,
  publicDir = path.join(dir, 'public'),
  imagesDir = path.join(dir, 'public', 'images'),
  buildDir = path.join(dir, 'public', 'build');

app.use(compress());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.static(publicDir));
app.use(bodyParser.raw({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(bodyParser.json());

app.use(favicon(path.join(imagesDir, 'favicon.ico')));

app.get ('/', (req, res, next) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/api/getData',
        (req, res) => routes.getData(req, res));

app.listen(port, () => {
  console.log('listening on', port)
});
