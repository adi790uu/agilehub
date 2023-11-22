import ProjectCard from '@/components/Ui/ProjectCard'
import { trpc } from '@/utils/trpc'
import { useState } from 'react'
import TaskDeleteModal from '@/components/sub-components/TaskDeleteModal'

const ManageProjects = () => {
  // const [projects, setProjects] = useState([])
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('')

  const getProjects = trpc.project.getProjects.useQuery()

  const createProject = trpc.project.createProject.useMutation()

  console.log(getProjects.isLoading)

  if (getProjects.isLoading) {
    return <div className="min-h-screen">Loading...</div>
  }

  const handleCreateProject = () => {
    createProject.mutate({
      title,
      deadline,
    })

    setDeadline('')
    setTitle('')

    console.log('Create Project clicked')
  }

  return (
    <div className="font-one h-screen container m-auto">
      <p className="text-3xl font-semibold text-center mt-8">Manage Projects</p>
      <div className="divider"></div>
      <div className="flex justify-center flex-col md:justify-end md:flex-row md:mr-8 gap-4 mt-8">
        <button
          className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          //@ts-ignore
          onClick={() => document.getElementById('my_modal_5').showModal()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Create Project
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Create Project</h3>

            <div className="form-control w-full max-w-xs mt-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Type here"
                className="rounded-md px-2 py-2 w-full max-w-xs outline-none border-none bg-slate-700 text-neutral-100 placeholder:text-neutral-100"
              />
            </div>

            <div className="form-control w-full max-w-xs mt-4">
              <label className="label">
                <span className="label-text">deadline</span>
              </label>
              <input
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                type="date"
                placeholder="Type here"
                className="rounded-md px-2 py-2 w-full max-w-xs outline-none border-none bg-slate-700 text-neutral-100 placeholder:text-neutral-100"
              />
            </div>
            <button
              onClick={handleCreateProject}
              className="bg-green-700 hover:bg-green-800 rounded-md font-semibold btn-sm text-white mt-8"
            >
              Submit
            </button>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        <TaskDeleteModal data={getProjects} />
      </div>
      <section className="font-one mb-8 bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
        <p className="text-2xl font-semibold ml-3 mt-6 tracking-wider">
          Ongoing Projects:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center mt-4">
          {getProjects.data.length !== 0 ? (
            getProjects?.data?.map(
              (project, index) =>
                project.tasks !== project.completedTasks && (
                  <ProjectCard project={project} key={index} />
                ),
            )
          ) : (
            <div>No project created</div>
          )}
        </div>
      </section>
      <section className="font-one mb-8 bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
        <p className="text-2xl font-semibold ml-3 mt-4 tracking-wider">
          Completed Projects:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center mt-4 gap-4">
          {getProjects.data.length !== 0 ? (
            getProjects?.data?.map(
              (project, index) =>
                project.tasks === project.completedTasks && (
                  <ProjectCard project={project} key={index} />
                ),
            )
          ) : (
            <div>No project created</div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ManageProjects
