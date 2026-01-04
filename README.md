# Getting Started

1. Clone the Repository

```bash
Using SSH
git clone git@github.com:kausik10/kanban-board.git

# Or using HTTPS
git clone https://github.com/kausik10/kanban-board.git

# Navigate to project directory
cd kanban-board
```

2. Setup Backend

```bash
# Navigate to backend directory
cd be

# Install dependencies
bun install

# Setup database (configure your database connection first)
# Generate and apply migrations
bun run mi:generate
bun run mi:push

# Start the backend server
bun run index.ts
```

The GraphQL server will start at http://localhost:4000/graphql
Note: See be/README.md for detailed backend setup and development instructions.

3. Setup Frontend

Open a new terminal window/tab:

```bash
# Navigate to frontend directory (from project root)
cd fe

# Install dependencies
bun install

# Start the development server
bun run dev
```

The application will be available at http://localhost:3000