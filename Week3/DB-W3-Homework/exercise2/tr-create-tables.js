const mySql = require('mysql');

const connection = mySql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'Bank'
});

connection.connect();

connection.query("CREATE TABLE if not exists accounts(account_number int Primary Key, balance int)", (err, result) => {
    if (err) throw err;
    console.log('table accounts has been created', result);

});

connection.query("CREATE TABLE if not exists transactions(transaction_number int Primary Key, account_number int, amount int, transaction_date date, remark varchar(80),FOREIGN KEY (account_number) REFERENCES accounts(account_number));", (err, result) => {
    if (err) throw err;
    console.log('table transactions has been created', result);

});

connection.end();