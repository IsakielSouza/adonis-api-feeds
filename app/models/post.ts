import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'

import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Comment from '#models/comment'
export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare publishedAt: DateTime

  @column()
  declare authorId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'authorId',
  })
  declare users: BelongsTo<typeof User>

  @hasMany(() => Comment)
  declare comment_id: HasMany<typeof Comment>
}
