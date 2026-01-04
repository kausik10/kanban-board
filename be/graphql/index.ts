import { createSchema } from "graphql-yoga";
import path from "path";
import fs from "fs";
import { tasks } from "./resolvers/tasks";
import { task } from "./resolvers/task";
import { createTask } from "./resolvers/createTask";
import { updateTask } from "./resolvers/updateTask";
import { deleteTask } from "./resolvers/deleteTask";

const typeDefs = fs.readFileSync(path.join("./graphql/schema.graphql"), "utf8");

export const schema = createSchema({
    typeDefs,
    resolvers: {
        Query: {
            tasks,
            task,
        },
        Mutation: {
            createTask,
            updateTask,
            deleteTask,
        },
    },
});
