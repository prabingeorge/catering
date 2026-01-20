import express from "express";
// import DonationUser from "../models/DonationUser.js";
import auth from "../middleware/auth.js";
import { Op } from 'sequelize';
import model from '../models/index.cjs';

const { User, Categories, CategoriesLists, CategoriesListItems, PurchaseDetails } = model;

const router = express.Router();

// Get all categories
// router.get("/categories", auth, async (req, res) => {
router.get("/categories", async (req, res) => {
  try {
    const categories = await Categories.findAll({
      attributes: [
        ['category_id', 'categoryId'],
        'name'
      ],
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Categories-list
router.post("/categories-list", async (req, res) => {
  const { type, imageName, categoryId } = req.body;
  try {
    const categoriesList = await CategoriesLists.findOne({ where: { [Op.or]: [{ type }] } });
    if (categoriesList) {
      return res.status(422)
        .send({ message: 'Type already exists' });
    }

    // Create new categories list
    const newData = await CategoriesLists.create({
      type,
      image_name: imageName,
      category_id: categoryId
    });

    res.status(201).json({ id: newData.id, type: newData.type, imageName: newData?.image_name, categoryId: newData?.category_id, updatedAt: newData.updatedAt, createdAt: newData.createdAt });
  } catch (e) {
    console.log(e);
    return res.status(500)
      .send(
        { message: 'Could not perform operation at this time, kindly try again later.' });
  }
});

// Get all categories-list
router.get("/categories-list", async (req, res) => {
  try {
    const categoriesList = await CategoriesLists.findAll();
    res.json(categoriesList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all categories-list by id
router.post("/categories-list-by-id", async (req, res) => {
  try {
    const { categoryId } = req.body;
    const categoriesList = await CategoriesLists.findAll({
      attributes: [
        ['category_id', 'categoryId'],
        ['category_list_id', 'categoryListId'],
        'type',
        ['image_name', 'imageName'],
      ],
      where: { [Op.or]: [{ category_id: categoryId }] }
    });
    res.json(categoriesList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all categories-list-items by id
router.post("/categories-list-items-by-id", async (req, res) => {
  try {
    const { categoryListId } = req.body;
    const categoriesListItems = await CategoriesListItems.findAll({
      attributes: [
        ['category_list_id', 'categoryListId'],
        ['category_list_item_id', 'categoryListItemId'],
        ['item_name', 'itemName'],
        ['image_name', 'imageName'],
        'price',
        ['discount_price', 'discountPrice'],
        'ratings',
        ['send_items_count', 'sendItemsCount']
      ],
      where: { [Op.or]: [{ category_list_id: categoryListId }] }
    });
    res.json(categoriesListItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get categories-list-items details by list_item_id
router.post("/categories-list-items-details", async (req, res) => {
  try {
    const { categoryListItemId } = req.body;
    const categoriesListItems = await CategoriesListItems.findAll({
      attributes: [
        ['category_list_id', 'categoryListId'],
        ['category_list_item_id', 'categoryListItemId'],
        ['item_name', 'itemName'],
        ['image_name', 'imageName'],
        'price',
        ['discount_price', 'discountPrice'],
        'ratings',
        ['send_items_count', 'sendItemsCount']
      ],
      where: { [Op.or]: [{ category_list_item_id: categoryListItemId }] }
    });
    res.json(...categoriesListItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add purchase detail (for the authenticated user)
router.post("/purchase-detail", auth, async (req, res) => {
  const { userId, categoryId, categoryListId, categoryListItemId, quantity, amount } = req.body;
  console.log("======" + JSON.stringify(req.body))
  try {
    // const purchaseDetail = await PurchaseDetails.findOne({ where: { [Op.or]: [{ user_id: userId }] } });
    // console.log("-------" + purchaseDetail)
    // if (!purchaseDetail) {
    //     return res.status(422)
    //         .send({ message: 'Enter all the required information!' });
    // }

    // Create new purchase list
    const newData = await PurchaseDetails.create({
      user_id: userId,
      category_id: categoryId,
      category_list_id: categoryListId,
      category_list_item_id: categoryListItemId,
      quantity,
      amount
    });

    res.status(201).json({ id: newData.id, userId: newData.user_id, categoryId: newData?.category_id, listId: categoryListId?.category_list_id, categoryListItemId: newData?.category_list_item_id, quantity: newData?.quantity, amount: newData?.amount, updatedAt: newData.updatedAt, createdAt: newData.createdAt });
  } catch (e) {
    console.log(e);
    return res.status(500)
      .send(
        { message: 'Could not perform operation at this time, kindly try again later.' });
  }
});

// Get all purchase details
router.get("/purchase-details", async (req, res) => {
  try {
    const purchaseDetails = await PurchaseDetails.findAll({
      attributes: [
        ['purchase_id', 'purchaseId'],
        ['user_id', 'userId'],
        ['category_id', 'categoryId'],
        ['category_list_id', 'categoryListId'],
        ['category_list_item_id', 'categoryListItemId'],
        'quantity',
        'amount'
      ]
    });
    res.json(purchaseDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all purchase details by userid
router.post("/purchase-details-by-userid", async (req, res) => {
  try {
    const { userId } = req.body;
    const purchaseDetails = await PurchaseDetails.findAll({
      attributes: [
        ['purchase_id', 'purchaseId'],
        ['user_id', 'userId'],
        ['category_id', 'categoryId'],
        ['category_list_id', 'categoryListId'],
        ['category_list_item_id', 'categoryListItemId'],
        'quantity',
        'amount'
      ],
      where: { [Op.or]: [{ user_id: userId }] }
    });
    res.json(purchaseDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
