import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["todo", "in_progress", "done"]);

export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);

export const tasks = pgTable("tasks", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    status: statusEnum("status").notNull(),
    priority: priorityEnum("priority").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export type Task = typeof tasks.$inferSelect;
