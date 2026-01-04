import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import TaskCard from '@/components/TaskCard'
import { Status, Task, UpdateTaskInput } from '@/graphql/generated'

interface KanbanCardProps {
  status?: Status
  title: string
  tasks: Task[]
  onAddTask: () => void
  onDeleteTask: (id: number) => void
  onUpdateTask: (id: number, input: UpdateTaskInput) => void
}

export default function KanbanCard({ title, tasks, onAddTask, onDeleteTask, onUpdateTask }: KanbanCardProps) {
  return (
    <Card className="flex flex-col h-full pt-0">
      <CardHeader className="text-center py-1 rounded-xl bg-muted">
        <CardTitle className="text-xl text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">List is empty</p>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={onDeleteTask} onUpdate={onUpdateTask}/>
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
  )
}
