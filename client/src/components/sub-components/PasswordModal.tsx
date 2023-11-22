import { useState } from 'react'

const PasswordModal = () => {
  const [pass1, setPass1] = useState('')
  const [pass2, setPass2] = useState('')
  return (
    <>
      <button
        className="flex-grow bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        //@ts-ignore
        onClick={() => document.getElementById('my_modal_1').showModal()}
      >
        Change Password
      </button>
      <dialog id="my_modal_1" className="modal bg-one">
        <div className="modal-box flex flex-col justify-center items-center">
          <p className="font-semibold text-2xl mb-8 text-white">
            Change Password
          </p>
          <input
            type="text"
            value={pass1}
            onChange={(e) => setPass1(e.target.value)}
            placeholder="Current password"
            className="py-2 px-2 text-white outline-none border-none rounded-md mb-5"
          />
          <input
            type="text"
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
            placeholder="New password"
            className="py-2 px-2 text-white outline-none border-none rounded-md"
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default PasswordModal
