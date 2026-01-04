import type { QueryResolvers, Task } from "../generated";
import { tasks as tasksTable } from "../../models/tasks";

export const tasks: QueryResolvers["tasks"] = async (_, __, { db }) => {
    const result = await db.select().from(tasksTable);
    return result.map((task) => ({
        ...task,
        createdAt: task.createdAt?.toISOString() || "",
        updatedAt: task.updatedAt?.toISOString() || "",
    })) as Task[];
};
