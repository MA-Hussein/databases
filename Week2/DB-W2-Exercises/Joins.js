const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'hyfuser',
	password: 'hyfpassword',
	database: 'Research_DB'
});
const execQuery = util.promisify(connection.query.bind(connection));

async function seedData() {
	const authersConf = `SELECT
	a.author_name AS Name ,
	b.author_name AS Friend
	FROM Authors a , Authors b 
	where a.author_no = b.friend`;

	const printAllCol = `SELECT *
	FROM Authors
	left join Authorship
	ON Authorship.author_no = Authors.author_no 
	LEFT JOIN Research_papers
	ON Research_papers.paper_id = Authorship.paper_id`;
	connection.connect();

	try {
		console.log(await execQuery(authersConf));
		console.log(await execQuery(printAllCol));
	} catch (error) {
		console.error(error);
	}
	connection.end();
}

seedData();
