module.exports = (sequelize, type) => {
    return sequelize.define('usuario', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        nome: type.STRING,
        email: type.STRING,
        nascimento: type.DATEONLY,
        tokenfb: type.STRING
    }, {timestamps:false,freezeTableName: true})
}