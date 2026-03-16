import db from "../database.mjs";

export const healthCheck = async (req, res) => {
  let dbConnection;
  try {
    await db.raw('SELECT 1+1 AS result');
    dbConnection = "OK";
  } catch (error) {
    console.log("ERROR: ", error)
    dbConnection = false;
  }

  return res.status(200).json({
    status: 'UP',
    uptime: process.uptime(),
    timestamp: Date.now(),
    db_connection: dbConnection
  });
}