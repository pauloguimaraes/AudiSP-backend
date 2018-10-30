module.exports = (sequelize, type) => {
    return sequelize.define('publicacao', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        titulo: type.STRING,
        data: type.DATE,
        texto: type.STRING,
        url_devcolab: type.STRING
    }, {timestamps:false,freezeTableName: true})
}