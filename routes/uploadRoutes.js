const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    console.log("Uploaded file:", req.file);
    res.status(200).json({ imageUrl: req.file.path });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
