import { defineEventHandler, readBody } from 'h3'
import prisma from '../../../prisma/prisma.client'
import { hashPassword } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, password } = body

  const hashedPassword = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  return { message: 'User registered successfully', user }
})
