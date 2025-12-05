const express = require("express");
const router = express.Router();
const {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource
} = require("../controllers/resourceController");
const authMiddleware = require("../middleware/authMiddleware");

// All routes protected — only logged-in users
router.post("/", authMiddleware, createResource);        // Add
router.get("/", authMiddleware, getResources);           // Get all
router.get("/:id", authMiddleware, getResourceById);     // Get single
router.put("/:id", authMiddleware, updateResource);      // Update
router.delete("/:id", authMiddleware, deleteResource);   // Delete

module.exports = router;