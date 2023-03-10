/*
 * @Author: czy0729
 * @Date: 2023-02-25 18:14:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-10 15:44:53
 */
/** 条目类型 1: 书籍, 2: 动画, 3: 音乐, 4: 游戏, 6: 三次元 (没有 5) */
export type SubjectType = 1 | 2 | 3 | 4 | 6

/** 评分相关 */
export type RatingType = {
  rank: number
  total: number
  score: number
}

/** 收藏状态 1: 想看, 2: 看过, 3: 在看, 4: 搁置, 5: 抛弃 */
export type CollectionType = 1 | 2 | 3 | 4 | 5

/** 章节状态 0: 未收藏, 1: 想看, 2: 看过, 3: 抛弃 */
export type StatusType = 0 | 1 | 2 | 3

/** 条目简略信息 */
export type Subject = {
  id: number
  image: string
  name: string
  name_cn: string
  type: SubjectType
  rating: RatingType
  eps: number | ''
}

/** 章节简略信息 (书籍、音乐、游戏没有章节信息) */
export type Ep = {
  id?: number
  airdate?: string
  name?: string
  name_cn?: string
  duration?: string
  comment?: number
}

/** 操作用户简略信息 */
export type User = {
  id: number
  username: string
  avatar: string
  nickname: string
  sign: string
}

/** 小组简略信息 */
export type Group = {
  id: string
  title: string
  content: string
  cover: string
  create: string
}

/** 目录简略信息 */
export type Catalog = {
  id: number
  title: string
  content: string
}

/** 更新收藏 */
export type WebHookCollection = (
  type: 'collection',
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

/** 更新章节 */
export type WebHookEp = (
  type: 'ep',
  data: {
    type: StatusType
    batch: boolean
    eps: number
    vols?: number
    ep: Ep
    subject: Subject
    user: User
    ts: number
  }
) => any

/** 新吐槽 */
export type WebHookSay = (
  type: 'say',
  data: {
    content: string
    url: string
    user: User
    ts: number
  }
) => any

/** 收藏人物 */
export type WebHookMono = (
  type: 'mono',
  data: {
    mono: {
      id: `${'person' | 'character'}/${number}`
      name: string
      name_cn: string
      cover: string
    }
    user: User
    ts: number
  }
) => any

/** 加为好友 */
export type WebHookFriend = (
  type: 'friend',
  data: {
    friend: User
    user: User
    ts: number
  }
) => any

/** 加入小组 */
export type WebHookGroup = (
  type: 'group',
  data: {
    group: Group
    user: User
    ts: number
  }
) => any

/** 收藏目录 */
export type WebHookCatalog = (
  type: 'catalog',
  data: {
    catalog: Catalog
    user: User
    ts: number
  }
) => any

/** 函数约束 */
export type WebHooksTypes = WebHookCatalog &
  WebHookCollection &
  WebHookEp &
  WebHookFriend &
  WebHookGroup &
  WebHookMono &
  WebHookSay
