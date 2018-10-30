module.exports = (sequelize, type) => {
    return sequelize.define('pauta', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        nome: type.STRING
    }, {timestamps:false,freezeTableName: true})
}