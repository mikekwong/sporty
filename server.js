const express = require("express");
const jsonServer = require("json-server");
const chokidar = require("chokidar");
const cors = require("cors");
const fs = require("fs");
const { buildSchema } = require("graphql");
const graphqlHTTP = require("express-graphql");
const queryResolvers = require("./serverQueriesResolver");
const mutationResolvers = require("./serverMutationsResolver");
const path = require("path");

const app = express();

const fileName = process.argv[2] || "./data.js";
const port = process.env.PORT || process.argv[3] || 3500;

// Graphql additions load the schema and resolvers and use them to create a graphQL service that shares a database with the existing retful web service.

let router = undefined;
let graph = undefined;

const createServer = () => {
  delete require.cache[require.resolve(fileName)];
  setTimeout(() => {
    router = jsonServer.router(
      fileName.endsWith(".js") ? require(fileName)() : fileName
    );
    let schema =
      fs.readFileSync("./serverQueriesSchema.graphql", "utf-8") +
      fs.readFileSync("./serverMutationsSchema.graphql", "utf-8");
    let resolvers = { ...queryResolvers, ...mutationResolvers };
    graph = graphqlHTTP({
      schema: buildSchema(schema),
      rootValue: resolvers,
      graphiql: true,
      context: { db: router.db }
    });
  }, 100);
};

createServer();

app.use(cors());
app.use(jsonServer.bodyParser);

// // Middleware to handle CORS in development:

// app.use("/*", (req, resp, next) => {
//   resp.header("Access-Control-Allow-Origin", "*");
//   resp.header(
//     "Access-Control-Allow-Headers",
//     "Origin, x-access-token, x-user-pathway, x-mongo-key, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
//   next();
// });

app.use("/api", (req, resp, next) => router(req, resp, next));
app.use("/graphql", (req, resp, next) => graph(req, resp, next));

// ** Uncomment below for DEPLOY **
// ** Comment out below for local development **

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
//   next();
// });

// The "catchall" handler: for any request or urls
// Any urls that don't match, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

////////////////////////

chokidar.watch(fileName).on("change", () => {
  console.log("Reloading web service data...");
  createServer();
  console.log("Reloading web service data complete.");
});

app.listen(port, () => console.log(`Web service running on port ${port}`));
