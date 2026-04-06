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
router.get('/', authMiddleware.authUser, musicController.getAllMusics);
router.get('/albums', authMiddleware.authUser, musicController.getAllAlbums);
router.get('/album/:id', authMiddleware.authUser, musicController.getAlbumById);
module.exports = router;