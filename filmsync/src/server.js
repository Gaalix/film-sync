const express = require("express");
const sequelize = require("./database/db");
const userRoutes = require("./routes/userRoutes");
const contentRoutes = require("./routes/contentRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", async (req, res) => {
  try {
    const [results, metadata] = await sequelize.query(
      "SELECT datetime('now') as currentTime"
    );
    res.json({
      message: "Welcome to FilmSync!",
      currentTime: results[0].currentTime,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
