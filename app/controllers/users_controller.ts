import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import { UserRegisterDTO, UserUpdateDTO } from '../DTO/user.js'
import { randomUUID } from 'node:crypto'

export default class UsersController {
  async index() {
    try {
      const users = await User.query()

      return { users }
    } catch (error) {
      return {
        message: 'Error',
        error,
      }
    }
  }
  async store({ request }: HttpContext) {
    const data: UserRegisterDTO = request.only([
      'firstName',
      'lastName',
      'birthdate',
      'phone',
      'avatar',
      'email',
      'password',
    ])

    try {
      const emailUserExists = await User.findBy('email', data.email)

      if (emailUserExists) {
        return { message: 'User already exists' }
      }
      const idUser = randomUUID()
      await User.create({ id: idUser, ...data })

      const user = await User.findBy('id', idUser)
      return {
        user,
      }
    } catch (error) {
      return {
        message: 'Error',
        error,
      }
    }
  }
  async show({ params }: HttpContext) {
    const id = params.id
    try {
      const userExists = await User.findOrFail(id)

      if (!userExists) {
        return { message: 'User not found' }
      }
      return { userExists }
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return { message: 'User not found' }
      }

      return { message: 'Error' }
    }
  }

  async update({ params, request }: HttpContext) {
    const id = params.id
    const data: UserUpdateDTO = request.only([
      'firstName',
      'lastName',
      'birthdate',
      'phone',
      'avatar',
      'password',
      'email',
    ])

    try {
      const userExists = await User.findOrFail(id)

      if (!userExists) {
        return { message: 'User not found' }
      }

      if (data.email) {
        return { message: 'Email cannot be updated' }
      }

      await userExists.merge(data).save()
      return { message: 'Success' }
    } catch (error) {
      return {
        message: error,
      }
    }
  }
  async destroy({ params }: HttpContext) {
    const id = params.id

    try {
      const userExists = await User.findOrFail(id)

      if (!userExists) {
        return { message: 'User not found' }
      }

      await userExists.delete()
      return { message: 'Success' }
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return { message: 'User not found' }
      }

      return { message: 'Error' }
    }
  }
}
