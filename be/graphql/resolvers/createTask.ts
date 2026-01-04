import type { MutationResolvers, Task } from "../generated";
import { tasks } from "../../models/tasks";

export const createTask: MutationResolvers["createTask"] = async (
    _,
    { input },
    { db }
) => {
    const result = await db
        .insert(tasks)
        .values({
            title: input.title,
            description: input.description || "",
            status: input.status,
            priority: input.priority,
        })
        .returning();
    const task = result[0]!;
    return {
        ...task,
        createdAt: task.createdAt?.toISOString() || "",
        updatedAt: task.updatedAt?.toISOString() || "",
    } as Task;
};
