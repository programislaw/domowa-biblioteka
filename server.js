const express = require('express');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware')

// Serve static files....
app.use(express.static(__dirname + '/dist/domowa-biblioteka'));

var apiProxy = proxy('/landing', {target: 'https://domowa-biblioteka.herokuapp.com/', changeOrigin: true });
app.use(apiProxy)

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/domowa-biblioteka/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 80);