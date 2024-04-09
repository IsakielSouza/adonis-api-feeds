import Post from '#models/post'
import { createPostValidator } from '#validators/posts'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async index() {
    return Post.query().orderBy('createdAt', 'desc')
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    return Post.create(payload)
  }

  async show({ params }: HttpContext) {
    return Post.findOrFail(params.id)
  }
}
