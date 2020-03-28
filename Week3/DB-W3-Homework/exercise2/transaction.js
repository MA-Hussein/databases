const mySql = require('mysql');
const util = require('util');

const connection = mySql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'Bank'
});

const execQuery = util.promisify(connection.query.bind(connection))


async function transactionsData(amount, accountFrom, accountTo) {
    const autoCommit = `set autocommit = 0;`;
    const tran = `start transaction;`;
    const rollback = `rollback;`;
    const commit = `commit;`;

    const creditTransaction = `UPDATE accounts SET balance = balance - ${amount} WHERE account_number = ${accountFrom}`;
    const debitTtansaction = `UPDATE accounts SET balance = balance + ${amount} WHERE account_number = ${accountTo}`;
    const creditAmount = `insert INTO transactions value(1, ${accountFrom}, ${amount},'2020-03-20','Amount transfered')`;
    const debitAmount = `insert INTO transactions value(2, ${accountTo}, ${amount},'2020-03-20','Amount received')`;
    connection.connect();
    try {
        await execQuery(autoCommit);
        await execQuery(tran);
        await execQuery(creditTransaction);
        await execQuery(debitTtansaction);
        await execQuery(creditAmount);
        await execQuery(debitAmount);

        await execQuery(commit);
    } catch (err) {
        execQuery(rollback);
        console.log('Money transfer failed', err);

    }
    connection.end();
}

transactionsData(500, 101, 102);