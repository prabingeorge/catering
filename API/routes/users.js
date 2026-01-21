import express from "express";
import * as Sequelize from 'sequelize';
import model from '../models/index.cjs';

const { Categories, CategoriesLists, CategoriesListItems, PurchaseDetails, User } = model;

Categories.hasMany(CategoriesLists, { foreignKey: 'category_id' });
CategoriesLists.belongsTo(Categories, { foreignKey: 'category_id' });

CategoriesLists.hasMany(CategoriesListItems, { foreignKey: 'category_list_id' });
CategoriesListItems.belongsTo(CategoriesLists, { foreignKey: 'category_list_id' });

CategoriesListItems.hasMany(PurchaseDetails, { foreignKey: 'category_list_item_id' });
PurchaseDetails.belongsTo(CategoriesListItems, { foreignKey: 'category_list_item_id' });

User.hasMany(PurchaseDetails, { foreignKey: 'user_id' });
PurchaseDetails.belongsTo(User, { foreignKey: 'user_id' });

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
      attributes: [
        ['category_id', 'categoryId'],
        'name'
      ],
      include: [
        {
          model: CategoriesLists,
          as: 'CategoriesLists', // Use the alias defined in your association
          required: true, // Forces an INNER JOIN for the Order table
          attributes: [
            ['category_list_id', 'categoryListId'],
            'type',
            ['image_name', 'imageName'],
            ['category_id', 'categoryId'],
          ],
          include: [
            {
              model: CategoriesListItems,
              as: 'CategoriesListItems', // Use the alias defined in your association
              required: true, // Forces an INNER JOIN for the Order table
              "send_items_count": 1,
              attributes: [
                ['category_list_item_id', 'categoryListItemId'],
                ['item_name', 'itemName'],
                ['image_name', 'imageName'],
                'price',
                ['discount_price', 'discountPrice'],
                'ratings',
                ['send_items_count', 'sendItemsCount']
              ],
              include: [
                {
                  model: PurchaseDetails,
                  as: 'PurchaseDetails', // Use the alias defined in your association
                  required: true, // Forces an INNER JOIN for the Order table
                  attributes: [
                    ['purchase_id', 'purchaseId'],
                    'quantity',
                    'amount'
                  ],
                  include: [
                    {
                      model: User,
                      as: 'User', // Use the alias defined in your association
                      required: true, // Forces an INNER JOIN for the Order table
                      attributes: [
                        ['user_id', 'userId'],
                        'name',
                        'email',
                        'phone',
                        'status'
                      ],
                    }
                  ]
                }
              ]
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

// Truncate all the tables
router.delete("/truncate-tables", async (req, res) => {
  try {
    await Categories.truncate({ restartIdentity: true });
    await CategoriesLists.truncate({ restartIdentity: true });
    await CategoriesListItems.truncate({ restartIdentity: true });
    await PurchaseDetails.truncate({ restartIdentity: true });
    await User.truncate({ restartIdentity: true });
    res.json({ message: "Truncated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
