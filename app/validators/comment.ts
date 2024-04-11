import vine from '@vinejs/vine'

export const createCommentValidator = vine.compile(
  vine.object({
    content: vine.string().trim().escape().maxLength(150),
    authorId: vine.string(),
    postId: vine.string(),
  })
)
