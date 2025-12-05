const Resource = require("../models/Resource");

// Add (Create)
exports.createResource = async (req, res) => {
  try {
    const data = { ...req.body, createdBy: req.user.id };
    const resource = await Resource.create(data);
    res.status(201).json({ message: "Resource created", resource });
  } catch (err) {
    res.status(400).json({ message: "Failed to create", error: err.message });
  }
};

// Get all (current user's resources only)
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch", error: err.message });
  }
};

// Get single (only if user owns it)
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });
    if (!resource) return res.status(404).json({ message: "Not found" });
    res.json(resource);
  } catch (err) {
    res.status(400).json({ message: "Invalid id", error: err.message });
  }
};

// Update (only if user owns it)
exports.updateResource = async (req, res) => {
  try {
    const updated = await Resource.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found or not allowed" });
    res.json({ message: "Updated", resource: updated });
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

// Delete (only if user owns it)
exports.deleteResource = async (req, res) => {
  try {
    const deleted = await Resource.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });
    if (!deleted) return res.status(404).json({ message: "Not found or not allowed" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err.message });
  }
};