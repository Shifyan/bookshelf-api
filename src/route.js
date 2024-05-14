const {
  setBook,
  getAllBooks,
  getBookById,
  changeBookData,
  deleteBook,
} = require("./handler");

const route = [
  {
    method: "POST",
    path: "/books",
    handler: setBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookById,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: changeBookData,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBook,
  },
];

module.exports = route;
