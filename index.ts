import Server from "./src/Server";

const server = new Server();

server.loadMiddlewares();
server.start();
