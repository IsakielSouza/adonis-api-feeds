export interface CommentDTO {
  id: string
  content: string
  authorId: string
  postId: string
  publishedAt: string
}

export interface CommentCreateDTO {
  id: string
  title: string
  content: string
  authorId: string
  postId: string
}
