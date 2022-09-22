/*
 * @Author: czy0729
 * @Date: 2022-09-22 06:34:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-22 06:43:31
 */
import { Loaded, SubjectId } from '@types'

export type Finger = string

export type Query = {
  first: any
  year: any
  status: any
  tags: any
  sort: any
}

export type Item = {
  /** SubjectId */
  i: SubjectId

  /** 首字 */
  f: string

  /** 是否连载 */
  u?: number

  /** 评分 */
  s?: number

  /** 排名 */
  r?: number

  /** 评分人数 */
  l?: number

  /** 分类 */
  b: number[]

  /** 发行时间 */
  p: string

  /** 热度 */
  h: number
}

export type UnzipItem = {
  /** SubjectId */
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
  list: UnzipItem[]
  pagination: {
    page: 1
    pageTotal: 1
  }
  _finger: Finger
  _loaded: Loaded
}
