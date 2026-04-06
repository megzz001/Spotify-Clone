require('dotenv').config();
const ImageKit  = require('@imagekit/nodejs');

const imageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function uploadFile(file){
    const result = await imageKitClient.files.upload({
        file,
        fileName: "music_"+ Date.now(),
        folder:"Spotify-Clone/Music"
    });
    return result.url;
}

module.exports = {uploadFile};