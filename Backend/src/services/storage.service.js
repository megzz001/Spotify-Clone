const {imageKit} = require('../utils/imageKit');


const imageKitClient = new imageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});