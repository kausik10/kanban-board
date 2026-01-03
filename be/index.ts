import "dotenv/config";
import express from "express";
import type { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

async function startServer() {
    const app: Application = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    server.applyMiddleware({ app, path: "/graphql" });

    app.listen({ port: 4000, host: "0.0.0.0" }, () => {
        console.log(
            `Server ready at http://localhost:4000${server.graphqlPath}`
        );
    });
}

startServer().catch((err) => {
    console.error("Failed to start server:", err);
});
