const { Client } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

console.log('Testing connection with config:');
console.log('Host:', envConfig.SUPABASE_DATABASE_HOST);
console.log('Port:', envConfig.SUPABASE_DATABASE_PORT);
console.log('User:', envConfig.SUPABASE_DATABASE_USERNAME);
console.log('Password:', envConfig.SUPABASE_DATABASE_PASSWORD ? '******' : '(missing)');

const client = new Client({
    host: envConfig.SUPABASE_DATABASE_HOST,
    port: parseInt(envConfig.SUPABASE_DATABASE_PORT),
    user: envConfig.SUPABASE_DATABASE_USERNAME,
    password: envConfig.SUPABASE_DATABASE_PASSWORD,
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
});

client.connect()
    .then(() => {
        console.log('Connected successfully!');
        return client.query('SELECT version()');
    })
    .then(res => {
        console.log('Database version:', res.rows[0].version);
        return client.end();
    })
    .catch(err => {
        console.error('Connection failed:', err.message);
        if (err.message.includes('ENOTFOUND')) {
            console.error('DNS Resolution Error: The host could not be resolved.');
        }
        client.end();
    });
