import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(4).maxLength(40),
    content: vine.string().trim().minLength(4).maxLength(500),
    author: vine.string().trim().minLength(4).maxLength(40),
  })
)
