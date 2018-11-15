const Sequelize = require('sequelize');
const UserModel = require('./models/usuario');
const AudienciaModel = require('./models/audiencia');
const TemaModel = require('./models/tema');
const PublicacaoModel = require('./models/publicacao');
const InteresseModel = require('./models/interesse');
require('dotenv').load();
//var config = require('./configuration/config')

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = UserModel(sequelize, Sequelize);
const Tema = TemaModel(sequelize, Sequelize);
const Interesse = InteresseModel(sequelize, Sequelize);
const Audiencia = AudienciaModel(sequelize, Sequelize);
const Publicacao = PublicacaoModel(sequelize, Sequelize);

const AudienciaTema = sequelize.define('audienciaTema', {}, {
  timestamps: false,
  freezeTableName: true
});


Audiencia.belongsTo(Publicacao, {
  foreignKey: {
    name: 'id_publicacao',
    allowNull: false
  }
});

Audiencia.belongsToMany(Tema, {
  through: AudienciaTema,
  foreignKey: "id_audiencia"
});

Tema.belongsToMany(Audiencia, {
  through: AudienciaTema,
  foreignKey: "id_tema"
});


User.belongsToMany(Tema, {
  through: Interesse,
  foreignKey: "id_usuario"
});

Tema.belongsToMany(User, {
  through: Interesse,
  foreignKey: "id_tema"
});

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  });

module.exports = {
  User,
  Tema,
  Audiencia,
  Interesse,
  Publicacao,
  AudienciaTema
}