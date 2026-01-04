import type { MutationResolvers } from "../generated";
import { tasks } from "../../models/tasks";
import { eq } from "drizzle-orm";

export const deleteTask: MutationResolvers["deleteTask"] = async (
    _,
    { id },
    { db }
) => {
    await db.delete(tasks).where(eq(tasks.id, id));
    return true;
};
