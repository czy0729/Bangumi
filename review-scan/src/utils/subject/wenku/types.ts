/*
 * @Author: czy0729
 * @Date: 2022-09-20 01:25:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-20 16:16:15
 */
import { Loaded } from '@types'

export type Finger = string

export type Query = {
  sort: any
  year: any
  first: any
  status: any
  tags: any
  anime: any
  cate: any
  author: any
}

export type Item = {
  /** SubjectId */
  i: number

  /** 首字 */
  f?: string

  /** 是否连载中 */
  v?: number

  /** 是否动画化 */
  m?: number

  /** 作者 */
  a?: number

  /** 开始连载时间 */
  b: string

  /** 最后更新时间 */
  u: string

  /** 所属文库方 */
  c: number

  /** 热度 */
  h: number

  /** 上升趋势 */
  p?: number

  /** 文字量 (万) */
  l: number

  /** 分数 */
  s?: number

  /** 排名 */
  r?: number

  /** 打分人数 */
  k?: number

  /** 分类 */
  j?: number[]
}

export type UnzipItem = {
  /** SubjectId */
  id: any

  /** wenku8 id */
  wenkuId: any

  /** 原先 1 表示已结束, 大部分都是 1, 所以现在 1 改为连载中 */
  status: any

  /** 是否动画化 */
  anime: any

  /** 作者 */
  author: any

  /** 当前章节 */
  ep: any

  /** 标题, v7.1 后中文与日文合并以减少容量 */
  cn: any

  /** 封面 */
  image: any

  /** 开始连载时间 */
  begin: any

  /** 最后更新时间 */
  update: any

  /** 所属文库方 */
  cate: any

  /** 热度 */
  hot: any

  /** 上升趋势 */
  up: any

  /** 文字量 (万) */
  len: any

  /** 分数 */
  score: any

  /** 排名 */
  rank: any

  /** 打分人数 */
  total: any

  /** 分类 */
  tags: any
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
