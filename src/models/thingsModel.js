const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');
const { CategoriesModel } = require('./categoriesModel');
const { UsersModel } = require('./usersModel');

class ThingsModel extends Model {}
    
ThingsModel.init({
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    verified: DataTypes.BOOLEAN,
    reports: DataTypes.INTEGER
}, { 
    sequelize: sequelizeCon, 
    schema: 'myHoard',
    modelName: 'things'
});

ThingsModel.belongsTo(UsersModel);

ThingsModel.belongsTo(CategoriesModel);

sequelizeCon.sync();

module.exports = { ThingsModel };