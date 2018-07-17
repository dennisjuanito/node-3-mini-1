require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const messagesCtrl = require('./messagesCtrl');
const session = require('express-session');

const { SERVER_PORT } = process.env;

const app = express();

// top level middleware -- runs with each request
app.use(bodyParser.json());
app.use(
  session({
    secret: 'superdupersecret',
    resave: false,
    saveUninitialized: false
  })
);

// endpoints
app.get('/api/messages', messagesCtrl.getAllMessages);
app.post('/api/messages', messagesCtrl.createMessage);
app.get('/api/messages/history', messagesCtrl.history);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port: ${SERVER_PORT}`);
});
