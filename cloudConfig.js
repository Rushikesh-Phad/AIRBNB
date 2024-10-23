//Requiring Cloudinary Version-2
const cloudinary = require("cloudinary").v2;

//Requiring multer-storage-cloudinary
const { CloudinaryStorage } = require("multer-storage-cloudinary");

//Backend Ko Cloudinary Ke Sath Jodne Ke Liya
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "solivagant_DEV",
      allowerdFormats: ["png", "jpg", "jpeg"],
    },
  });

  module.exports = {
    cloudinary,
    storage,
  };