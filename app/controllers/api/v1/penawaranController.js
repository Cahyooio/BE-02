const { Penawaran } = require('../../../models');
const { Op } = require('sequelize');
const penawaran = require('../../../models/penawaran');
const { array } = require('../../../middleware/uploadOnMemory');

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
            return res.status(201).json(newPenawaran);
        } catch (error) {
            res
                .status(422)
                .json({ msg: err.message, pesan: "'Penawaran Gagal Diupload'" });
        }
    },
    // untuk seller, seller by idseller
    async listPenawaran(req, res) {
        try {
            const idpenjual = req.params.idseller;
            let penawaran = await Penawaran.findAll(
                { where: { idseller: idpenjual } }
            );
            if (!penawaran) {
                return res.status(404).json("Penawaran not found");
            }
            return res.status(200).json(penawaran);
        } catch (error) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // untuk seller
    async totalListPenawaran(req, res) {
        try {
            const idpenjual = req.params.idseller;
            let totalpenawaran = await Penawaran.count(
                { where: { idseller: idpenjual } }
            );
            if (!totalpenawaran) {
                return res.status(404).json("Penawaran not found");
            }
            return res.status(200).json(totalpenawaran);
        } catch (error) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // untuk seller
    async listPenawaranById(req, res) {
        try {
            const idpenawaran = req.params.idpenawaran;
            let penawaran = await Penawaran.findOne(
                { where: { id: idpenawaran } }
            );
            if (!penawaran) {
                return res.status(404).json("Penawaran not found");
            }
            return res.status(200).json(penawaran);
        } catch (error) {
            return res.status(500).json({ msg: err.message });
        }
    },
    //untuk seller
    async updatePenawaran(req, res) {
        try {
            const penawaran_id = req.params.idpenawaran;
            await Penawaran.update(
                {
                    statustawar: req.body.statustawar,
                },
                {
                    where: { id: penawaran_id },
                }
            );
            return res.status(201).json("penawaran updated.");
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    // untuk buyer
    async responPenawaran(req, res) {
        try {
            const buyer_id = req.params.idbuyer;
            const respon= await Penawaran.findAll({
                where: {idbuyer: buyer_id },
                attributes:['statustawar'],
            })
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
            const respon= await Penawaran.count({
                where: {idbuyer: buyer_id },
            })
            if (!respon) {
                return res.status(404).json("There Is No Notification");
            }
            return res.status(200).json(respon);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}