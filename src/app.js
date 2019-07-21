// file system - read and write files
const fs = require('fs');
// copy full path
const path = require('path');
// core library
const express = require('express');

// top level express function
const app = express();

// assigning path to 'views'
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set public to static folder - sends files "as is" only
// can only send static files
app.use(express.static(path.join(__dirname, 'public')));

// reads acounts.json from json lib in utf8 format
const accountData = fs.readFileSync(
    path.join(__dirname, 'json', 'accounts.json'), 'utf8'
);

// parse the accounts.json read
const accounts = JSON.parse(accountData);


// same as above
const userData = fs.readFileSync(
    path.join(__dirname, 'json', 'users.json'), 'utf8'
);

const users = JSON.parse(userData);

// sends a get http request to root
// renders index with title index
// how it is looking auto in views?
// sends accounts as a parameter
app.get('/', (req, res) => res.render('index', {title: 'Account Summary', accounts}));

app.get('/savings', (req, res) => {
    res.render('account', { account: accounts.savings });
})

app.get('/checking', (req, res) => {
    res.render('account', { account: accounts.checking });
})

app.get('/credit', (req, res) => {
    res.render('account', { account: accounts.credit });
})

app.get('/profile', (req, res) => {
    res.render('profile', {user: user[0] } )
});

app.listen(3000, () => console.log('PS Project Running on port 3000'));