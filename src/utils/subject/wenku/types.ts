/*
 * @Author: czy0729
 * @Date: 2022-09-20 01:25:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:57:33
 */
import type { Loaded } from '@types'
import type { WENKU_ANIME, WENKU_AUTHOR, WENKU_CATE, WENKU_STATUS } from './ds'

export type Finger = string

export type Query = {
  sort?: string
  year?: string | number
  first?: string
  status?: (typeof WENKU_STATUS)[number]
  tags?: string[]
  anime?: (typeof WENKU_ANIME)[number]
  cate?: (typeof WENKU_CATE)[number]
  author?: (typeof WENKU_AUTHOR)[number]
}

export type Item = {
  /** SubjectId */
  i: number

  /** wenku8 id */
  w?: number

  /** 首字 */
  f?: string

  /** 是否连载中 */
  v?: number

  /** 是否动画化 */
  m?: number

  /** 作者 */
  a?: number

  /** 当前章节 */
  e?: string

  /** 标题, v7.1 后中文与日文合并以减少容量 */
  t?: string

  /** 封面 */
  o?: string

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
  id: number

  /** wenku8 id */
  wenkuId: number

  /** 原先 1 表示已结束, 大部分都是 1, 所以现在 1 改为连载中 */
  status: number

  /** 是否动画化 */
  anime: number

  /** 作者 */
  author: string

  /** 当前章节 */
  ep: string

  /** 标题, v7.1 后中文与日文合并以减少容量 */
  cn: string

  /** 封面 */
  image: string

  /** 开始连载时间 */
  begin: string

  /** 最后更新时间 */
  update: string

  /** 所属文库方 */
  cate: string

  /** 热度 */
  hot: number

  /** 上升趋势 */
  up: number

  /** 文字量 (万) */
  len: number

  /** 分数 */
  score: number

  /** 排名 */
  rank: number

  /** 打分人数 */
  total: number

  /** 分类 */
  tags: number[]
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
