import { defineEventHandler, getCookie } from 'h3'
import { verifyToken } from '../utils/auth'

export default defineEventHandler((event) => {
  console.log("Authentication Middleware Triggered")
  const token = getCookie(event, 'token')

  if (!token) {
    return { message: 'Unauthorized' }
  }

  try {
    const decoded = verifyToken(token)
    event.context.user = decoded
  } catch (error) {
    return { message: 'Unauthorized' }
  }
})
