import factory from '@adonisjs/lucid/factories'
import Post from '#models/post'
import { UserFactory } from './user_factory.js'

export const PostFactory = factory
  .define(Post, async ({ faker }) => {
    return {
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
    }
  })
  .relation('users', () => UserFactory)
  .build()
