const express = require('express');
const musicController = require('../controllers/music.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
});
router.post('/upload', requireAuth, upload.single("music"), musicController.createMusic);

module.exports = router;