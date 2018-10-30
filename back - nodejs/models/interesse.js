module.exports = (sequelize, type) => {
    return sequelize.define('interesse', {
        score: type.INTEGER
    }, {timestamps:false,freezeTableName: true})
}