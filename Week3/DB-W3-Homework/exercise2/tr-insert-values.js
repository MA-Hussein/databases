const mySql = require('mysql');

const connection = mySql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'Bank'
});

connection.connect();

const amount = ['insert into accounts value(101, 2000)', 'insert into accounts value(102, 3000)'];

connection.query(amount[0], (err, result) => {
    if (err) throw err;
    console.log('The amount has been deposited', result);

});

connection.query(amount[1], (err, result) => {
    if (err) throw err;
    console.log('The amount has been deposited', result);

});

connection.end();