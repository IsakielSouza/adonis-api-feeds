import factory from '@adonisjs/lucid/factories'
import Post from '#models/post'

export const CommentFactory = factory
  .define(Post, async ({ faker }) => {
    return {
      id: faker.string.uuid(),
      // author_id: 'b01c036b-4075-4db3-bca5-333502750f07',
      // post_id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
    }
  })
  .build()
