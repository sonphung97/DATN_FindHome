const express = require('express');
const router = express.Router();
const categoryController = require('./controller');
const { auth } = require('../../middleware');

router.get('/:id', auth, categoryController.getDetailCategory);
router.delete('/:id', auth, categoryController.deleteCategory);
router.patch('/:id', auth, categoryController.updateCategory);
router.get('/', categoryController.getAllCategories);
router.post('/', auth, categoryController.createCategory);

module.exports = router;