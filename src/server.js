const Hapi = require("@hapi/hapi");
const route = require("./route");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });
  server.route(route);
  await server.start();
  console.log(`Server is Running in Port ${server.info.port}`);
};
init();
