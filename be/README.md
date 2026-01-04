# Kanban Board - Backend

This project was created using `bun init` in bun v1.3.0. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

A GraphQL API backend for the Kanban Board application built with Bun, Drizzle ORM, and Apollo Server.

## Tech Stack

- **Runtime**: Bun
- **API**: GraphQL (Apollo Server)
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Code Generation**: GraphQL Code Generator

## Prerequisites

- [Bun](https://bun.sh) installed on your machine
- PostgreSQL database running

## Getting Started

### 1. Installation

```bash
cd be
bun install
```

### 2. Database Setup

Configure your database connection in your environment variables or configuration file.

### 3. Run the Server

```bash
bun run index.ts
```

The GraphQL server will start and be accessible at the configured port (default: http://localhost:4000/graphql).

## Database Management

### Creating Tables

1. Navigate to the `models/` directory
2. Create your table schema using Drizzle ORM syntax
3. Export your schema

Example:
```typescript
// models/tasks.ts
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
```

### Running Migrations

#### Generate Migration Files
```bash
bun run mi:generate
```
This runs `drizzle-kit generate` to create migration files based on your schema changes.
Migrations are generated at `drizzle/migrations` folder.

#### Apply Migrations
```bash
bun run mi:push
```
This runs `drizzle-kit push` to apply migrations to your database.

## GraphQL Development

### Defining Schemas

1. Define your GraphQL schema in `graphql/schema.graphql`

Example:
```graphql
type Task {
  id: Int!
  title: String!
  description: String
  status: Status!
  priority: Priority!
  createdAt: String!
  updatedAt: String!
}

enum Status {
  todo
  in_progress
  done
}

enum Priority {
  low
  medium
  high
}

type Query {
  tasks: [Task!]!
  task(id: Int!): Task
}

type Mutation {
  createTask(input: CreateTaskInput!): Task!
  updateTask(id: Int!, input: UpdateTaskInput!): Task
  deleteTask(id: Int!): Boolean!
}
```

### Generating TypeScript Types

After updating your GraphQL schema, generate TypeScript types:

```bash
bun run codegen
```

This runs `graphql-codegen --config codegen.ts` and creates/updates the `graphql/generated.ts` file with type-safe definitions.

### Creating Resolvers

1. Navigate to `graphql/resolvers/` directory
2. Create resolver files for your queries and mutations
3. Import types from `graphql/generated.ts`

