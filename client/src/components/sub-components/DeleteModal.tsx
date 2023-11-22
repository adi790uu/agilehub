import { trpc } from '@/utils/trpc'

const DeleteModal = () => {
  const deleteAccount = trpc.user.deleteAccount.useMutation({
    onSuccess: (data) => {
      if (data.completed) {
        localStorage.setItem('token', '')
        window.location.href = '/'
      }
    },
  })

  const handleDelete = () => {
    deleteAccount.mutate()
  }

  return (
    <>
      <button
        className="flex-grow bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        //@ts-ignore
        onClick={() => document.getElementById('my_modal_2').showModal()}
      >
        Delete Account
      </button>
      <dialog id="my_modal_2" className="modal font-one text-white">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Account</h3>
          <p className="py-4">
            Are you sure, your account will be deleted permanently!
          </p>
          <div className="flex justify-start gap-4 mt-5">
            <button
              onClick={handleDelete}
              className="btn btn-sm bg-red-800 hover:bg-red-700"
            >
              Yes
            </button>
            <button className="btn btn-sm bg-green-800 hover:bg-green-700">
              No
            </button>
          </div>
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

export default DeleteModal
