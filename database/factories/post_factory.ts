import factory from '@adonisjs/lucid/factories'
import Post from '#models/post'
import { UserFactory } from './user_factory.js'
import { CommentFactory } from './comment_factory.js'

export const PostFactory = factory
  .define(Post, async ({ faker }) => {
    return {
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
    }
  })

  .build()
