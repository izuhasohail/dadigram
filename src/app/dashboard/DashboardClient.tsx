"use client"
import { useState, useEffect } from 'react'
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface User {
  id: string
  email: string | null;
  name: string  | null ;
  createdAt: string
}

interface DashboardClientProps {
  initialUsers: User[]
}

export default function DashboardClient({ initialUsers }: DashboardClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'User Registrations',
        data: [] as number[],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  })

  useEffect(() => {
    // Prepare chart data
    const registrationDates = users.map((user) =>
      new Date(user.createdAt).toDateString()
    )
    const registrationCount = registrationDates.reduce((acc, date) => {
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {} as Record<string, number>)

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
  }, [users])

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
        {chartData.labels.length > 0 && <Line data={chartData} />}
      </div>
    </div>
  )
}
