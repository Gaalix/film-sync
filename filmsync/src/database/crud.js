const { User, Content, Watchlist, Review } = require("./models");

// User CRUD operations
const userCrud = {
  create: async (userData) => {
    return await User.create(userData);
  },
  findAll: async () => {
    return await User.findAll();
  },
  findById: async (id) => {
    return await User.findByPk(id);
  },
  update: async (id, userData) => {
    const user = await User.findByPk(id);
    if (user) {
      return await user.update(userData);
    }
    return null;
  },
  delete: async (id) => {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  },
};

// Content CRUD operations
const contentCrud = {
  create: async (contentData) => {
    return await Content.create(contentData);
  },
  findAll: async () => {
    return await Content.findAll();
  },
  findById: async (id) => {
    return await Content.findByPk(id);
  },
  update: async (id, contentData) => {
    const content = await Content.findByPk(id);
    if (content) {
      return await content.update(contentData);
    }
    return null;
  },
  delete: async (id) => {
    const content = await Content.findByPk(id);
    if (content) {
      await content.destroy();
      return true;
    }
    return false;
  },
};

// Watchlist CRUD operations
const watchlistCrud = {
  create: async (watchlistData) => {
    return await Watchlist.create(watchlistData);
  },
  findAll: async () => {
    return await Watchlist.findAll({ include: [User, Content] });
  },
  findById: async (id) => {
    return await Watchlist.findByPk(id, { include: [User, Content] });
  },
  update: async (id, watchlistData) => {
    const watchlist = await Watchlist.findByPk(id);
    if (watchlist) {
      return await watchlist.update(watchlistData);
    }
    return null;
  },
  delete: async (id) => {
    const watchlist = await Watchlist.findByPk(id);
    if (watchlist) {
      await watchlist.destroy();
      return true;
    }
    return false;
  },
};

// Review CRUD operations
const reviewCrud = {
  create: async (reviewData) => {
    return await Review.create(reviewData);
  },
  findAll: async () => {
    return await Review.findAll({ include: [User, Content] });
  },
  findById: async (id) => {
    return await Review.findByPk(id, { include: [User, Content] });
  },
  update: async (id, reviewData) => {
    const review = await Review.findByPk(id);
    if (review) {
      return await review.update(reviewData);
    }
    return null;
  },
  delete: async (id) => {
    const review = await Review.findByPk(id);
    if (review) {
      await review.destroy();
      return true;
    }
    return false;
  },
};

module.exports = {
  userCrud,
  contentCrud,
  watchlistCrud,
  reviewCrud,
};
