const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'javascript6',
    host: 'localhost',
    port: 5432,
    database: "gallery"
});

module.exports = pool;