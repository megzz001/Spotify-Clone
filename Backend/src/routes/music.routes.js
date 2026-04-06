const express = require('express');
const musicController = require('../controllers/music.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
});
router.post('/upload', authMiddleware.authArtist, upload.single("music"), musicController.createMusic);
router.post('/album', authMiddleware.authArtist, musicController.createAlbum);
router.get('/', musicController.getAllMusics);
module.exports = router;