//@ts-nocheck

import { trpc } from '@/utils/trpc'
import { Clock, Edit, Trash2 } from 'react-feather'

const TaskList = ({ todos, projectId }) => {
  console.log(todos)
  if (!todos || todos.length === undefined) {
    return <div>No tasks available</div>
  }

  const deleteTodo = trpc.project.deleteTask.useMutation({
    onSuccess(data) {
      if (data.completed) {
        todos = todos.filter((item) => item._id !== data.id)
      }
    },
  })

  const handleDelete = (id) => {
    deleteTodo.mutate({ id, projectId })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="p-4 bg-gradient-to-tr from-zinc-300 via-stone-300 to-slate-300 rounded-md shadow-md transition-transform transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold mb-2 text-slate-900">
            {todo.title}
          </h3>
          <p className="text-gray-600 mb-4 font-two">{todo.description}</p>
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-gray-500" />
            <span className="text-gray-500">{todo.createdAt}</span>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button className="text-blue-500 hover:text-blue-700">
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleDelete(todo._id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList
