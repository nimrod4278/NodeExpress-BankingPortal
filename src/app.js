// file system - read and write files
const fs = require('fs');
// copy full path
const path = require('path');
// core library
const express = require('express');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

const {accounts, users, writeJSON } = require('./data');

// top level express function
const app = express();

// assigning path to 'views'
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set public to static folder - sends files "as is" only
// can only send static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

// sends a get http request to root
// renders index with title index
// how it is looking auto in views?
// sends accounts as a parameter
app.get('/', (req, res) => res.render('index', {title: 'Account Summary', accounts}));

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/profile', (req, res) => {
    res.render('profile', {user: users[0] } )
});

app.listen(3000, () => console.log('PS Project Running on port 3000'));