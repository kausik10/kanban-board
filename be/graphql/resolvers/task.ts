import type { QueryResolvers, Task } from "../generated";
import { tasks as tasksTable } from "../../models/tasks";
import { eq } from "drizzle-orm";

export const task: QueryResolvers["task"] = async (_, { id }, { db }) => {
    const result = await db
        .select()
        .from(tasksTable)
        .where(eq(tasksTable.id, id))
        .limit(1);
    if (result.length === 0) return null;
    const taskData = result[0]!;
    return {
        ...taskData,
        createdAt: taskData.createdAt?.toISOString() || "",
        updatedAt: taskData.updatedAt?.toISOString() || "",
    } as Task;
};
