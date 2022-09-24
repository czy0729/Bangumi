/*
 * @Author: czy0729
 * @Date: 2022-09-23 06:23:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-23 06:41:42
 */
export type AnimeItem = {
  id: number
  ageId: number
  image: string
  cn: string
  jp: string
  ep: string
  type: string
  status: '完结' | '连载' | '未播放'
  begin: string
  tags: string
  official: string
  score: number
  rank: number
  total: number
}

export type MangaItem = {
  id: number
  mid: number
  title: string
  image: string
  score: number
  rank: number
  total: number
  ep: string
  author: string
  status: string
  cates: string
  publish: string
  update: string
  hot: number
}

export type GameItem = {
  id: number
  t: string
  en: string
  cn: string
  c: string
  sc?: number
  r?: number
  o?: number
  l: number
  ta: string[]
  d: string[]
  p: string[]
  pl: string[]
  vc?: number
  vs?: number
}

export type ADVItem = {
  id: number
  t: string
  en: string
  cn?: undefined
  c: string
  sc?: number
  r?: number
  o?: number
  l: number
  ta?: undefined
  d: string
  p?: undefined
  pl?: undefined
  vc?: undefined
  vs?: undefined
}
