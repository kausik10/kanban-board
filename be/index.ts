import "dotenv/config";
import express from "express";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql";
import { db } from "./lib/db";
import cors from "cors";

const app = express();
app.use(cors());
const yoga = createYoga({
    schema,
    context: () => ({ db }),
});

app.use("/graphql", yoga);

app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
});
