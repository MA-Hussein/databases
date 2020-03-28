const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world"
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  try {
   await getPopulation("country", "Syria", "SYR", function(err, data) {
      if (err) throw err;
      console.log(data);
    });

  } catch (error) {
    console.error(error);
    connection.end();
  } finally {
    connection.end();
  }
}

function getPopulation(Country, name, code, cb) {
  connection.query(
    `SELECT Population FROM ${Country} WHERE Name =` +
      connection.escape(name) +
      " and code =" +
      connection.escape(code),
    function(err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result);
    }
  );
}

seedDatabase();