const express = require('express');
const router = express.Router();
const postageController = require('./controller');
const { auth } = require('../../middleware');

router.delete('/:id', auth, postageController.deletePostage);
router.post('/', auth, postageController.createPostage);
router.get('/', auth, postageController.getAllPostages);

module.exports = router;