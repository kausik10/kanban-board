import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import TaskCard from '@/components/TaskCard'
import { Status, Task, UpdateTaskInput } from '@/graphql/generated'
import { useDroppable } from '@dnd-kit/core'

interface KanbanCardProps {
  status: Status
  title: string
  tasks: Task[]
  onAddTask: () => void
  onDeleteTask: (id: number) => void
  onUpdateTask: (id: number, input: UpdateTaskInput) => void
}

export default function KanbanCard({
  status,
  title,
  tasks,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
}: KanbanCardProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  })

  return (
    <div ref={setNodeRef} className="h-full">
      <Card
        className={`flex flex-col h-full pt-0 transition-colors ${isOver ? 'ring-2 ring-blue-400 bg-blue-50' : ''}`}
      >
        <CardHeader className="text-center py-1 rounded-xl bg-muted">
          <CardTitle className="text-xl text-muted-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-4 overflow-y-auto">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center mt-8">List is empty</p>
          ) : (
            <div className="space-y-2">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={onDeleteTask}
                  onUpdate={onUpdateTask}
                />
              ))}
            </div>
          )}
        </CardContent>
        <div className="p-4 pt-0">
          <Button onClick={onAddTask} className="w-full">
            Add Task
          </Button>
        </div>
      </Card>
    </div>
  )
}
