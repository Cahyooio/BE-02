const { kategori } = require("../../../models");

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
    }
}