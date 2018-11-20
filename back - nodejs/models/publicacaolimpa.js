module.exports = (sequelize, type) => {
    return sequelize.define('publicacao_limpa', {
        fk_id_publicacao: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: false
          },
        texto: type.STRING,
        processada: type.INTEGER,
        texto: type.STRING
    }, {timestamps:false,freezeTableName: true})
}