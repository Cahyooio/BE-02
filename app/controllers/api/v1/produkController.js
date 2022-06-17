const { Produk } = require('../../../models');

module.exports = {
    async createProduk (req, res) {
    try {
        const { namaproduk, hargaproduk, kategori, deskripsi, foto1,foto2,foto3,foto4} = req.body;
        const newProduk = await Produk.create({
            namaproduk, hargaproduk, kategori, deskripsi, foto1,foto2,foto3,foto4
        })
        
      return res.status(201).json({namaproduk : newProduk.namaproduk});
    } catch (error) {
        res.status(422).json('Produk Gagal Diupload');
    }
 },
 async getAllProduk (req, res){
    try {
        let produk = await Produk.findAll();
        return res.status(200).json(produk);
    } catch (err) {
        return res.status(404);
    }
},

    }