import { useState, useEffect } from 'react'
import { Calendar, Clock, CheckCircle, Briefcase } from 'react-feather'

const ProjectDetails = ({ project }: any) => {
  const [daysToGo, setDaysToGo] = useState(null)

  let progress
  if (project.tasks === 0) {
    progress = 0
  } else {
    progress = (project.completedTasks / project.tasks) * 100
  }

  useEffect(() => {
    // Calculate days to go based on the current date and project deadline
    const currentDate = new Date()
    const projectDeadline = new Date(project.deadline)

    console.log(projectDeadline)
    let differenceInDays = Math.ceil(
      (projectDeadline.getTime() - currentDate.getTime()) / (1000 * 3600 * 24),
    )

    differenceInDays =
      differenceInDays <= 0 ? (
        <span className="ml-1 font-medium text-red-600">Time Over</span>
      ) : (
        differenceInDays
      )
    //@ts-ignore
    setDaysToGo(differenceInDays)
  }, [project.deadline])

  return (
    <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-4 text-white">
        Project Details
      </h2>
      <p className="mb-6 text-gray-400">{project.details}</p>

      <div className="mb-4 flex items-center text-white">
        <Calendar className="mr-3" size={20} />
        <p className="text-lg">
          <span className="font-semibold">Deadline:</span> {project.deadline}
        </p>
      </div>

      <div className="mb-4 flex items-center text-white">
        <Clock className="mr-3" size={20} />
        <p className="text-lg">
          <span className="font-semibold">Days to Go:</span>{' '}
          {daysToGo !== null ? daysToGo : 'Calculating...'}
        </p>
      </div>

      <div className="mb-4 flex items-center text-white">
        <Briefcase className="mr-3" size={20} />
        <p className="text-lg">
          <span className="font-semibold">Total Tasks:</span> {project.tasks}
        </p>
      </div>

      <div className="mb-4 flex items-center text-white">
        <CheckCircle className="mr-3" size={20} />
        <p className="text-lg">
          <span className="font-semibold">Tasks Remaining:</span>{' '}
          {project.tasks - project.completedTasks}
        </p>
      </div>

      <div className="mb-4 flex items-center text-white">
        <CheckCircle className="mr-3" size={20} />
        <p className="text-lg">
          <span className="font-semibold">Completion Percentage:</span>{' '}
          {progress}%
        </p>
      </div>

      <div className="flex items-center text-white">
        <div className="w-full bg-gray-600 rounded-full">
          <div
            className="w-full h-2 bg-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="ml-3 text-lg">{progress}%</span>
      </div>
    </div>
  )
}

export default ProjectDetails
