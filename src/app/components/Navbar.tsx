import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl">Dadigram</div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
          <Link href="/admin-login">
            <a className="bg-red-500 text-white px-4 py-2 rounded">Admin</a>
          </Link>
        </div>
      </div>
      {showLogin && (
        <div className="absolute top-16 right-4 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl mb-4">Login</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </nav>
  )
}
