// See https://github.com/typicode/json-server#module
const cors = require("cors");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(
    cors({
        methods: ["GET", "POST", "PUT", "DELETE"], // Adicione todos os métodos HTTP que você deseja permitir
    })
);

server.use(middlewares);
// Add this before server.use(router)
server.use(
    jsonServer.rewriter({
        "/api/*": "/$1",
        "/blog/:resource/:id/show": "/:resource/:id",
    })
);

server.use(router);
server.listen(3000, () => {
    console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
