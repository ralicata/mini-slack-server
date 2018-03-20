import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";

import models from "./models";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")), {
  all: true
});
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

const myGraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const PORT = 3000;

const app = express();
app.use(cors());

const graphqlEndpoint = "/graphql";

// bodyParser is needed just for POST.
app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress({
    schema: myGraphQLSchema,
    context: {
      models,
      user: {
        id: 1
      }
    }
  })
);
app.use("/graphiql", graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT);
});
