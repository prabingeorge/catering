import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import AuthController from '../controllers/AuthController.js';

import { Op } from 'sequelize';
import model from '../models/index.cjs';

const { User, Categories, CategoriesLists, CategoriesListItems } = model;

console.log("Modal" + Categories);


import { registerSchema, loginSchema } from "../validators/auth.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
// router.post('/register', AuthController.signUp);
router.post("/register", async (req, res) => {
    console.log("register API");
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, phone, password, status } = req.body;
    try {
        console.log(User);
        const user = await User.findOne({ where: { [Op.or]: [{ phone }, { email }] } });
        if (user) {
            return res.status(422)
                .send({ message: 'User with that email or phone already exists' });
        }

        // Hash password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);
        const hashedPassword = bcrypt.hashSync(password, 8)

        // Create new user
        const newUser = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            status,
        });

        // Generate JWT
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(201).json({
            token,
            user: { name: name, email: email }
        });

        // return res.status(201).send({message: 'Account created successfully'});
    } catch (e) {
        console.log(e);
        return res.status(500)
            .send(
                { message: 'Could not perform operation at this time, kindly try again later.' });
    }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;
    try {
        // Check for user
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT
        const token = jwt.sign({ id: user.id, name: user.name, email: user.email, phone: user?.phone, role: 'user' }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Add Categories
router.post("/categories", async (req, res) => {
    console.log("register API");
    const { name } = req.body;
    try {
        // console.log(Categories);
        const user = await Categories.findOne({ where: { [Op.or]: [{ name }] } });
        if (user) {
            return res.status(422)
                .send({ message: 'Name already exists' });
        }

        // Create new categories
        const newData = await Categories.create({
            name
        });

        res.status(201).json({ id: newData.id, name: newData.name, updatedAt: newData.updatedAt, createdAt: newData.createdAt });

        // return res.status(201).send({message: 'Account created successfully'});
    } catch (e) {
        console.log(e);
        return res.status(500)
            .send(
                { message: 'Could not perform operation at this time, kindly try again later.' });
    }
});

// Add CategoriesLists
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

// Add Categories-list-items
router.post("/categories-list-items", async (req, res) => {
    const { itemName, imageName, price, discountPrice, ratings, sendItemsCount, listId } = req.body;
    try {
        const categoriesListItems = await CategoriesListItems.findOne({ where: { [Op.or]: [{ item_name: itemName }] } });
        if (categoriesListItems) {
            return res.status(422)
                .send({ message: 'Item name already exists' });
        }

        // Create new categories list
        const newData = await CategoriesListItems.create({
            item_name: itemName,
            image_name: imageName,
            price,
            discount_price: discountPrice,
            ratings: ratings,
            send_items_count: sendItemsCount,
            list_id: listId
        });

        res.status(201).json({ id: newData?.id, itemName: newData.item_name, imageName: newData?.image_name, price: newData?.price, discountPrice: newData?.discount_price, ratings: newData?.ratings, sendItemsCount: newData?.send_items_count, listId: newData?.list_id, updatedAt: newData.updatedAt, createdAt: newData.createdAt });
    } catch (e) {
        console.log(e);
        return res.status(500)
            .send(
                { message: 'Could not perform operation at this time, kindly try again later.' });
    }
});

export default router;
