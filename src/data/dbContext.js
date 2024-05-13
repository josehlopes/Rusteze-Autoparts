const dbConfig = require('../config/dbConfig.js');
const { Sequelize, DataTypes } = require('sequelize');

console.log("Dialeto: " + dbConfig.DIALECT);


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
const PartLog = require("../model/partLog.js")(sequelize, DataTypes);
const User = require("../model/user.js")(sequelize, DataTypes);
const UserLog = require("../model/userLog.js")(sequelize, DataTypes);



module.exports = { Part, PartLog, User, UserLog };  
