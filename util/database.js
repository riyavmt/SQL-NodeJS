const Sequelize = require('sequelize');
const sequelize = new Sequelize('sql-nodejs','root','Sqlnodejs1234*',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;