/*
 * @Author: czy0729
 * @Date: 2023-02-25 18:14:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-26 03:28:58
 */
/**
 * 条目类型
 * 1: 书籍, 2: 动画, 3: 音乐, 4: 游戏, 6: 三次元, 没有 5
 * */
export type SubjectType = 1 | 2 | 3 | 4 | 6

/** 评分相关 */
export type RatingType = {
  rank: number
  total: number
  score: number
}

/**
 * 收藏状态
 * 1: 想看, 2: 看过, 3: 在看, 4: 搁置, 5: 抛弃
 * */
export type CollectionType = 1 | 2 | 3 | 4 | 5

export type Subject = {
  id: number
  image: string
  name: string
  name_cn: string
  type: SubjectType
  rating: RatingType
  eps: number
}

export type User = {
  id: number
  username: string
  avatar: string
  nickname: string
  sign: string
}

/** [收藏] 修改用户单个收藏 */
export type WebHooksUsersCollections = (
  type: 'users_collections',
  data: {
    type: CollectionType
    rate: number
    comment: string
    private: boolean
    tags: string[]
    subject: Subject
    user: User
    ts: number
  }
) => any

export type WebHooksTypes = WebHooksUsersCollections
