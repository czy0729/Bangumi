/*
 * @Author: czy0729
 * @Date: 2022-07-02 01:16:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-09 06:08:08
 */
import type {
  Id,
  ListEmpty,
  Loaded,
  Override,
  SubjectId,
  TimeLineScope,
  TimeLineType,
  TopicId,
  UserId
} from '@types'
import type { Likes } from '../rakuen/types'

/** 时间胶囊项 */
export type TimelineItem = {
  /** 日期 (来自 h4 标题, 如 2026-07-09) */
  date: string

  /** 唯一标识 (page|tmlId) */
  id: string

  /** 发布者头像 */
  avatar: {
    /** 头像地址 */
    src: string

    /** 用户主页地址 */
    url: string
  }

  /** 位置 1, 通常是用户信息 (个人主页中不存在) */
  p1: {
    /** 用户名 */
    text: string

    /** 用户主页地址 */
    url: string
  }

  /** 位置 2, 通常是动作 (如 收藏了 / 看过) */
  p2: {
    /** 动作描述 */
    text: string
  }

  /** 位置 3, 通常是条目 (条目 / 人物 / 小组等) */
  p3: {
    /** 条目名称 */
    text: string[]

    /** 条目地址 */
    url: string[]
  }

  /** 位置 4, 通常是动作补充 (进度 / 章节等) */
  p4: {
    /** 补充描述 */
    text: string
  }

  /** 主条目文字 (只有 ep 才显示) */
  subject: string

  /** 主条目 ID (只有 ep 才显示) */
  subjectId: SubjectId

  /** 发布时间 (如 2小时前) */
  time: string

  /** 绝对时间戳（秒），用于缓存冷启动后重新计算相对时间 */
  epoch?: number

  /** 评价星级 (stars3 等) */
  star: string

  /** 吐槽内容 */
  comment: string

  /** 回复信息 */
  reply: {
    /** 回复内容 */
    content: string

    /** 回复数 */
    count: string | number

    /** 回复页地址 */
    url: string
  }

  /** 点赞信息 */
  like: {
    /** 点赞类型 */
    type: number

    /** 主 ID */
    mainId: TopicId

    /** 关联 ID */
    relatedId: string | number
  }

  /** 右侧封面或人物头像 */
  image: string[]

  /** 删除本条的链接 */
  clearHref: string
}

/** 时间胶囊 */
export type Timeline = ListEmpty<TimelineItem>

/** 获取时间胶囊参数 */
export type FetchTimelineArgs = {
  /** 范围 (自己 / 好友 / 全站 / ...) */
  scope?: TimeLineScope

  /** 类型 (say / subject / blog / ...) */
  type?: TimeLineType

  /** 用户 ID (不传则用当前登录用户) */
  userId?: UserId
}

/** 获取他人视角时间胶囊参数 */
export type FetchUsersTimelineArgs = {
  /** 用户 ID */
  userId?: UserId

  /** 类型 (say / subject / blog / ...) */
  type?: TimeLineType
}

/** 获取条目评论关联贴贴参数 */
export type FetchUsersCollectionsTimelineArgs = {
  /** 需要改过后的 ID */
  userId?: UserId
}

/** 请求并解析时间胶囊 HTML 返回值 */
export type FetchTimelineHTMLReturn = Override<
  Timeline,
  {
    /** 时间胶囊中点赞相关的用户数据 */
    likes: Likes
  }
>

/** 用户条目吐槽联动回复表情 */
export type CollectionsTimeline = Record<
  UserId,
  Record<SubjectId, Id> & {
    _loaded?: Loaded
  }
>

export type SayItem = {
  /** 用户 ID */
  id: UserId

  /** 头像地址 */
  avatar: string

  /** 用户名 */
  name: string

  /** 吐槽内容 */
  text: string

  /** 发布时间 */
  date: string

  /** 用户数字 ID */
  uid: string

  /** 表单授权码 */
  formhash: string
}

/** 吐槽 */
export type Say = ListEmpty<SayItem>

/** 隐藏 TA */
export type Hidden = Record<UserId, number>

/** 某用户的追踪收藏时间线 */
export type CollectionTimelines = {
  /** 用户 ID */
  userId: UserId

  /** 头像地址 */
  avatar: string

  /** 用户名 */
  name: string

  /** 条目 ID -> 收藏信息 */
  map: Record<
    SubjectId,
    {
      /** 已看话数 */
      eps: number

      /** 最后接触时间 */
      lasttouch: number
    }
  >

  /** 请求时间戳 */
  _loaded: Loaded
}
