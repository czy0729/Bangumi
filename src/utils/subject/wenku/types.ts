/*
 * @Author: czy0729
 * @Date: 2022-09-20 01:25:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-20 16:16:15
 */
import { Loaded, SubjectId } from '@types'

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
  i: SubjectId

  /** wenku8 id */
  w: any

  /** 原先 1 表示已结束, 大部分都是 1, 所以现在 1 改为连载中 */
  v?: any

  /** 是否动画化 */
  m: any

  /** 作者 */
  a: any

  /** 当前章节 */
  e: any

  /** 标题, v7.1 后中文与日文合并以减少容量 */
  t: any

  /** 封面 */
  o: any

  /** 开始连载时间 */
  b: any

  /** 最后更新时间 */
  u: any

  /** 所属文库方 */
  c: any

  /** 热度 */
  h: any

  /** 上升趋势 */
  p?: any

  /** 文字量 (万) */
  l: any

  /** 分数 */
  s: any

  /** 排名 */
  r: any

  /** 打分人数 */
  k: any

  /** 分类 */
  j: any
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
