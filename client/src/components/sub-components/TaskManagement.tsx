import { useState } from 'react'
import { Plus } from 'react-feather'
import TaskList from './TaskList'
import { trpc } from '@/utils/trpc'

const TaskManagement = ({ project }) => {
  console.log(project)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [todos, setTodos] = useState(project.todos)

  const addTask = trpc.project.addTask.useMutation({
    onSuccess: (data) => {
      console.log(data)
      // console.log(data.todos)
      setTodos(data?.todos)
    },
  })

  const handleTaskAdd = () => {
    const createdAt = new Date().toLocaleString()
    addTask.mutate({
      id: project._id,
      title,
      description,
      createdAt,
    })
  }

  return (
    <div className=" font-one mb-8 bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
      <div className="mb-8 flex flex-col">
        <h2 className="text-3xl text-white font-semibold mb-8 flex items-center">
          Tasks
        </h2>
        <div className="mb-4">
          <div className="dropdown">
            <button className="bg-green-500 px-2 py-1 rounded focus:outline-none text-white flex justify-center items-center font-semibold">
              <Plus size={16} />
              Add
            </button>
            <div
              tabIndex={0}
              className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-slate-950 text-primary-content mt-2"
            >
              <div className="card-body">
                <div className="text-white">
                  <label className="block mb-2">Title:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="py-1 rounded-md p-2 w-full text-white border-none outline-none"
                    placeholder="Enter Title"
                  ></input>
                  <label className="block mt-2 mb-2">Description:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="py-1 rounded-md p-2 w-full text-white border-none outline-none resize-none"
                    placeholder="..."
                    rows={6}
                  ></textarea>
                  <div className="flex justify-center">
                    <button
                      onClick={handleTaskAdd}
                      className="bg-slate-900 rounded-md text-white mt-4 px-3 py-2"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <TaskList todos={todos} projectId={project._id} />
        </div>
      </div>
    </div>
  )
}

export default TaskManagement
