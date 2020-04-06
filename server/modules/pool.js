const pg = require("pg");
const Pool = pg.Pool;

// Configuring the pool connection from the server to the database
const pool = new Pool({
  database: "weekend-to-do-app",
  host: "localhost",
  port: 5432, //default postgres port
  max: 10,
  idleTimeoutMills: 30000,
});

pool.on("connect", () => {
  console.log("Connected to Postgres pool");
});

pool.on("error", (error) => {
  console.log("Error with database: ", error);
});

module.exports = pool;
