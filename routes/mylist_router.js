const express = require('express');
const router = express.Router();
const mylistController = require('../controllers/mylist_controller');

router.get('/', mylistController.getMyList)
router.post('/update', mylistController.updateMyList)


module.exports = router;