const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
    try {
        const result = await imagekit.upload({
            file: file,
            fileName: file.name,
            folder: "music",
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { uploadFile };