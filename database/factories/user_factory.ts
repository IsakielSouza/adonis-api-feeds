import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { PostFactory } from './post_factory.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      id: faker.string.uuid(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      birthdate: faker.string.numeric('##/##/####'),
      phone: faker.string.numeric('###########'),
      avatar: faker.image.avatar(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 16 }),
    }
  })
  .relation('posts', () => PostFactory)
  .build()
