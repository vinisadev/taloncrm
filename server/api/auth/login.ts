import { defineEventHandler, readBody, setCookie } from 'h3'
import prisma from '../../../prisma/prisma.client'
import { comparePassword, generateToken } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !(await comparePassword(password, user.password))) {
    return { message: 'Invalid credentials' }
  }

  const token = generateToken(user.id)
  setCookie(event, 'token', token, { httpOnly: true, maxAge: 3600 })

  return { message: 'Login successful', user }
})
