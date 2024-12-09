import prisma from '../../prisma/prisma.client'

export default defineEventHandler(async (event) => {
  try {
    await prisma.$connect()

    // Create a new user for testing
    const newUser = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com'
      }
    })

    return { message: 'Database connection successful', user: newUser }
  } catch (error) {
    return { message: 'Database connection failed', error }
  }
})
