const mysql = require("mysql");
//
const { promisify } = require("util");

const { options } = require("./keys");

const pool = mysql.createPool(options);

pool.getConnection((error, connection) => {
  if (error) {
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("No hay conexión");
    }
    if (error.code === "ER_CON_COUNT_ERROR") {
      console.error("Error");
    }
    if (error.code === "ECONNREFUSED") {
      console.error("Conexión rechazada");
    }
  }
  if (connection) connection.release();
  console.log("Videojuegos24");
});

pool.query = promisify(pool.query);

module.exports = pool;
