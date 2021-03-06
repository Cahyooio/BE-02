/**
 * @file contains authentication request handler and its business logic
 * @author Fikri Rahmat Nurhidayat
 */
 const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../../../models");
const cloudinary = require("../../../../config/cloudinary");
const SALT = 10;

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    });
  });
}


function checkPassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(isPasswordCorrect);
    });
  });
}
function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia");
}


module.exports = {
  async register(req, res) {
    const nama = req.body.nama;
    const email = req.body.email;
    const password = await encryptPassword(req.body.password);
    const user = await User.create({ nama, email, password });
    res.status(201).json({
      id: user.id,
      nama: user.nama,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  },

  async login(req, res) {
    const email = req.body.email.toLowerCase(); // Biar case insensitive
    const password = req.body.password;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: "Email tidak ditemukan" });
      return;
    }

    const isPasswordCorrect = await checkPassword(
      user.password,
      password
    );
    const token = createToken({
      id: user.id,
      nama : user.nama,
      email: user.email,
    })

    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Password salah!" });
      return;
    }
    //nanti tambahkan di { secure : true} setelah deploy
    // res.cookie('jwt',token, {sameSite:'none', secure : true, maxAge:24*60*60*10000})
    // res.status(201).json({
    //   id: user.id,
    //   email: user.email,
    //   token: token, // Kita bakal ngomongin ini lagi nanti.
    //   createdAt: user.createdAt,
    //   updatedAt: user.updatedAt,
    // });
    res.status(202).json({token})
  },
  async uploadFotoUser(req,res){
    try {
      const fileBase64 = req.file.buffer.toString("base64");
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;
      const tanggal = Date.now();
      const namaFile = "Gambar User "+ tanggal;
  
      cloudinary.uploader.upload(file,{public_id:"secondhand/users/"+namaFile}, function (err, result) {
        if (!!err) {
          console.log(err)
          return res.status(400).json({
            message: "Gagal upload file!"
          })
        }
        console.log(namaFile)
        console.log(result.url)
        res.status(201).json({
          message: "Upload image berhasil",
          url: result.url,
          namafile : namaFile,
        })
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }

  },
  async uploadReFotoUser(req,res){
    try {
      const fileBase64 = req.file.buffer.toString("base64");
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;
      const namaReup = req.body.namafilebaru
  
      cloudinary.uploader.upload(file,{public_id:"secondhand/users/"+namaReup}, function (err, result) {
        if (!!err) {
          console.log(err)
          return res.status(400).json({
            message: "Gagal upload file!"
          })
        }
        console.log(result.url)
        res.status(201).json({
          message: "Upload image berhasil",
          url: result.url,
          namafile : namaReup,
        })
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }

  },
  async updateInfoUser(req, res){
    try {
      const user_id = req.params.id;
      await User.update({
        nama:req.body.nama,
        kota:req.body.kota,
        alamat:req.body.alamat,
        nohp:req.body.nohp,
        profilimg:req.body.profilimg,
        namaprofilimg:req.body.namaprofilimg
      },{
        where : {id: user_id}
      })
      return res.status(202).json('update profil berhasil')
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }

  }, 
  async getUserData(req,res){
    const id_user = req.params.id
    try {
      const user = await User.findOne({
        attributes: {exclude:['email','password','createdAt','updatedAt']},
        where : { id : id_user}
      })
      return res.status(200).json(user)
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
