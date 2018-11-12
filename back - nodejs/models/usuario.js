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
        token_fb: type.STRING
    }, {timestamps:false,freezeTableName: true})
}