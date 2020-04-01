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
   const query1 = `SELECT rp.paper_title, COUNT(DISTINCT a.author_no) AS 'Authors'
   FROM  Authorship a RIGHT JOIN research_papers rp
   ON rp.paper_id = a.paper_id
   GROUP BY rp.paper_id`;

	const query2 = `SELECT
	COUNT(Research_papers.paper_id) AS 'Sum of the research papers published by all female authors'
	FROM Authorship JOIN Research_papers 
	ON Authorship.paper_id = Research_papers.paper_id RIGHT JOIN  Authors   
	ON Authors.author_no = Authorship.author_no 
	WHERE Authors.gender='f'`;

	const query3 = `SELECT 
	AVG(h_index),
	university 
	FROM Authors GROUP BY university `;

	const query4 = `SELECT 
	COUNT(DISTINCT ap.paper_id) AS 'Sum of the research papers',
	a.university 
	from authors a 
	join Authorship ap 
	on a.author_no = ap.author_no 
	group by a.university`;

	const query5 = `SELECT
	MIN(h_index),
	MAX(h_index),
	university
	FROM Authors GROUP BY university`;

	connection.connect();
	try {
		console.log(await execQuery(query1));
		console.log(await execQuery(query2));
		console.log(await execQuery(query3));
		console.log(await execQuery(query4));
		console.log(await execQuery(query5));
	} catch (error) {
		console.error(error);
	}
	
}

seedData();
