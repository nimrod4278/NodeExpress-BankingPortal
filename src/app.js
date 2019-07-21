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

app.use(express.urlencoded({extended: true}));

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
    res.render('profile', {user: users[0] } )
});


app.get('/transfer', (req, res) => res.render('transfer'));
app.post('/transfer', (req, res) => {
    accounts[req.body.from].balance = accounts[req.body.from].balance - 
    req.body.amount;
    accounts[req.body.to].balance = accounts[req.body.to].balance +
    parseInt(req.body.amount, 10);
    const accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
    res.render('transfer', { message: 'Transfer Completed'});
});

app.get('/payment', (req, res) => res.render('payment', { account: accounts.credit}));
app.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount, 10);
    const accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'utf8');
    res.render('payment', {message: 'Payment Successful', account: accounts.credit});
});


app.listen(3000, () => console.log('PS Project Running on port 3000'));