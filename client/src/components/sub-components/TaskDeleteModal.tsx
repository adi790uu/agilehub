//@ts-nocheck

import { trpc } from '@/utils/trpc'
import { useQueryClient } from '@tanstack/react-query'

const TaskDeleteModal = ({ data }) => {
  const queryClient = useQueryClient()
  const deleteTask = trpc.project.deleteProject.useMutation({
    onSuccess() {
      queryClient.refetchQueries([['getProjects']])
    },
  })

  const handleDelete = (taskId) => {
    deleteTask.mutate({ id: taskId })
    document.getElementById('my_modal_1').close()
  }

  return (
    <>
      <button
        className="flex items-center justify-center bg-red-500 hover:bg-red-700 rounded font-bold text-white py-2 px-4"
        onClick={() => document.getElementById('my_modal_1').showModal()}
      >
        <span className="mr-2" role="img" aria-label="Delete Icon">
          🗑️
        </span>
        Delete Project
      </button>
      <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-4">
          <h3 className="font-bold text-lg mb-4">Delete Projects</h3>
          <div className="space-y-4">
            {data.data.length !== 0 ? (
              data.data.map((task, index) => (
                <div
                  key={task._id}
                  className="flex justify-between items-center bg-white p-3 rounded shadow-md"
                >
                  <span className="text-neutral-700">
                    {index + 1}. {task.title}
                  </span>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <span role="img" aria-label="Delete Icon">
                      🗑️
                    </span>
                  </button>
                </div>
              ))
            ) : (
              <div>No projects found</div>
            )}
          </div>
          <div className="modal-action p-4">
            <form method="dialog">
              <button
                className="btn text-white"
                onClick={() => document.getElementById('my_modal_1').close()}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default TaskDeleteModal
