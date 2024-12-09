import { defineEventHandler, getCookie } from 'h3'
import { verifyToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')

  if (!token) {
    return { message: 'Unauthorized' }
  }

  try {
    const decoded = verifyToken(token)
    return { message: 'Protected data', user: decoded }
  } catch (error) {
    return { message: 'Unauthorized' }
  }
})
