const { Penawaran, Produk } = require("../../../models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
  //dari buyer untuk seller
  async createPenawaran(req, res) {
    try {
      const {
        idbuyer,
        idproduk,
        namaproduk,
        hargaproduk,
        idseller,
        hargatawar,
        statustawar,
      } = req.body;
      const newPenawaran = await Penawaran.create({
        idbuyer,
        idproduk,
        namaproduk,
        hargaproduk,
        idseller,
        hargatawar,
        statustawar,
      });
      await Produk.update(
        {
          statusproduk: "ditawar",
        },
        {
          where: { id: req.body.idproduk },
        }
      );
      return res.status(201).json(newPenawaran);
    } catch (error) {
      res
        .status(422)
        .json({ msg: error.message, pesan: "'Penawaran Gagal Diupload'" });
    }
  },
  // untuk seller, seller by idseller
  async listProdukDiminati(req, res) {
    try {
      const idpenjual = req.params.idseller;
      let diminati = await Produk.findAll({
        where: {
          idseller: idpenjual,
          [Op.or]: [{ statusproduk: "ditawar" }, { statusproduk: "reserved" }],
        },
      });
      return res.status(200).json(diminati);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async produkSudahTawar(req, res) {
    try {
      const kondisi_list = req.params.kondisi;
      const arrayKondisi = kondisi_list.split("--");
      const sudahtawar = await Penawaran.findOne({
        where: {
          idbuyer: arrayKondisi[0],
          idproduk: arrayKondisi[1],
          [Op.or]: [{ statustawar: "menawar" }, { statustawar: "diterima" }],
        },
      });
      if (!sudahtawar) {
        return res.status(404).json("belum ditawar");
      }
      return res.status(200).json("sudah ditawar");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async listPenawaran(req, res) {
    try {
      const produk_id = req.params.idproduk;
      let penawaran = await Penawaran.findAll({
        where: {
          idproduk: produk_id,
          [Op.or]: [{ statustawar: "menawar" }, { statustawar: "diterima" }],
        },
        include: "pembeli",
        attributes: { exclude: ["updatedAt", "createdAt"] },
      });
      if (!penawaran) {
        return res.status(404).json("Penawaran not found");
      }
      return res.status(200).json(penawaran);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async listSemuaPenawaranByUser(req, res) {
    try {
      const user_id = req.params.iduser;
      let penawaran = await Penawaran.findAll({
        where: { idseller: user_id, statustawar: "menawar" },
        include: "pembeli",
        attributes: { exclude: ["updatedAt", "createdAt"] },
      });
      if (!penawaran) {
        return res.status(404).json("Penawaran not found");
      }
      return res.status(200).json(penawaran);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // untuk seller
  async totalListPenawaran(req, res) {
    try {
      const idpenjual = req.params.idseller;
      let totalpenawaran = await Penawaran.count({
        where: { idseller: idpenjual, statustawar: "menawar" },
      });
      if (!totalpenawaran) {
        return res.status(404).json({ total: 0 });
      }
      return res.status(200).json({ total: totalpenawaran });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // untuk seller
  async listPenawaranById(req, res) {
    try {
      const idpenawaran = req.params.idpenawaran;
      let penawaran = await Penawaran.findOne({
        where: { id: idpenawaran, statustawar: "menawar" },
        include: "pembeli",
        attributes: { exclude: ["updatedAt", "createdAt"] },
      });
      if (!penawaran) {
        return res.status(404).json("Penawaran not found");
      }
      return res.status(200).json(penawaran);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  //untuk seller
  async updatePenawaran(req, res) {
    try {
      const penawaran_id = req.params.idpenawaran;
      const status_tawar = req.body.statustawar;
      const id_buyer = req.body.idbuyer;
      const id_produk = req.body.idproduk;
      await Penawaran.update(
        {
          statustawar: status_tawar,
        },
        {
          where: { id: penawaran_id },
        }
      );
      if (status_tawar == "diterima") {
        await Produk.update(
          {
            statusproduk: "reserved",
            idbuyer: id_buyer,
          },
          {
            where: { id: id_produk },
          }
        ),
          await Penawaran.update(
            {
              statustawar: "ditolak",
            },
            {
              where: {
                id: { [Op.ne]: penawaran_id },
                idproduk: id_produk,
              },
            }
          );
      }

      return res.status(201).json("penawaran updated.");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // untuk buyer
  async responPenawaran(req, res) {
    try {
      const buyer_id = req.params.idbuyer;
      const respon = await Penawaran.findAll({
        where: { idbuyer: buyer_id },
      });
      if (!respon) {
        return res.status(404).json("There Is No Notification");
      }
      return res.status(200).json(respon);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  //untuk buyer
  async totalResponPenawaran(req, res) {
    try {
      const buyer_id = req.params.idbuyer;
      const respon = await Penawaran.count({
        where: { idbuyer: buyer_id },
      });
      if (!respon) {
        return res.status(404).json({ total: 0 });
      }
      return res.status(200).json({ total: respon });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async deletePenawaranById(req, res) {
    try {
      const penawaran_id = req.params.idpenawaran;
      await Penawaran.destroy({
        where: { id: penawaran_id },
      });
      return res.status(204).json({ msg: "berhasil dihapus" });
    } catch (error) {
      return res.status(422).json({ msg: error.message });
    }
  },
};
