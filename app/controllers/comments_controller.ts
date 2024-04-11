import Comment from '#models/comment'
import { createCommentValidator } from '#validators/comment'
import type { HttpContext } from '@adonisjs/core/http'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import Post from '#models/post'
import db from '@adonisjs/lucid/services/db'

export default class CommentsController {
  async index() {
    try {
      const comments = await Comment.query().orderBy('publishedAt', 'desc')
      return { comments }
    } catch (error) {
      return { message: error }
    }
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createCommentValidator)
    try {
      const author = await User.find(data.authorId)
      if (!author) {
        return { message: 'Author not found' }
      }
      const post = await Post.find(data.postId)
      if (!post) {
        return { message: 'Post not found' }
      }

      const idComment = randomUUID()
      const comment = await Comment.create({ id: idComment, ...data })

      return { comment }
    } catch (error) {
      return { message: error }
    }
  }

  async show({ params }: HttpContext) {
    try {
      const comment = await Comment.findOrFail(params.id)
      if (!comment) {
        return { message: 'Comment not found' }
      }
      return { comment }
    } catch (error) {
      console.log({ error: error.code })
      return { message: error }
    }
  }

  async getCommentsByPost({ params }: HttpContext) {
    try {
      const post = await Post.find(params.id)
      if (!post) {
        return { message: 'Post not found' }
      }

      const postWithComments = await db.rawQuery(
        `SELECT c.id, c.content, concat(u.first_name, ' ', u.last_name) as author, c.published_at
        FROM "comments" c
        INNER JOIN "posts" p ON c.post_id = p.id
        INNER JOIN users u ON p.author_id = u.id
        WHERE p.id = '${params.id}'
        ORDER BY c.published_at DESC`
      )

      return { comments: postWithComments.rows }
    } catch (error) {
      return {
        message: error,
      }
    }
  }
}
