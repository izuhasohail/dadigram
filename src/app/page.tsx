// src/app/page.tsx
import Link from 'next/link'
import './globals.css'
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600">Dadigram</h1>
        <nav>
          <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Login
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Dadigram</h2>
          <p className="text-xl text-gray-600 mb-8">Connect, Share, and Engage with Your Community</p>
          <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg">
            Get Started
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Sharing</h3>
            <p className="text-gray-600">Share your moments with friends and family effortlessly.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-time Engagement</h3>
            <p className="text-gray-600">Interact with your network through likes, comments, and messages.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Privacy Control</h3>
            <p className="text-gray-600">Manage your privacy settings and control who sees your content.</p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © 2024 Dadigram. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
