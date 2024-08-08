const express = require("express");
const { sql, poolPromise } = require("./database/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT GETDATE() as currentTime");
    res.json({
      message: "Welcome to FilmSync!",
      currentTime: result.recordset[0].currentTime,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
