const MenuItem = require("../models/MenuItem");

// Create Menu Item
exports.createMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body);

     const io = req.app.get("io");
    if (io) io.emit("menu-created", menuItem);


    res.status(201).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Menu Items
exports.getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find().populate("categoryId");

    res.status(200).json({
      success: true,
      data: menuItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Menu Items By Category
exports.getMenuByCategory = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({
      categoryId: req.params.categoryId,
    });

    res.status(200).json({
      success: true,
      data: menuItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Menu Item
exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Menu Item
// Update Menu Item
exports.updateMenuItem = async (req, res) => {
  console.log("current request body", req.body);

  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    const io = req.app.get("io");   // ← req.io ને બદલે આ વાપરો
    if (io) io.emit("menu-updated", menuItem);
    res.status(200).json({
      success: true,
      data: menuItem,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Menu Item
exports.deleteMenuItem = async (req, res) => {
  try {
const deletedMenu = await MenuItem.findByIdAndDelete(req.params.id);

  const io = req.app.get("io");
    if (io) {
      io.emit("menu-deleted", { id: deletedMenu._id });
    }
    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
