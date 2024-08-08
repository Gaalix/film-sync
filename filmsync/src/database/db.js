const sql = require("mssql/msnodesqlv8");
const dotenv = require("dotenv");

dotenv.config();

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    trustedConnection: process.env.DB_TRUSTED_CONNECTION === "true",
    enableArithAbort: true,
    trustServerCertificate: true,
  },
  driver: "msnodesqlv8",
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

module.exports = {
  sql,
  poolPromise,
};
