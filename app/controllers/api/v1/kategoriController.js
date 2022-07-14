const { kategori,Produk } = require("../../../models");
const Sequelize = require('sequelize')

module.exports = {
    async getAllKategori(req,res){
        try {
            let allkategori = await kategori.findAll()
            if(!allkategori) {
                return res.status(404).json("tidak ada kategori")
            }
            return res.status(200).json(allkategori);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    async getKategoriBerdasarkanProduk(req,res){
        try {
            let homekategori = await Produk.findAll(
                {
                    attributes : [
                        Sequelize.fn('DISTINCT', Sequelize.col('kategori')),'kategori'
                    ]
                }
            )
            if(!homekategori) {
                return res.status(404).json("tidak ada kategori")
            }
            return res.status(200).json(homekategori);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}