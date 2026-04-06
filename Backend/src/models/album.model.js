const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    musics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'music' }],
}, { timestamps: true });

const albumModel = mongoose.model('Album', albumSchema);
module.exports = albumModel;