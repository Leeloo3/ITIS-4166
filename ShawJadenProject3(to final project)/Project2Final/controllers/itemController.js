const items = require('../models/itemModel');

const itemController = {
    getAllItems: (req, res) => {
        const searchTerm = req.query.search ? req.query.search.toLowerCase() : '';
        const filteredItems = items.filter(item => 
            item.title.toLowerCase().includes(searchTerm) || 
            item.details.toLowerCase().includes(searchTerm)
        );
        filteredItems.sort((a, b) => a.price - b.price);
        res.render('items', { items: filteredItems });
    },
    getItemDetails: (req, res) => {
        const id = parseInt(req.params.id);
        const item = items.find(item => item.id === id);
        if (item) {
            res.render('itemDetails', { item });
        } else {
            res.render('error', { message: "Item not found", code: 404 });
        }
    },
    createItem: (req, res) => {
        const { title, seller, condition, price, details, image } = req.body;
        const newItem = {
            id: items.length + 1,
            title,
            seller,
            condition,
            price: parseFloat(price),
            details,
            image,
            active: true
        };
        items.push(newItem);
        res.redirect('/items');
    },
    editItem: (req, res) => {
        const id = parseInt(req.params.id);
        const item = items.find(item => item.id === id);
        if (item) {
            res.render('edit', { item });
        } else {
            res.render('error', { message: "Item not found", code: 404 });
        }
    },
    updateItem: (req, res) => {
        const id = parseInt(req.params.id);
        const itemIndex = items.findIndex(item => item.id === id);
        if (itemIndex >= 0) {
            items[itemIndex] = { ...items[itemIndex], ...req.body };
            res.redirect(`/items/${id}`);
        } else {
            res.render('error', { message: "Item not found", code: 404 });
        }
    },
    deleteItem: (req, res) => {
        const id = parseInt(req.params.id);
        const itemIndex = items.findIndex(item => item.id === id);
        if (itemIndex >= 0) {
            items.splice(itemIndex, 1);
            res.redirect('/items');
        } else {
            res.render('error', { message: "Item not found", code: 404 });
        }
    }
};

module.exports = itemController;
