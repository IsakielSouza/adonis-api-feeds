import Comment from '#models/comment'
import Post from '#models/post'
import User from '#models/user'
import { createPostValidator } from '#validators/posts'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentsController {
  async index() {
    return Comment.query().orderBy('createdAt', 'desc')
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    return Post.create(payload)
  }

  async show({ params }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return { message: 'User not found' }
    }

    const posts = await user.related('posts').query().paginate(1)
    return { user, posts }
  }
}
