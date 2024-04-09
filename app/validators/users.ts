import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(3).maxLength(40),
    lastName: vine.string().trim().minLength(3).maxLength(40),
    birthdate: vine.string().trim().minLength(10).maxLength(10),
    phone: vine.string().trim().minLength(6).maxLength(17),
    //avatar: vine.string().trim().minLength(4).maxLength(254),
    email: vine.string().trim().email().minLength(4).maxLength(40),
    password: vine.string().trim().minLength(3).maxLength(20),
  })
)
