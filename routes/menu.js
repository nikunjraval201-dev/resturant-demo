const express = require("express");
const router = express.Router();

const {
    createMenuItem,
    getMenuItems,
    getMenuByCategory,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
} = require("../controllers/menuController");

router.post("/", createMenuItem);
router.get("/", getMenuItems);
router.get("/category/:categoryId", getMenuByCategory);
router.get("/:id", getMenuItemById);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

module.exports = router;