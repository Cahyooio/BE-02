const { Produk } = require("../../../models");
const cloudinary = require("../../../../config/cloudinary");
const { Op } = require("sequelize");

module.exports = {
  async uploadFotoProdukSatu(req, res) {
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;
    const tanggal = Date.now();
    const namaFile = "Gambar Produk " + tanggal;

    cloudinary.uploader.upload(
      file,
      { public_id: "secondhand/products/" + namaFile },
      function (err, result) {
        if (!!err) {
          console.log(err);
          return res.status(400).json({
            message: "Gagal upload file!",
          });
        }
        console.log(namaFile);
        console.log(result.url);
        res.status(201).json({
          message: "Upload image berhasil",
          url: result.url,
          namafile: namaFile,
        });
      }
    );
  },
  async uploadReFotoProdukSatu(req, res) {
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;
    const namaReup = req.body.namafilebaru;

    cloudinary.uploader.upload(
      file,
      { public_id: "secondhand/products/" + namaReup },
      function (err, result) {
        if (!!err) {
          console.log(err);
          return res.status(400).json({
            message: "Gagal upload file!",
          });
        }
        console.log(result.url);
        res.status(201).json({
          message: "Upload image berhasil",
          url: result.url,
          namafile: namaReup,
        });
      }
    );
  },
  async createProduk(req, res) {
    try {
      const {
        namaproduk,
        hargaproduk,
        kategori,
        idseller,
        deskripsi,
        foto1,
        namafoto1,
        foto2,
        namafoto2,
        foto3,
        namafoto3,
        foto4,
        namafoto4,
      } = req.body;
      const newProduk = await Produk.create({
        namaproduk,
        hargaproduk,
        kategori,
        idseller,
        deskripsi,
        foto1,
        namafoto1,
        foto2,
        namafoto2,
        foto3,
        namafoto3,
        foto4,
        namafoto4,
      });

      return res.status(201).json(newProduk);
    } catch (error) {
      res
        .status(422)
        .json({ msg: error.message, pesan: "'Produk Gagal Diupload'" });
    }
  },
  async getAllProduk(req, res) {
    try {
      let produk = await Produk.findAll();
      if (!produk) {
        return res.status(404).json("Product not found");
      }
      return res.status(200).json(produk);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  async getProdukDijual(req, res) {
    try {
        const penjual_id = req.params.penjualid;
        const produk = await Produk.findOne({ where: { iduser: penjual_id } });
        console.log(produk);
        if (!produk) {
          return res.status(404).json("Product not found");
        }
        return res.status(200).json(produk);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
  },
  async getProdukById(req, res) {
    try {
      const produk_id = req.params.id;
      const produk = await Produk.findOne({ where: { id: produk_id } });
      console.log(produk);
      if (!produk) {
        return res.status(404).json("Product not found");
      }
      return res.status(200).json(produk);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async updateProduk(req, res) {
    try {
      const produk_id = req.params.id;
      await Produk.update(
        {
          namaproduk: req.body.namaproduk,
          hargaproduk: req.body.hargaproduk,
          deskripsi: req.body.deskripsi,
          kategori: req.body.kategori,
          foto1: req.body.foto1,
          foto2: req.body.foto2,
          foto3: req.body.foto3,
          foto4: req.body.foto4,
        },
        {
          where: { id: produk_id },
        }
      );
      return res.status(201).json("produk updated.");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async deleteProduk(req, res) {
    try {
      const produk_id = req.params.id;
      await Produk.destroy({
        where: { id: produk_id },
      });
      return res
        .status(204)
        .json({ msg: "berhasil dihapus kemudian masuk arsip" });
    } catch (error) {
      return res.status(422).json({ msg: error.message });
    }
    // respon produk notfound & berhasil dihapus belum tampil

    // const produk_id = req.params.id;
    //  await Produk.destroy({
    //             where :{id : produk_id}
    //         })
    //         .then (()=>{res.status (204).json({
    //             status: "deleted." }

    //   )}).catch((err) => {
    //     res.status(422).json({
    //       status: "FAIL",
    //       message: err.message,
    //     });
    //   });
  },
  async batalTranksaksi(req,res){
    try {
      const produk_id = req.params.id;
      await Produk.update({
        statusproduk : null,
        idbuyer : null
      },{
        where : { id : produk_id }
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async getHistorySeller(req, res) {
    try {
    const penjual_id = req.params.penjualid;
      let produk = await Produk.findAll({
        where: {
          deletedAt: { [Op.ne]: null },
          iduser: penjual_id
          
        },
        paranoid: false,
      });
      if (!produk) {
        return res.status(404).json("Product Archive not found");
      }
      return res.status(200).json(produk);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async getHistoryBuyer(req, res) {
    try {
    const pembeli_id = req.params.pembeliid;
      let produk = await Produk.findAll({
        where: {
          deletedAt: { [Op.ne]: null },
          iduser: pembeli_id
          
        },
        paranoid: false,
      });
      if (!produk) {
        return res.status(404).json("Product Archive not found");
      }
      return res.status(200).json(produk);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
