'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('kategoris',[
    {namakategori : 'Aksesoris'}, 
    {namakategori : 'Buku'}, 
    {namakategori : 'Dapur'},
    {namakategori : 'Elektronik'},
    {namakategori : 'Fashion Anak & Bayi'},
    {namakategori : 'Fashion Wanita'},
    {namakategori : 'Fashion Pria'},
    {namakategori : 'Gaming'},
    {namakategori : 'Hiburan'},
    {namakategori : 'Hobi & Mainan'},
    {namakategori : 'Handphone & Tablet'},
    {namakategori : 'Kamera'},
    {namakategori : 'Kecantikan'},
    {namakategori : 'Kesehatan'},
    {namakategori : 'Kebersihan'},
    {namakategori : 'Olahraga'},
    {namakategori : 'Otomotif'},
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('kategori',null,{})
  }
};
