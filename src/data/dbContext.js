const dbConfig = require('../config/dbConfig.js');
const { Sequelize, DataTypes } = require('sequelize');
const part = require('../model/part.js');

    const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USERNAME,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.DIALECT,
        port: dbConfig.PORT,
    }

);

sequelize
    .authenticate()
    .then(() => {
        console.log("Conectado com sucesso!");
    })
    .catch((err) => {
        console.log("Erro ao tentar conectar: " + err);
    });
sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("Tabelas criadas com sucesso!");
    })
    .catch((err) => {
      console.log("Erros: " + err);
    });

const Part = require("../model/part.js")(sequelize, DataTypes);
const Sale = require("../model/sale.js")(sequelize, DataTypes);
const SaleItem = require("../model/saleItem.js")(sequelize, DataTypes);

Sale.hasMany(SaleItem, {
  foreignKey: 'sale_id',
});
SaleItem.belongsTo(Sale, {
  foreignKey: 'sale_id',
});

SaleItem.belongsTo(Part, {
  foreignKey: 'part_id',
});

module.exports = { Part, Sale, SaleItem};  
