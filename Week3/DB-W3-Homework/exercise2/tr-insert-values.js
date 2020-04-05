const mySql = require('mysql');

const connection = mySql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'Bank'
});

connection.connect();

const amount = ['insert into accounts value(101, 2000)', 'insert into accounts value(102, 3000)'];
for (let i = 0; i < amount.length; i++) {   
connection.query(amount[i], (err, result) => {
    if (err) throw err;
    console.log('The amount has been deposited', result);
});
}

connection.end();
