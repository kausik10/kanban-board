'use client'

import { useGetTasksQuery } from '@/graphql/generated'

function Kanban() {
  const { data, loading, error } = useGetTasksQuery()

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>Kanban</h1>
      {data?.tasks?.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>
        </div>
      ))}
    </div>
  )
}

export default Kanban
