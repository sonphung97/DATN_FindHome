const express = require('express');
const router = express.Router();
const postController = require('./controller');
const { auth } = require('../../middleware');

router.get('/get-for-update/:id', auth, postController.getPostForUpdate);
router.patch('/comment/:id', auth, postController.comment);
router.patch('/rate/:id', auth, postController.rate);
router.patch('/follow/:id', auth, postController.follow);
router.patch('/check-outdated-postage', postController.checkOutDatedPostage);
router.get('/dashboard', postController.getDashboardData);
router.get('/:id', postController.getDetailPost);
router.patch('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.post('/', auth, postController.createNewPost);
router.get('/', postController.getAllPost);

module.exports = router;