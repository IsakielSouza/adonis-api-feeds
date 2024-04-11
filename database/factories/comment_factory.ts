import factory from '@adonisjs/lucid/factories'
import Comments from '#models/comment'

export const CommentFactory = factory
  .define(Comments, async ({ faker }) => {
    return {
      id: faker.string.uuid(),
      content: faker.lorem.paragraph({ min: 1, max: 150 }),
      author_id: faker.string.uuid(),
      post_id: faker.string.uuid(),
    }
  })
  .build()
