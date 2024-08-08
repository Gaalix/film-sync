const express = require("express");
const router = express.Router();
const { reviewCrud } = require("../database/crud");

// Create new review
router.post("/", async (req, res) => {
  try {
    const newReview = await reviewCrud.create(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await reviewCrud.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific review
router.get("/:id", async (req, res) => {
  try {
    const review = await reviewCrud.findById(req.params.id);
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update review
router.put("/:id", async (req, res) => {
  try {
    const updatedReview = await reviewCrud.update(req.params.id, req.body);
    if (updatedReview) {
      res.json(updatedReview);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete review
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await reviewCrud.delete(req.params.id);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
