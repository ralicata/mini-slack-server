import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import models from "./models";

const myGraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const PORT = 3000;

const app = express();

const graphqlEndpoint = "/graphql";

// bodyParser is needed just for POST.
app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress({ schema: myGraphQLSchema })
);
app.use("/graphiql", graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT);
});
