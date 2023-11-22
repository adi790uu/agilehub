import { Link } from 'react-router-dom'

const ProjectCard = ({ project }: any) => {
  let progress
  if (project.tasks === 0) {
    progress = 100
  } else {
    progress = (project.completedTasks / project.tasks) * 100
  }

  return (
    <>
      <div className="bg-gradient-to-bl from-zinc-300 via-stone-300 to-slate-300 rounded-lg shadow-2xl p-6 w-80 border border-neutral-300 mt-16 transition-transform transform hover:scale-105">
        <h2 className="text-xl font-bold mb-2 text-slate-300 bg-slate-800 w-fit rounded-md px-2 py-1">
          <Link to={`/home/project/${project._id}`}>{project.title}</Link>
        </h2>
        <p className="mb-4 text-neutral-800 mt-4">
          <span className="font-medium">Deadline:</span> {project.deadline}
        </p>

        <div className="mb-4">
          <span className="text-sm text-slate-900">Progress</span>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-2 px-3 uppercase rounded-full bg-blue-800 text-white">
                  {progress}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-green-700">
                  {progress === 100 ? 'Completed' : `${progress}%`}
                </span>
              </div>
            </div>
            <div className="flex">
              <div className="w-full bg-gray-400 rounded-full">
                <div
                  className="w-full h-2 bg-green-700 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-neutral-800">Tasks Remaining</span>
            <p className="text-lg font-semibold text-red-800">
              {project.tasks - project.completedTasks}
            </p>
            <span className="text-sm text-blue-800">
              out of {project.tasks}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectCard
