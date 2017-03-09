const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users');
const config = require('./config/database')
mongoose.Promise = Promise;
mongoose.connect(config.database);
mongoose.connection.once('open', () => {
console.log('connection to database is made')
});

const app = express();
const port = process.env.PORT || 8080;
app.get('/', (req, res) => {
	res.send('Dziala');
});
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use(cors());
app.use(bodyParser.json());
app.use('/users', users);
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () =>{
	console.log('server listenening on', port)
});