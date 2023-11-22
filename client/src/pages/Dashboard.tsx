import ProjectCard from '@/components/Ui/ProjectCard'
import { trpc } from '@/utils/trpc'
import { BounceLoader } from 'react-spinners'
import { Activity, CheckSquare, Clipboard, Clock } from 'react-feather'

const Dashboard = () => {
  const getProjects = trpc.project.getProjects.useQuery()

  console.log(getProjects.data)

  if (getProjects.isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <BounceLoader color="white" size={30} />
      </div>
    )
  }

  console.log(getProjects.data)

  const totalProjects = getProjects.data.length

  const totalTasks = getProjects.data.reduce(
    (tasks, project) => tasks + project.tasks,
    0,
  )
  const tasksCompleted = getProjects.data.reduce(
    (completedTasks, project) => completedTasks + project.completedTasks,
    0,
  )

  const sortedProjects = getProjects.data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  )

  return (
    <div className="h-screen font-one container m-auto">
      <p className="text-3xl font-semibold mb-4 text-white mt-8  text-center">
        Dashboard
      </p>
      <div className="divider"></div>
      <section className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-2xl tracking-wide mt-4 font-medium">
          Most Recently Created:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center mb-8">
          {sortedProjects.map((project: any, index: any) => (
            <ProjectCard project={project} key={index} />
          ))}
        </div>
      </section>
      <div className="divider"></div>
      <section className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-2xl tracking-wide mt-4 font-medium text-white">
          Key Metrics:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          <div className="key-metric-card">
            <div className="metric-icon bg-gradient-to-tr from-zinc-300 via-stone-300 to-slate-300 p-4 rounded-md">
              <Activity size={32} color="#4B5563" />
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  Total Projects
                </h3>
                <p className="text-gray-800 font-semibold mb-4 font-two">
                  {totalProjects}
                </p>
              </div>
            </div>
          </div>

          <div className="key-metric-card">
            <div className="metric-icon bg-gradient-to-tr from-zinc-300 via-stone-300 to-slate-300 p-4 rounded-md">
              <Clipboard size={32} color="#4B5563" />
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  Total Tasks
                </h3>
                <p className="text-gray-800 font-semibold mb-4 font-two">
                  {totalTasks}
                </p>
              </div>
            </div>
          </div>

          <div className="key-metric-card">
            <div className="metric-icon bg-gradient-to-tr from-zinc-300 via-stone-300 to-slate-300 p-4 rounded-md">
              <CheckSquare size={32} color="#4B5563" />
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  Tasks Completed
                </h3>
                <p className="text-gray-800 font-semibold mb-4 font-two">
                  {tasksCompleted}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="divider"></div>
      <section className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-2xl tracking-wide mt-4 mb-4 font-medium text-white">
          Upcoming Deadlines:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProjects.map((project, index) => (
            <div
              key={index}
              className="upcoming-deadline-card p-6 bg-gradient-to-tr from-zinc-300 via-stone-300 to-slate-300 rounded-md shadow-md transition-transform transform hover:scale-105"
            >
              <div className="deadline-icon">
                <Clock size={32} color="#4B5563" />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 font-two">
                  Deadline: {new Date(project.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
