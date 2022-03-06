const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware');
const userController = require('./controller');

router.patch('/change-password/:id', auth, userController.changePassword);
router.get('/posts-owner/:id', auth, userController.getPostOwner);
router.get('/:id', auth, userController.getDetailUser);
router.patch('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);
router.get('/', auth, userController.getAllUsers);
router.post('/', userController.register);

module.exports = router;