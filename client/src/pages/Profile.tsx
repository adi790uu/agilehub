//@ts-nocheck

import PasswordModal from '@/components/sub-components/PasswordModal'
import DeleteModal from '@/components/sub-components/DeleteModal'
import { trpc } from '@/utils/trpc'
import { BounceLoader } from 'react-spinners'

const Profile = () => {
  const user = trpc.user.me.useQuery()

  console.log(user.data)

  if (user.isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <BounceLoader color="black" size={60} />
      </div>
    )
  }

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center font-one">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-gray-800">
        <div className="text-center mb-8">
          {/* Replace the image section with an SVG illustration */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="64"
            height="64"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500 mx-auto mb-4"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M14 7l4 5-4 5" />
          </svg>

          <h1 className="text-xl font-bold">AgileHub</h1>
          <p className="text-gray-500">Task Management Enthusiast</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Account Information</h2>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{user && user?.data?.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{user && user?.data?.email}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Bio</h2>
          <p className="text-sm text-gray-600 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Vestibulum euismod urna ac massa pretium, in vehicula
            libero consequat.
          </p>
        </div>

        <div className="flex space-x-4 mt-8 flex-col md:flex-row justify-center items-center">
          <PasswordModal />
          <DeleteModal />
        </div>
      </div>
    </div>
  )
}

export default Profile
