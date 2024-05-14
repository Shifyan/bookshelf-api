const Nanoid = require("nanoid");
const books = require("./books");

const setBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const isBookFinished = (pageCount, readPage) => {
    if (pageCount === readPage) {
      return true;
    } else {
      return false;
    }
  };
  const book = {
    id: Nanoid.nanoid(),
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: isBookFinished(pageCount, readPage),
    reading,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  let response;

  if (!name) {
    response = h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  } else if (readPage > pageCount) {
    response = h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  } else {
    books.push(book);
    response = h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: book.id,
        },
      })
      .code(201);
  }

  return response;
};
const getAllBooks = (request, h) => {
  if (books.length === 0) {
    const response = h
      .response({
        status: "success",
        data: {
          books: books,
        },
      })
      .code(200);
    return response;
  }
  const response = h
    .response({
      status: "success",
      data: {
        books: books,
      },
    })
    .code(200);
  return response;
};
const getBookById = (request, h) => {
  const findResult = books.find((book) => book.id === request.params.bookId);
  if (findResult === undefined) {
    const response = h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
    return response;
  } else {
    const response = h
      .response({
        status: "success",
        data: {
          book: findResult,
        },
      })
      .code(200);
    return response;
  }
};
const changeBookData = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const index = books.findIndex((book) => book.id === bookId);
  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      })
      .code(404);
  }

  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt: new Date().toISOString(),
  };

  return h
    .response({
      status: "success",
      message: "Buku berhasil diperbarui",
    })
    .code(200);
};
const deleteBook = (request, h) => {
  const findResult = books.find((book) => book.id === request.params.bookId);

  if (findResult === undefined) {
    const response = h
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      })
      .code(404);
    return response;
  } else {
    const booksIndex = books.findIndex(
      (book) => book.id === request.params.bookId
    );
    books.splice(booksIndex, 1);
    const response = h
      .response({
        status: "Success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
    return response;
  }
};
module.exports = {
  setBook,
  getAllBooks,
  getBookById,
  changeBookData,
  deleteBook,
};
