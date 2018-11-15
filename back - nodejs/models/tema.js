module.exports = (sequelize, type) => {
    return sequelize.define('tema', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        nome: type.STRING
    }, {timestamps:false,freezeTableName: true})
}