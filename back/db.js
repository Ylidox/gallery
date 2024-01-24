const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'javascript6',
    host: '45.153.69.13',
    port: 5432,
    database: "gallery"
});

module.exports = pool;