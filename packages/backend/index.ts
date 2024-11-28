import express from "express";
import { ApolloServer } from "apollo-server-express";
import sequelize from "./models";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, async () => {
    console.log(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );

    try {
      await sequelize.authenticate();
      console.log("Database connected!");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  });
};

startServer();
