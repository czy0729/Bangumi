/*
 * @Author: czy0729
 * @Date: 2023-02-25 18:14:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-24 10:00:00
 */
import type { Id } from '@types'

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

  /** 实现只会产出数字 (eps_count 缺省时为 0) */
  eps: number
}

/** 章节简略信息 (书籍、音乐、游戏没有章节信息) */
export type Ep = {
  id?: Id
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
  /** 目录 id (路由参数实际为字符串) */
  id: number | string
  title: string
  content: string
}

/** ==================== 归一化前的原始输入 ==================== */

/** 归一化前的原始条目 (来自 store 或接口, 字段宽松可选) */
export type RawSubject = {
  id?: Id
  images?: {
    common?: string
  }
  name?: string
  name_cn?: string
  type?: number | string
  rank?: number
  rating?: {
    rank?: number
    total?: number
    score?: number
  }
  eps_count?: number | ''
  eps?: readonly RawEp[]
}

/** 归一化前的原始章节 */
export type RawEp = {
  id?: Id
  sort?: Id
  airdate?: string
  name?: string
  name_cn?: string
  duration?: string
  comment?: number
}

/** 归一化前的原始用户信息 */
export type RawUser = {
  id?: number
  username?: string
  avatar?: {
    large?: string
  }
  nickname?: string
  sign?: string
}

/** 归一化前的原始人物 */
export type RawMono = {
  id?: string
  name?: string
  nameCn?: string
  cover?: string
}

/** 归一化前的原始小组 */
export type RawGroup = {
  id?: string
  title?: string
  content?: string
  cover?: string
  create?: string
}

/** 归一化前的原始目录 */
export type RawCatalog = {
  id?: Id
  title?: string
  content?: string
}

/** ==================== 发送的数据结构 ==================== */

/** 各事件类型对应的数据结构 */
export type WebHookDataMap = {
  /** 更新收藏 */
  collection: {
    type: CollectionType
    rate: number
    comment: string
    private: boolean
    tags: string[]
    subject: Subject
    user: User
    ts: number
  }

  /** 更新章节 */
  ep: {
    type: StatusType
    batch: boolean

    /** 原实现可能传 undefined, JSON 序列化后字段缺失 */
    eps?: number
    vols?: number
    ep: Ep
    subject: Subject
    user: User
    ts: number
  }

  /** 新吐槽 */
  say: {
    content: string
    url: string
    user: User
    ts: number
  }

  /** 收藏人物 */
  mono: {
    mono: {
      id: `${'person' | 'character'}/${number}`
      name: string
      name_cn: string
      cover: string
    }
    user: User
    ts: number
  }

  /** 加为好友 */
  friend: {
    friend: User
    user: User
    ts: number
  }

  /** 加入小组 */
  group: {
    group: Group
    user: User
    ts: number
  }

  /** 收藏目录 */
  catalog: {
    catalog: Catalog
    user: User
    ts: number
  }
}

/** 事件类型 */
export type WebHookType = keyof WebHookDataMap

/** 更新收藏 */
export type WebHookCollection = (
  type: 'collection',
  data: WebHookDataMap['collection']
) => false | void

/** 更新章节 */
export type WebHookEp = (type: 'ep', data: WebHookDataMap['ep']) => false | void

/** 新吐槽 */
export type WebHookSay = (type: 'say', data: WebHookDataMap['say']) => false | void

/** 收藏人物 */
export type WebHookMono = (type: 'mono', data: WebHookDataMap['mono']) => false | void

/** 加为好友 */
export type WebHookFriend = (type: 'friend', data: WebHookDataMap['friend']) => false | void

/** 加入小组 */
export type WebHookGroup = (type: 'group', data: WebHookDataMap['group']) => false | void

/** 收藏目录 */
export type WebHookCatalog = (type: 'catalog', data: WebHookDataMap['catalog']) => false | void

/** 函数约束 */
export type WebHooksTypes = <T extends WebHookType>(
  type: T,
  data: WebHookDataMap[T]
) => false | void
