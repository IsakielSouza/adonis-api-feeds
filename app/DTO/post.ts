export interface PostDTO {
  id: string
  title: string
  description: string
  authorId: string
  publishedAt: string
}

export interface PostCreateDTO {
  title: string
  description: string
  authorId: string
}
