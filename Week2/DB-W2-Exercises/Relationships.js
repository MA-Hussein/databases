const util = require('util');
const mysql = require('mysql');
const authors = require('./authors');
const papers = require('./papers');
const Authorship = require('./authorship');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'hyfuser',
	password: 'hyfpassword',
	database: 'Research_DB'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedData() {
	const createResearch_PapersTable = `
    CREATE TABLE IF NOT EXISTS Research_Papers
    ( paper_id INT NOT NULL PRIMARY KEY, paper_title VARCHAR(50),
    conference VARCHAR(50), publish_date DATE )`;

	const createAuthorshipTable = `
	CREATE TABLE IF NOT EXISTS Authorship
	( author_no INT,paper_id INT,
		CONSTRAINT FK_Author FOREIGN KEY(author_no) REFERENCES Authors(author_no),
		CONSTRAINT FK_Paper FOREIGN KEY(paper_id) REFERENCES Research_Papers(paper_id))`;

	connection.connect();

	try {
		await execQuery(createResearch_PapersTable);
		
		authors.forEach(async (author) => {
			await execQuery('INSERT INTO Authors SET ?', author);
		});
		papers.forEach(async (paper) => {
			await execQuery('INSERT INTO Research_Papers SET ?', paper);
		});
		await execQuery(createAuthorshipTable);
		Authorship.forEach(async (Author_Paper) => {
			await execQuery('INSERT INTO Authorship SET ?', Author_Paper);
		});
		console.log('Executed successfully ..');
	} catch (error) {
		console.error(error);
	}
	connection.end();
}
seedData();
