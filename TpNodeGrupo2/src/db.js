const mysql = require("mysql")
const util = require("util")
let db = {}
require('dotenv').config()

const conexion = mysql.createConnection({
  host: process.env.HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "biblioteca",
})

conexion.connect((error) => {
  if (error) {
    throw error
  }
  console.log("Conexion con mysql establecida")
})

db.query = util.promisify(conexion.query).bind(conexion)


module.exports = db;
