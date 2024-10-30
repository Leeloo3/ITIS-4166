const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Item = require('../models/Item');

// Basic routes first
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/items', async (req, res) => {
    try {
        const items = await Item.find({});
        res.render('items', { items });
    } catch (error) {
        res.render('error', { message: error.message, code: 500 });
    }
});

router.get('/new', (req, res) => {
    res.render('new');
});

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Item routes
router.post('/items', upload.single('image'), async (req, res) => {
    try {
        const itemData = {
            ...req.body,
            images: req.file ? ['/images/' + req.file.filename] : []
        };
        const item = await Item.create(itemData);
        res.redirect(`/items/${item._id}`);
    } catch (error) {
        res.render('error', { message: error.message, code: 400 });
    }
});

router.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.render('error', { message: "Item not found", code: 404 });
        }
        res.render('itemDetails', { item });
    } catch (error) {
        res.render('error', { message: error.message, code: 500 });
    }
});

router.get('/items/:id/edit', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.render('error', { message: "Item not found", code: 404 });
        }
        res.render('edit', { item });
    } catch (error) {
        res.render('error', { message: error.message, code: 500 });
    }
});

router.post('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) {
            return res.render('error', { message: "Item not found", code: 404 });
        }
        res.redirect(`/items/${item._id}`);
    } catch (error) {
        res.render('error', { message: error.message, code: 400 });
    }
});

router.post('/items/:id/delete', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.render('error', { message: "Item not found", code: 404 });
        }
        res.redirect('/items');
    } catch (error) {
        res.render('error', { message: error.message, code: 500 });
    }
});

module.exports = router;
