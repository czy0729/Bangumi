/*
 * @Author: czy0729
 * @Date: 2022-09-22 06:34:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-23 21:54:08
 */
import { Loaded, SubjectId } from '@types'

export type Finger = string

export type Query = {
  year: any
  end: any
  update: any
  status: any
  tags: any
  author: any
  sort: any
}

export type Item = {
  /** 条目 ID */
  i: SubjectId

  /** 评分 */
  s?: number

  /** 排名 */
  r?: number

  /** 评分人数 */
  l?: number

  /** 是否连载, 完结没有值, 连载固定为 1 */
  u?: 1

  /** 分类索引 */
  b: number[]

  /** 发行年份 */
  p: string

  /** 最后更新年份-月份 */
  d: string

  /** 连载结束年份 */
  e?: string

  /** 热度 */
  h: number

  /** 热门作者索引 */
  a?: number
}

export type UnzipItem = {
  /** 条目 ID */
  id: SubjectId

  /** mox id */
  mid: number

  /** 标题 */
  title: string

  /** 封面 */
  image: string

  /** 评分 */
  score: number

  /** 排名 */
  rank: number

  /** 评分人数 */
  total: number

  /** 卷 */
  ep: string

  /** 作者 */
  author: string

  /** 分类 */
  cates: string

  /** 最后出版年份 */
  publish: string

  /** 最后更新时间 */
  update: string

  /** 有值则为连载中 */
  status?: number

  /** 热度 */
  hot: number
}

export type SearchResult = {
  list: number[]
  pagination: {
    page: 1
    pageTotal: 1
  }
  _finger: Finger
  _loaded: Loaded
}
