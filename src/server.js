const Hapi = require("@hapi/hapi");
const Nanoid = require("nanoid");
const books = require("./books");
const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });
  server.route([
    {
      method: "POST",
      path: "/books",
      handler: (request, h) => {
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
      },
    },
    {
      method: "GET",
      path: "/books",
      handler: (request, h) => {
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
      },
    },
  ]);
  await server.start();
  console.log(`Server is Running in Port ${server.info.port}`);
};
init();
