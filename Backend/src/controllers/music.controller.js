const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.service")


async function createMusic(req, res) {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { title } = req.body;
    const file = req.file;

    if (!file || !file.buffer) {
        return res.status(400).json({ message: "Music file is required" });
    }

    const fileUrl = await uploadFile(file.buffer.toString('base64'))

    if (!fileUrl) {
        return res.status(502).json({ message: "File upload failed" });
    }

    const music = await musicModel.create({
        uri: fileUrl,
        title,
        artist: req.user.id,
    })

    res.status(201).json({
        message: "Music created successfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist,
        }
    })

}

async function createAlbum(req, res) {

    const { title, musics } = req.body;

    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musics,
    })

    res.status(201).json({
        message: "Album created successfully",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics,
        }
    })}

async function getAllMusics(req, res) {
    const musics = await musicModel
        .find()
        .populate("artist", "username email")
    res.status(200).json({
        message: "Musics fetched successfully",
        musics: musics,
    })
}

// async function getAllAlbums(req, res) {

//     const albums = await albumModel.find().select("title artist").populate("artist", "username email")

//     res.status(200).json({
//         message: "Albums fetched successfully",
//         albums: albums,
//     })

// }

// async function getAlbumById(req, res) {

//     const albumId = req.params.albumId;

//     const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics")

//     return res.status(200).json({
//         message: "Album fetched successfully",
//         album: album,
//     })

// }


module.exports = { createMusic , createAlbum , getAllMusics };