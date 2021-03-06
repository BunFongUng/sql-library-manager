'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});
  Books.associate = function(models) {
    // associations can be defined here
  };
  return Books;
};