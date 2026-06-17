const Category = require("../models/Category");
const MenuItem = require("../models/MenuItem");

exports.getGroupMenu = async (req, res) => {
  try {
    const categories = await Category.find();
    const menuItems = await MenuItem.find();

    const result = {};

    categories.forEach((category) => {
      result[category.name.toLowerCase()] = {
        categoryId: category._id,
        items: menuItems
          .filter(
            (item) => item.categoryId.toString() === category._id.toString(),
          )
          .map((item) => ({
            id: item._id,
            name: item.name,
            price: item.price,
            description: item.description,
            image: item.image,
          })),
      };
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
