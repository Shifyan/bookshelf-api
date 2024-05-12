const Hapi = require("@hapi/hapi");
const Nanoid = require("nanoid");
const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });
  server.route({
    method: "POST",
    path: "/books",
    handler: (request, h) => {
      //   const {
      //     name,
      //     year,
      //     author,
      //     summary,
      //     publisher,
      //     pageCount,
      //     readPage,
      //     reading,
      //   } = request.payload;

      const book = {
        id: Nanoid.nanoid(),
      };
      console.log(book.id);
      return "Data Berhasil Ditambahkan";
    },
  });
  await server.start();
  console.log(`Server is Running in Port ${server.info.port}`);
};
init();
