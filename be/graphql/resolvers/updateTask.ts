import type { MutationResolvers, Task } from "../generated";
import { tasks } from "../../models/tasks";
import { eq } from "drizzle-orm";

export const updateTask: MutationResolvers["updateTask"] = async (
    _,
    { id, input },
    { db }
) => {
    const updateData: any = {
        updatedAt: new Date(),
    };
    if (input.title !== undefined) updateData.title = input.title;
    if (input.description !== undefined)
        updateData.description = input.description;
    if (input.status !== undefined) updateData.status = input.status;
    if (input.priority !== undefined) updateData.priority = input.priority;

    const result = await db
        .update(tasks)
        .set(updateData)
        .where(eq(tasks.id, id))
        .returning();
    if (result.length === 0) throw new Error("Task not found");
    const task = result[0]!;
    return {
        ...task,
        createdAt: task.createdAt?.toISOString() || "",
        updatedAt: task.updatedAt?.toISOString() || "",
    } as Task;
};
