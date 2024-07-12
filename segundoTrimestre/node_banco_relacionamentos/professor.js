const sequelize = require("sequelize");
const banco = require("./banco")
const materia = require("./materia")

var professor = banco.conexao.define(
    "professor",
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
        titulacao:{
            type:sequelize.STRING,
            allowNull:false
        },
        regimeTrabalho:{
            type:sequelize.INTEGER.UNSIGNED,
            allowNull:false
        }
    },
    { timestamps: false }
)

professor.hasMany( materia.materia )
materia.materia.belongsTo( professor )

module.exports = {professor}