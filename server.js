const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mailerService = require('./server/utilities/mailerService');
var cors = require('cors')
var cookieParser = require('cookie-parser')
// var csrf = require('csurf')
var csrfMiddleware = require('./server/utilities/csrfMiddleware').csrfMiddleware

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())
var whitelist = ['http://127.0.0.1:8090', 'http://localhost:8090']
var corsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  allowedHeaders: ['Origin', 'X-Requested-With', 'contentType', 'Content-Type', 'Accept', 'Authorization', 'CSRF-TOKEN'],
  optionsSuccessStatus: 200,
  credentials: true,
  // maxAge: '1s'
}
app.use(cors(corsOptions))
// app.use(csrf({
//   cookie: {
//     key: 'XSRF-TOKEN'
//   }
// }))
app.use(csrfMiddleware)
const Sequelize = require('sequelize');
const sequelize = new Sequelize('server_status_app', 'sreedeep', 'Reddit96', {
  host: '139.59.67.53',
  port: '5432',
  dialect: 'postgres'
})

var index = require('./server/routes/index');
var ping = require('./server/routes/ping');
var users = require('./server/routes/users');

app.use('/', index);
app.use('/ping', ping);
app.use('/users', users);

const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));