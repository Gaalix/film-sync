const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  lastLogin: {
    type: DataTypes.DATE,
  },
});

User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

const Content = sequelize.define("Content", {
  tmdbId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("Movie", "TV Show"),
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.DATE,
  },
  overview: {
    type: DataTypes.TEXT,
  },
  posterPath: {
    type: DataTypes.STRING(255),
  },
});

const Watchlist = sequelize.define("Watchlist", {
  status: {
    type: DataTypes.ENUM("Want to Watch", "Watching", "Watched"),
    allowNull: false,
  },
  dateAdded: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

const Review = sequelize.define("Review", {
  rating: {
    type: DataTypes.DECIMAL(3, 1),
    validate: {
      min: 0,
      max: 10,
    },
  },
  reviewText: {
    type: DataTypes.TEXT,
  },
});

User.hasMany(Watchlist);
Watchlist.belongsTo(User);
Content.hasMany(Watchlist);
Watchlist.belongsTo(Content);

User.hasMany(Review);
Review.belongsTo(User);
Content.hasMany(Review);
Review.belongsTo(Content);

module.exports = {
  User,
  Content,
  Watchlist,
  Review,
};
