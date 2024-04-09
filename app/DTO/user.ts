export interface UserDTO {
  id: string
  firstName: string
  lastName: string
  email: string
  birthdate: string
  phone: string
  avatar: string
}

export interface UserUpdateDTO {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  birthdate?: string
  phone?: string
  avatar?: string
}

export interface UserRegisterDTO {
  firstName: string
  lastName: string
  birthdate?: string
  phone?: string
  avatar?: string
  email: string
  password: string
}

export interface UserLoginDTO {
  email: string
  password: string
}
