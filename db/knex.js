const knex = require("knex");

const connectedKnex = knex({
  client: "mysql",
  connection: {
    host: process.env.CON_HOST,
    user: process.env.USER_ACCESS,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

module.exports = connectedKnex;
