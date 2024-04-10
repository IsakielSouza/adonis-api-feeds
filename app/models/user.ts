import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import {
  BaseModel,
  beforeSave,
  column,
  hasMany,
  hasManyThrough,
  manyToMany,
} from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany, HasManyThrough, ManyToMany } from '@adonisjs/lucid/types/relations'

import Post from '#models/post'
import Comment from './comment.js'
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @column()
  declare birthdate: string | null

  @column()
  declare phone: string | null

  @column()
  declare avatar: string | null

  @column()
  declare email: string

  @column()
  private declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '3 days',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  @manyToMany(() => Post, {
    pivotTable: 'author_id',
  })
  declare posts: ManyToMany<typeof Post>

  @hasMany(() => Comment, {
    foreignKey: 'comment_id',
  })
  declare comments: HasMany<typeof Comment>

  static get hidden() {
    return ['password']
  }
}
