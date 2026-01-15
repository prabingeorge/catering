import express from "express";

import model from '../models/index.cjs';

const { Categories, CategoriesLists, CategoriesListItems, PurchaseDetails, User } = model;

// CategoriesListItems.hasMany(PurchaseDetails, { foreignKey: 'list_item_id' });
// PurchaseDetails.belongsTo(CategoriesListItems, { foreignKey: 'list_item_id' });

const router = express.Router();

// Get all users details
router.get("/all-users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove all users details
router.delete("/all-users-remove", async (req, res) => {
  try {
    const users = await User.truncate({ cascade: true });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get all purchases details
router.get("/all-purchases", async (req, res) => {
  try {
    const purchaseDetails = await PurchaseDetails.findAll();
    res.json(purchaseDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove all purchases details
router.delete("/all-purchases-remove", async (req, res) => {
  try {
    const purchaseDetails = await PurchaseDetails.destroy({
      where: {},
      truncate: true,
    });
    res.json(purchaseDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all purchase details
router.get("/users-purchase-details", async (req, res) => {
  try {
    const users = await Categories.findAll({
      // Select specific attributes if necessary
      // attributes: ['id', 'username'], 
      include: [
        {
          model: PurchaseDetails,
          as: 'PurchaseDetails', // Use the alias defined in your association
          required: true, // Forces an INNER JOIN for the Order table
          // attributes: ['id', 'orderDate'],
          include: [
            {
              model: CategoriesListItems,
              as: 'CategoriesListItems', // Use the alias defined in your association
              required: true, // Forces an INNER JOIN for the Order table
              // attributes: ['id', 'orderDate'],
            }
          ]
        }
      ]
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
