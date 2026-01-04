'use client'

import { useState } from 'react'
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  Status,
  Priority,
  useUpdateTaskMutation,
  UpdateTaskInput,
} from '@/graphql/generated'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import KanbanCard from '@/components/KanbanCard'

const priorityOrder = { high: 3, medium: 2, low: 1 }

function Kanban() {
  const { data, loading, error, refetch } = useGetTasksQuery()
  const [createTask] = useCreateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState<Status>(Status.Todo)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: Priority.Medium,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const tasks = data?.tasks || []

  const sortedTasks = (status: Status) =>
    tasks
      .filter((task) => task.status === status)
      .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])

  const handleCreateTask = async () => {
    try {
      await createTask({
        variables: {
          input: {
            title: formData.title,
            description: formData.description,
            status: currentStatus,
            priority: formData.priority,
          },
        },
      })
      setDialogOpen(false)
      setFormData({ title: '', description: '', priority: Priority.Medium })
      refetch()
    } catch (err) {
      console.error('Error creating task:', err)
    }
  }

  const handleUpdateTask = async (id: number, input: UpdateTaskInput) => {
    try {
      await updateTask({ variables: { id, input } })
      setDialogOpen(false)
      refetch()
    } catch (err) {
      console.error('Error deleting tasks: ', err)
    }
  }
  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask({ variables: { id } })
      refetch()
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }

  const openDialog = (status: Status) => {
    setCurrentStatus(status)
    setDialogOpen(true)
  }

  const columns: { status: Status; title: string }[] = [
    { status: Status.Todo, title: 'To Do' },
    { status: Status.InProgress, title: 'In Progress' },
    { status: Status.Done, title: 'Done' },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Kanban Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {columns.map(({ status, title }) => {
          const columnTasks = sortedTasks(status)
          return (
            <KanbanCard
              key={status}
              title={title}
              tasks={columnTasks}
              onAddTask={() => openDialog(status)}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
            />
          )
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Task Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Textarea
              placeholder="Task Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <Select
              value={formData.priority}
              onValueChange={(value: Priority) => setFormData({ ...formData, priority: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Priority.High}>High</SelectItem>
                <SelectItem value={Priority.Medium}>Medium</SelectItem>
                <SelectItem value={Priority.Low}>Low</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleCreateTask}>Create Task</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Kanban
