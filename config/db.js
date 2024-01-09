const mssql = require("mssql");

const config = {
    user: "admin",
    server: "mhproductions.ct0og6k0co98.us-west-2.rds.amazonaws.com",
    password: "Roku1sGr8t!",
    database: "mhproductions",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
    options: {
        encrypt: true, // Use this option to enable encryption
        trustServerCertificate: true // Use this option to trust the server's certificate without validation (not recommended for production)
    }
  };

const pool = new mssql.ConnectionPool(config)

async function executeQuery(query) {
    try {
      await pool.connect();
      const result = await pool.request().query(query);
      console.log('Query result:', result.recordset);
      return result.recordset;
    } catch (err) {
      console.error('Error executing query:', err);
      throw err;
    } finally {
      pool.close();
    }
  }
  
  async function executeInsert(query, values) {
    try {
      await pool.connect();
      const request = await pool.request()

      for (const [key, value] of Object.entries(values)) {
        request.input(key, value);
      }
      const result = await request.query(query);
      console.log('Insert result:', result);
      return result;
    } catch (err) {
      console.error('Error executing insert query:', err);
      throw err;
    } finally {
      pool.close();
    }
  }

  

  module.exports = {
    executeQuery,
    executeInsert
  };


