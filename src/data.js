// file system - read and write files
const fs = require('fs');
// copy full path
const path = require('path');

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

const writeJSON = () => {
    const accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
};

module.exports = {accounts, users, writeJSON};