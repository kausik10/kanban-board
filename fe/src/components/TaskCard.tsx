import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Task, Priority, UpdateTaskInput } from '@/graphql/generated'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface TaskCardProps {
  task: Task
  onDelete: (id: number) => void
  onUpdate: (id: number, input: UpdateTaskInput) => void
}

const priorityColors = {
  [Priority.High]: 'text-red-500',
  [Priority.Medium]: 'text-yellow-500',
  [Priority.Low]: 'text-blue-300',
}

export default function TaskCard({ task, onDelete, onUpdate }: TaskCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority,
  })

  const handleUpdate = () => {
    const input: UpdateTaskInput = {
      ...(formData.title !== task.title && { title: formData.title }),
      ...(formData.description !== task.description && { description: formData.description }),
      ...(formData.priority !== task.priority && { priority: formData.priority }),
    }

    onUpdate(task.id, input)
    setEditDialogOpen(false)
  }

  const handleDelete = () => {
    onDelete(task.id)
    setDialogOpen(false)
  }

  return (
    <>
      <Card>
        <CardContent className="">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-sm">{task.title}</h3>
            <span className={`text-xs font-medium ${priorityColors[task.priority]}`}>
              {task.priority.toUpperCase()}
            </span>
          </div>
          {task.description && <p className="text-sm text-gray-600 mb-3">{task.description}</p>}
          <Button variant="destructive" size="sm" onClick={() => setDialogOpen(true)} className="">
            Delete
          </Button>
          <Button
            variant={'default'}
            size="sm"
            onClick={() => {
              setFormData({
                title: task.title,
                description: task.description || '',
                priority: task.priority,
              })
              setEditDialogOpen(true)
            }}
            className="ml-2"
          >
            Edit
          </Button>
        </CardContent>
      </Card>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
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

            <DialogFooter>
              <Button variant="outline" size={'sm'} onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate}>Save Changes</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete the task "{task.title}"? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" size={'sm'} onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" size={'sm'} onClick={handleDelete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
