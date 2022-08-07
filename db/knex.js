const knex = require('knex');

const connectedKnex = knex({
    client: 'mysql',
    connection: {
        host: 'us-cdbr-east-06.cleardb.net',
        user: 'b7a7bf2117500d',
        password: '4823c815',
        database: 'heroku_26aa1c226845f25'
    }
});

module.exports = connectedKnex;