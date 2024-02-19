// models/user.js
// models/user.js
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isPhotographer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = User;
