import { prisma } from '@/lib/prisma'
import DashboardClient from './DashboardClient'

async function getUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  })
  
  // Filter out users with null email or convert null to empty string
  return users.map(user => ({
    ...user,
    email: user.email || '',
    name: user.name || '',
    createdAt: user.createdAt.toISOString(),
  }))
}

export default async function Dashboard() {
  const users = await getUsers()

  return <DashboardClient initialUsers={users} />
}
