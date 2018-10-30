module.exports = (sequelize, type) => {
    return sequelize.define('audiencia', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        data: type.DATEONLY,
        horario: type.STRING,
        local: type.STRING
    }, {timestamps:false,freezeTableName: true})
}