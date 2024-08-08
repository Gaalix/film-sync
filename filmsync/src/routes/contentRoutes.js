const express = require("express");
const router = express.Router();
const { contentCrud } = require("../database/crud");

// Create new content
router.post("/", async (req, res) => {
  try {
    const newContent = await contentCrud.create(req.body);
    res.status(201).json(newContent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all content
router.get("/", async (req, res) => {
  try {
    const content = await contentCrud.findAll();
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific content
router.get("/:id", async (req, res) => {
  try {
    const content = await contentCrud.findById(req.params.id);
    if (content) {
      res.json(content);
    } else {
      res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update content
router.put("/:id", async (req, res) => {
  try {
    const updatedContent = await contentCrud.update(req.params.id, req.body);
    if (updatedContent) {
      res.json(updatedContent);
    } else {
      res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete content
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await contentCrud.delete(req.params.id);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
