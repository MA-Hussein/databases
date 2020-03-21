const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'hyfuser',
	password: 'hyfpassword',
	database: 'userdb'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedData() {
	const dropData = `DROP DATABASE IF EXISTS Research_DB`;
	const createData = `CREATE DATABASE IF NOT EXISTS Research_DB`;
	const useData = `use Research_DB`;

	const createAuthorsTable = `
	CREATE TABLE IF NOT EXISTS Authors
	(author_no INT NOT NULL PRIMARY KEY, 
	 author_name VARCHAR(50)
	 ,university VARCHAR(100), 
	 date_of_birth DATE,
	 h_index INT,
	 gender ENUM("f", "m") )`;

	const addFriendCol = `
    ALTER TABLE Authors ADD friend INT `;
	const addForeign = `ALTER TABLE Authors ADD CONSTRAINT fk_Authors FOREIGN KEY (friend) 
    REFERENCES Authors (author_no) `;

	connection.connect();

	try {
		await execQuery(dropData);
		await execQuery(createData);
		await execQuery(useData);
		await execQuery(createAuthorsTable);
		await execQuery(addFriendCol);
		await addForeign;
		console.log('Executed successfully ..');
	} catch (error) {
		console.error(error);
	}
	connection.end();
}

seedData();