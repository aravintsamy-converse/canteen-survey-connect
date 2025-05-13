import { Link } from 'react-router-dom'

const MachineProblem = () => {
  return (
    <div className="w-full xl:w-[96%] mx-1 p-4">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Report Machine Problem
      </h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Describe the Machine Problem
          </label>
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows={4}
          ></textarea>
        </div>
        <button
          type="button"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      <Link
        to="/"
        className="block mt-4 text-center text-blue-600 hover:underline"
      >
        Back to Home
      </Link>
    </div>
  </div>
  )
}

export default MachineProblem