import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Export a named function for handling GET requests
export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })
    // Return a JSON response using NextResponse
    return NextResponse.json(users, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    // Return a JSON response for the error
    return NextResponse.json({ error: 'Error fetching users' }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

// Optional: Export a named function for handling unsupported methods
export function OPTIONS(req: NextRequest) {
  return new NextResponse('Method Not Allowed', {
    status: 405,
    headers: {
      Allow: 'GET',
    },
  })
}
