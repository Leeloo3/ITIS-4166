const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/new', (req, res) => {
    res.render('new');
});
router.get('/items', itemController.getAllItems); // View all items
router.get('/items/:id', itemController.getItemDetails); // View item details
router.post('/items', itemController.createItem); // Create new item
router.get('/items/:id/edit', itemController.editItem); // Edit item
router.post('/items/:id', itemController.updateItem); // Update item
router.post('/items/:id/delete', itemController.deleteItem); // Delete item

module.exports = router;
