const sequelize = require("sequelize");
const banco = require("./banco")
const professor = require("./professor")

var materia = banco.conexao.define(
    "materia",
    {
        id:{
            type:sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement:true
        },
        nome:{
            type:sequelize.STRING,
            allowNull:false
        },
        cargaHoraria:{
            type:sequelize.INTEGER.UNSIGNED,
            allowNull:false
        }
    },
    { timestamps: false }
)

module.exports = {materia}