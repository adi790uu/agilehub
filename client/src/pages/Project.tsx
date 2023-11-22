import ProjectDetails from '@/components/sub-components/ProjectDetails'
import TechStack from '@/components/sub-components/TechStack'
import TaskManagement from '@/components/sub-components/TaskManagement'
import ExcalidrawSection from '@/components/sub-components/ExcalidrawSection'
import { useParams } from 'react-router-dom'
import { trpc } from '@/utils/trpc'
import { ClimbingBoxLoader } from 'react-spinners'

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>() ?? { id: '' }

  //@ts-ignore
  const getProject = trpc.project.getProject.useQuery({ id })

  if (getProject.isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ClimbingBoxLoader color="#36D7B7" size={15} />
      </div>
    )
  }

  console.log(getProject.data)

  return (
    <div className="container mx-auto p-4 font-one min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center mt-4">
        {getProject.data.title}
      </h1>
      <div className="divider"></div>
      {/* 
      <section>
        <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg container">
          <Markdown />
        </div>
      </section> */}

      <section className="">
        <ProjectDetails project={getProject.data} />
      </section>
      <div className="divider"></div>

      <section>
        <TechStack project={getProject.data} />
      </section>

      <section>
        <TaskManagement project={getProject.data} />
      </section>

      <div className="divider"></div>

      <div className="font-one mb-8 bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-3xl text-white font-semibold mb-8">
          Design & Plan
        </h2>
        <div className="w-5/6 h-[50rem] m-auto">
          <ExcalidrawSection />
        </div>
      </div>
    </div>
  )
}

export default ProjectPage
