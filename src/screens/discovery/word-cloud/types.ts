/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:17:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-29 17:44:01
 */
import type {
  GetRouteParams,
  Id,
  Loaded,
  RouteWordCloud,
  SubjectId,
  UserId,
  WithNavigation
} from '@types'
import type Store from './store'
import type { CUT_TYPE } from './ds'

/** 页面上下文 */
export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

/** 页面参数 */
export type Params = GetRouteParams<RouteWordCloud>

/** 分词结果列表 */
export type CutList = [string, string][]

/** 分词类型 */
export type CutType = (typeof CUT_TYPE)[number]

/** 分词快照 ID */
export type SnapshotId = `extract_${string}`

/** 趋势 ID */
export type TrendId = `trend_${string}`

/** 用户收藏条目 */
export type CollectionsV0Item = {
  /** 条目 ID */
  id: SubjectId

  /** 条目名 */
  name: string

  /** 封面 */
  cover: string

  /** 个人标签 */
  tags: string[]

  /** 评分 */
  score: number

  /** 收藏时间 */
  time: string
}

/** 条目快照 */
export type SnapshotSubjectsItem = {
  /** 条目 ID */
  id?: SubjectId

  /** 封面 */
  image?: string

  /** 条目名 */
  name?: string

  /** 中文名 */
  name_cn?: string

  /** 排名 */
  rank?: number

  /** 评分 */
  rating?: number

  /** 公共标签 */
  tags?: {
    /** 标签名 */
    name: string

    /** 使用人数 */
    count: string

    /** 是否公共标签 */
    meta: boolean
  }[]

  /** 角色 */
  character?: {
    /** 角色 ID */
    id: number

    /** 角色名 */
    name: string

    /** 日文名 */
    nameJP: string

    /** 头像 */
    image: string

    /** 角色定位, 如主角/配角 */
    desc: string

    /** 声优 ID */
    actorId: number
  }[]

  /** 制作人员 */
  staff?: {
    /** 人员 ID */
    id: number

    /** 人员名 */
    name: string

    /** 日文名 */
    nameJP: string

    /** 头像 */
    image: string

    /** 职位 */
    desc: string

    /** 声优 ID */
    actorId?: number
  }[]

  /** 本地化时间 */
  _loaded?: Loaded
}

/** 点击词云后选中的角色 */
export type SelectedMono = {
  /** 角色 / 人员 ID */
  id?: number

  /** 中文名 */
  name?: string

  /** 日文名 */
  nameJP?: string

  /** 头像 */
  image?: string

  /** 职位 */
  desc?: string

  /** 声优 ID */
  actorId?: number
}

/** 选中的吐槽 */
export type SelectedCommentItem = {
  /** 吐槽 ID */
  id: Id

  /** 头像 */
  avatar: string

  /** 用户 ID */
  userId: UserId

  /** 用户名 */
  userName: string

  /** 吐槽内容 */
  comment: string

  /** 时间 */
  time: string

  /** 楼层 */
  action?: string
}
