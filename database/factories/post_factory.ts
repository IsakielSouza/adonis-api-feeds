import factory from '@adonisjs/lucid/factories'
import Post from '#models/post'

export const PostFactory = factory
  .define(Post, async ({ faker }) => {
    return {
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
    }
  })
  .build()
