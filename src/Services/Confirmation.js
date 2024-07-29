import React from 'react'

export default function Confirmation() {
  return (
   <>
   {confirmDelete && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <div className="flex justify-between">
              <button
                onClick={() => setConfirmDelete(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete(confirmDelete);
                  setConfirmDelete(null);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-md ml-4"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
   </>
  )
}
