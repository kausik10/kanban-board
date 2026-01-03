import { db } from "../lib/db";
import { tasks } from "../models/tasks";
import { eq } from "drizzle-orm";

export const resolvers = {
    Query: {
        tasks: async () => {
            const result = await db.select().from(tasks);
            return result.map((task) => ({
                ...task,
                createdAt: task.createdAt?.toISOString(),
                updatedAt: task.updatedAt?.toISOString(),
            }));
        },
        task: async (_: any, { id }: { id: number }) => {
            const result = await db
                .select()
                .from(tasks)
                .where(eq(tasks.id, id))
                .limit(1);
            if (result.length === 0) return null;
            const task = result[0];
            return {
                ...task,
                createdAt: task?.createdAt?.toISOString(),
                updatedAt: task?.updatedAt?.toISOString(),
            };
        },
    },
    Mutation: {
        createTask: async (_: any, { input }: { input: any }) => {
            const result = await db
                .insert(tasks)
                .values({
                    title: input.title,
                    description: input.description,
                    status: input.status,
                    priority: input.priority,
                })
                .returning();
            const task = result[0];
            return {
                ...task,
                createdAt: task?.createdAt?.toISOString(),
                updatedAt: task?.updatedAt?.toISOString(),
            };
        },
        updateTask: async (
            _: any,
            { id, input }: { id: number; input: any }
        ) => {
            const result = await db
                .update(tasks)
                .set({
                    ...input,
                    updatedAt: new Date(),
                })
                .where(eq(tasks.id, id))
                .returning();
            if (result.length === 0) throw new Error("Task not found");
            const task = result[0];
            return {
                ...task,
                createdAt: task?.createdAt?.toISOString(),
                updatedAt: task?.updatedAt?.toISOString(),
            };
        },
        deleteTask: async (_: any, { id }: { id: number }) => {
            const result = await db.delete(tasks).where(eq(tasks.id, id));
            return true; // Assuming it succeeds
        },
    },
};
