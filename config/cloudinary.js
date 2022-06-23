// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drakr4vtu", // TODO: Ganti dengan cloudname-mu
  api_key: "588729358399297", // TODO: Ganti dengan API Key-mu
  api_secret: "ZzE_Uo45mbMJFHJLGhYajTqbmpM", // TODO: Ganti dengan API Secret-mu
  secure: true,
});

module.exports = cloudinary;