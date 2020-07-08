const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

require('./config/database');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/users', require('./routes/api/users'));
app.use(require('./config/auth'));
app.use('/api/inventory', require('./routes/api/items'));
app.use('/api/swapsites', require('./routes/api/swapSites'));
app.use('/api/swapmeets', require('./routes/api/swapMeets'));

app.get('/api/key/', function(req, res) {
  res.json(process.env.API_KEY);
  console.log(process.env.API_KEY);
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  

const port = process.env.PORT || 3001;
    
app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
  });