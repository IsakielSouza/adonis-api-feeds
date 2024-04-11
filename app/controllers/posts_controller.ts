import Post from '#models/post'
import User from '#models/user'
import { createPostValidator } from '#validators/posts'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { randomUUID } from 'node:crypto'

export default class PostsController {
  async index() {
    const posts = await Post.query().orderBy('publishedAt', 'desc')
    return { posts }
  }

  async store({ request }: HttpContext) {
    try {
      const data = await request.validateUsing(createPostValidator)

      const author = await User.find(data.authorId)

      if (!author) {
        return { message: 'Author not found' }
      }

      const idPost = randomUUID()
      return Post.create({ id: idPost, ...data })
    } catch (error) {
      return {
        message: error,
      }
    }
  }

  async show({ params }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return { message: 'User could not find this post' }
    }

    const posts = await user.related('posts').query().paginate(1)
    return { user, posts }
  }

  async getPostsByUser({ params }: HttpContext) {
    try {
      const user = await User.find(params.id)
      if (!user) {
        return { message: 'Error Post: User not found' }
      }

      const posts = await db.rawQuery(
        `SELECT concat(u.first_name, ' ', u.last_name) as author,
        p.description, p.published_at
        FROM posts p
        INNER JOIN users u ON p.author_id = u.id
        WHERE p.author_id = '${params.id}'
        ORDER BY p.published_at DESC`
      )
      // const posts = await Post.query()
      //   .innerJoin('users as u', 'p.author_id', '=', 'u.id')
      //   .select(
      //     "CONCAT(u.first_name, ' ', u.last_name) AS author",
      //     'p.description',
      //     'p.published_at'
      //   )
      //   .where('p.author_id', '=', params.id)

      return { posts: posts.rows }
    } catch (error) {
      return {
        message: error,
      }
    }
  }
}
