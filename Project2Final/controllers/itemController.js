const Item = require('../models/Item');

class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

const itemController = {
    getAllItems: async (req, res) => {
        const items = await Item.find({ active: true })
            .sort({ createdAt: -1 })
            .select('-__v');
        
        if (!items.length) {
            return res.render('items', { 
                items: [],
                message: "No items found"
            });
        }
        res.render('items', { items });
    },

    getItem: async (req, res) => {
        const item = await Item.findById(req.params.id).select('-__v');
        if (!item) {
            throw new ApiError("Item not found", 404);
        }
        res.render('itemDetails', { item });
    },

    createItem: async (req, res) => {
        if (!req.file) {
            throw new ApiError("Image is required", 400);
        }

        const itemData = {
            ...req.body,
            images: ['/images/' + req.file.filename]
        };

        try {
            const item = await Item.create(itemData);
            res.redirect(`/items/${item._id}`);
        } catch (error) {
            const fs = require('fs').promises;
            await fs.unlink(req.file.path).catch(console.error);
            
            if (error.name === 'ValidationError') {
                throw new ApiError(error.message, 400);
            }
            throw error;
        }
    },

    updateItem: async (req, res) => {
        const item = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new: true, 
                runValidators: true,
                context: 'query'
            }
        );

        if (!item) {
            throw new ApiError("Item not found", 404);
        }

        res.redirect(`/items/${item._id}`);
    },

    deleteItem: async (req, res) => {
        const item = await Item.findByIdAndDelete(req.params.id);
        
        if (!item) {
            throw new ApiError("Item not found", 404);
        }

        if (item.images && item.images.length) {
            const fs = require('fs').promises;
            for (const imagePath of item.images) {
                await fs.unlink('public' + imagePath).catch(console.error);
            }
        }

        res.redirect('/items');
    }
};

module.exports = itemController;
