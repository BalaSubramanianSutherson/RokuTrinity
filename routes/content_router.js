const express = require('express');
const router = express.Router();
const contentController = require('../controllers/content_controller');

router.get('/movies', contentController.updateMovieContents)
router.get('/series', contentController.updateSeriesContents)
router.get('/stream', contentController.updateLiveContents)
router.get('/search', contentController.getContents)

module.exports = router;