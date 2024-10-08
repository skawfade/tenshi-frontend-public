export interface Comment {
  _id: string
  animeId: string
  user: {
    username: string
    profile: { avatar: string; level: number }
    userId: string
  }
  text: string
  likes: number
  likedBy: string[]
  parentCommentId?: string // Для ответов на комментарии
  replyUser?: {
    username: string
    profile: { avatar: string; level: number }
    _id: string,
    text: string
  } | null
  totalReplies: number
  createdAt: Date
}
