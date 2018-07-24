const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mailerService = require('./server/utilities/mailerService');
var cors = require('cors')
var cookieParser = require('cookie-parser')
var csrf = require('csurf')


const app = express();
var whitelist = ['http://127.0.0.1:8090', 'http://localhost:8090']
var corsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
      // callback(null, true)

    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
  // maxAge: '1s'
}
app.use(cors(corsOptions))

const Sequelize = require('sequelize');
const sequelize = new Sequelize('server_status_app', 'sreedeep', 'Reddit96', {
  host: '139.59.67.53',
  port: '5432',
  dialect: 'postgres'
})

// Parsers for POST data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(csrf({ cookie: {key: 'XSRF-TOKEN' }}))

var index = require('./server/routes/index');
var ping = require('./server/routes/ping');
var users = require('./server/routes/users');
app.get('/form', function (req, res) {
  // pass the csrfToken to the view
  res.send('api works');
})

app.use('/', index);
app.use('/ping', ping);
app.use('/users', users);

// app.use(csrf({ cookie: true }))

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
