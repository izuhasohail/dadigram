"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// Define an interface for user data
interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]) // Specify the type of users
  const [chartData, setChartData] = useState({
    labels: [] as string[], // Specify the type of labels
    datasets: [
      {
        label: 'User Registrations',
        data: [] as number[], // Specify the type of data
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  })
  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users')
        const data: User[] = await response.json() // Use the User interface

        setUsers(data)

        // Prepare chart data
        const registrationDates = data.map((user) =>
          new Date(user.createdAt).toDateString()
        )
        const registrationCount = registrationDates.reduce((acc, date) => {
          acc[date] = (acc[date] || 0) + 1
          return acc
        }, {} as Record<string, number>) // Type for the reduce accumulator

        setChartData({
          labels: Object.keys(registrationCount),
          datasets: [
            {
              label: 'User Registrations',
              data: Object.values(registrationCount),
              fill: false,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
            },
          ],
        })
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [router])

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>

      <h2 className="text-2xl font-semibold mt-8">Registered Users</h2>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Registered At
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mt-8">User Registration Trends</h2>
      <div className="mt-4">
        {chartData.labels.length > 0 && (
          <Line data={chartData} />
        )}
      </div>
    </div>
  )
}
