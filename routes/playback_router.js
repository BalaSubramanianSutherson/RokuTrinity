const express = require('express');
const router = express.Router();
const playbackController = require('../controllers/playback_controller');

router.get('/', playbackController.getPlayback)
router.post('/update', playbackController.updatePlayback)
router.post('/completed', playbackController.removePlayback)


module.exports = router;