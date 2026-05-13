/*
 * @Author: czy0729
 * @Date: 2022-11-27 07:41:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-14 16:48:10
 */
export type Result<T = any> = Record<any, any> & {
  code: 200 | 400
  data: T
  ts?: number
  message?: string
}

export type ResultData<T = any> = T & {
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
}

/** 用户超展开帖子结果 */
export type GroupTopicsResult = {
  data: GroupTopicsItem[]
  pagination: {
    total: number
    limit: number
    offset: number
  }
}
