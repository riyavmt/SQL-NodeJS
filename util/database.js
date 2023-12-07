const Sequelize = require('sequelize');
const sequelize = new Sequelize('sql-nodejs','root','Mysqlnode147*',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;