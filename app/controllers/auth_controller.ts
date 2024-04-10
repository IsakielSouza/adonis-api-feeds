// import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { UserLoginDTO } from '../DTO/user.js'
import hash from '@adonisjs/core/services/hash'
import { Bcrypt } from '@adonisjs/core/hash/drivers/bcrypt'

export default class AuthController {
  async login({ request }: HttpContext) {
    const { email, password }: UserLoginDTO = request.only(['email', 'password'])

    try {
      const userExists = await User.findBy('email', email)
      if (!userExists) {
        return {
          message: 'User not found',
        }
      }

      const token = await User.accessTokens.create(userExists)
      return {
        type: 'bearer',
        value: token.value!.release(),
      }
    } catch (error) {
      return {
        message: 'An error occurred during login',
        error,
      }
    }
  }
}
