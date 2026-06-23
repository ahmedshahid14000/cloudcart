const { Pool } = require("pg");

const pool = new Pool({
  host: "postgres-db",
  user: "postgres",
  password: "12345",
  database: "cloudcart",
  port: 5432,
});

module.exports = pool;
