//@ts-nocheck

import { useState } from 'react'
import { Plus, X } from 'react-feather'
import { trpc } from '@/utils/trpc'

const TechStack = ({ project }) => {
  const [newTech, setNewTech] = useState('')
  const [techStack, setTechStack] = useState(project.techStack)

  const updateTechStack = trpc.project.updateTechStack.useMutation({
    onSuccess: (data) => {
      setTechStack(data?.techStack)
    },
  })

  const handleAddTech = () => {
    updateTechStack.mutate({
      id: project._id,
      newTech: newTech,
    })

    setNewTech('')
  }

  return (
    <div className="mb-4 flex items-center text-white">
      <div className="flex items-center">
        <span className="font-semibold mr-3 text-lg">Tech Stack:</span>
        <ul className="flex">
          {techStack.map((tech, index) => (
            <li
              key={index}
              className="bg-blue-500 text-white p-2 mr-2 rounded flex items-center"
            >
              {tech}
              <button className="ml-2 focus:outline-none">
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center ml-4">
        <input
          type="text"
          placeholder="Add Technology"
          value={newTech}
          onChange={(e) => setNewTech(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded mr-2 focus:outline-none"
        />
        <button
          onClick={handleAddTech}
          className="bg-green-500 p-2 rounded focus:outline-none"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}

export default TechStack
