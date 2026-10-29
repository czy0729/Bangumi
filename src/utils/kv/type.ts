/*
 * @Author: czy0729
 * @Date: 2022-11-27 07:41:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 */
export type Result<T = unknown> = Record<string, unknown> & {
  code: 200 | 400
  data: T
  ts?: number
  message?: string
}

export type ResultData<T = unknown> = T & {
  ts?: number
}

export type ResultTemp = {
  data: {
    downloadKey: string
  }
}

export type ResultCollectList = Result<
  {
    id: string
    createTime: string
  }[]
>

export type ResultPicList = {
  eTag: string
  key: string
  lastModified: string
  size: number
}[]

export type ResultHeatmap = {
  date: string
  count: number
}[]

/** 用户超展开帖子项 */
export type GroupTopicsItem = {
  id: number
  title: string
  creatorID: number
  parentID: number
  replyCount: number
  createdAt: number
  creator: {
    id: number
    username: string
    nickname: string
    avatar: {
      small: string
      medium: string
      large: string
    }
  }
  group: {
    id: number
    name: string
    title: string
  }
  content?: string
}

/** 用户超展开帖子结果 */
export type ResultGroupTopics = {
  data: GroupTopicsItem[]
  pagination: {
    total: number
    limit: number
    offset: number
  }
}

/** 推荐帖子项 */
export type RecommendTopicItem = {
  id: number
  title: string
  similarity: number
  url: string
  group_slug: string
  created_at: string
  reply_count: number
  group_name: string
  user_username: string
  user_nickname: string
  user_avatar: string
  content?: string
}

/** 推荐帖子结果 */
export type ResultRecommendTopics = {
  topic_id: number
  recommendations: RecommendTopicItem[]
  execution_time_ms: number
}

// -------------------- v1/search 搜索 --------------------

/** 搜索分页 */
export type SearchPagination = {
  total: number
  limit: number
  offset: number

  /** 总数为估算值 */
  totalIsEstimate?: boolean
}

/** 搜索结果 */
export type ResultSearch<T> = {
  data: T[]
  pagination: SearchPagination

  /** 请求元信息 */
  meta?: {
    /** 服务端耗时 (ms) */
    executionMs?: number
  }
}

/** 搜索帖子项 */
export type SearchGroupTopicItem = {
  id: number

  /** 话题类型 */
  kind: number

  /** 所属小组 id */
  parentID: number

  /** 所属小组名 */
  parentName: string

  title: string

  /** 创建者 id */
  creatorID: number

  /** 创建者用户名 */
  creatorName: string

  replyCount: number
  createdAt: number
  updatedAt: number

  /** 正文摘要, 命中词用 U+E000 / U+E001 包裹 */
  content?: string
}

/** 搜索讨论项 (条目下的帖子) */
export type SearchSubjectTopicItem = {
  id: number
  title: string
  creatorName: string
  createdAt: number
  replyCount: number

  /** 所属条目名 */
  parentName: string

  /** 正文摘要, 命中词用 U+E000 / U+E001 包裹 */
  content?: string
}

/** 搜索用户项 */
export type SearchUserItem = {
  id: number
  username: string
  nickname: string
  sign: string
  avatar?: {
    small?: string
    medium?: string
    large?: string
  }
}

/** 搜索小组项 */
export type SearchGroupItem = {
  name: string
  title: string
  members?: number
  icon?: {
    small?: string
    medium?: string
    large?: string
  }
}

/** 搜索日志项 */
export type SearchBlogItem = {
  id: number
  title: string
  creatorName: string
  createdAt: number
  replies?: number
  tags?: string[]
}

/** 搜索目录项 */
export type SearchIndexItem = {
  id: number
  title: string
  creatorName: string
  createdAt: number
  total?: number
  collects?: number
}

/** 搜索回复项 */
export type SearchReplyItem = {
  id: number

  /** 回复所在容器 id */
  containerID: number

  /** 回复所在容器标题 */
  containerTitle: string

  /** 来源: group / subject / episode / character / person / blog */
  source: string

  creatorName?: string
  creatorUsername?: string
  createdAt: number

  /** 容器所属名称 */
  parentName: string

  /** 回复摘要, 命中词用 U+E000 / U+E001 包裹 */
  excerpt: string
}

export type GenerateType =
  | 'subject'
  | 'subject_topic'
  | 'group_topic'
  | 'blog'
  | 'user'
  | 'ep'
  | 'character'
  | 'person'

export type ResultCompletions = {
  choices?: {
    message?: {
      content?: string
    }
  }[]
}

export type ResultGenerate = {
  text?: string
}

export type ResultPicListResponse = {
  success?: boolean
  files?: ResultPicList
}

/** 历史头像项 */
export type AvatarHistoryItem = {
  avatar_url?: string
  captured_at?: number
}

/** 历史头像结果 */
export type ResultAvatarHistory = {
  history: AvatarHistoryItem[]
  total?: number
}
