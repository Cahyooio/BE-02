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
        if (!produk) {
            return res.status(404).json('Product not found');
        }
        return res.status(200).json(produk);
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
},
async getProdukById (req, res){
    try {
        const produk_id = req.params.id;
        const produk = await Produk.findOne({where: {id : produk_id}});
        console.log (produk);
        if (!produk) {
            return res.status(404).json('Product not found');
        }
        return res.status(200).json(produk);
    } catch (error) {
        return res.status(500).json('server error');
    }
},
async updateProduk (req, res){
    try {
        const produk_id = req.params.id;
        const updateproduk = await Produk.update ({
            namaproduk:req.body.namaproduk,
            hargaproduk:req.body.hargaproduk,
            deskripsi:req.body.deskripsi,
            kategori:req.body.kategori,
            foto1:req.body.foto1,
            foto2:req.body.foto2,
            foto3:req.body.foto3,
            foto4:req.body.foto4
        },{
            where :{id : produk_id}
        })
        return res.status(201).json('produk updated.')
    } catch (error) {
        return res.status(500);
    }
},
async deleteProduk (req, res){
    try {
        const produk_id = req.params.id;
        await Produk.destroy({
            where :{id : produk_id}
        })
        return res.status(204).json('hapus berhasil')
    } catch (error) {
        return res.status(422).json(error);
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
}
    }