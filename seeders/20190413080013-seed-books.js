'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      genre: "Fantasy",
      year: 1997,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      title: "Harry Potter and the Chamber of Secrets",
      author: "J.K. Rowling",
      genre: "Fantasy",
      year: 1998,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      title: "Harry Potter and the Prisoner of Azkaban",
      author: "J.K. Rowling",
      genre: "Fantasy",
      year: 1999,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      title: "Harry Potter and the Goblet of Fire",
      author: "J.K. Rowling",
      genre: "Fantasy",
      year: 2000,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      title: "Harry Potter and the Order of the Phoenix",
      author: "J.K. Rowling",
      genre: "Fantasy",
      year: 2003,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      title: "Harry Potter and the Half-Blood Prince",
      author: "J.K. Rowling",
      genre: "Fantasy",
      year: 2005,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      title: "Harry Potter and the Deathly Hallows",
      author: "J.K. Rowling",
      genre: "Fantasy",
      year: 2007,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};