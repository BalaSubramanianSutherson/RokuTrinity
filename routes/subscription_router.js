const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription_controller');

router.get('/', subscriptionController.getMySubscription)
router.post('/update', subscriptionController.updateMySubscription)


module.exports = router;