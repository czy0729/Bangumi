/*
 * @Author: czy0729
 * @Date: 2022-09-23 06:23:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-01 06:33:27
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
  origin: string
  summary: string
  score: number
  rank: number
  total: number
}

export type MangaItem = {
  id: number
  mid: number
  title: string
  ep: string
  author: string
  status: string
  cates: string
  publish: string
  update: string
  // mScore: number
  // mTotal: number
  // subscribe: number
  // favor: number
  // read: number
  hot: number
  score: number
  rank: number
  total: number
  image: string
  end: string
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

  /** 在线截图 (数据侧从 KV douban_ 收集的第三方截图), 存在时找游戏频道列表优先于自建 CDN 截图使用 */
  screens?: string[]

  /** 在线截图防盗链 Referer, 与 screens 配套 */
  screensReferer?: string
}

export type ADVItem = {
  id: number
  vid: number
  title: string
  length: number
  cover: string
  date: string
  dev: string
  rank: number
  score: number
  total: number
  time: string
  cn: number

  /** 敏感标记 (1 = NSFW, 0/缺席 = 全年龄) */
  nsfw?: number

  /** 在线截图 (VNDB, 数据侧已过滤 NSFW), 存在时优先于 CDN 截图使用 */
  screens?: ADVScreen[]
}

/** 在线截图 (缩略图供列表, 原图供查看器) */
export type ADVScreen = {
  url: string
  thumbnail: string
}

/**
 * wk8_37782: {
 *   cn: '来自新世界',
 *   jp: '新世界より',
 *   ep: '第二卷 下 解说 大森望',
 *   update: '2015-03-11',
 *   begin: '2008-01-23',
 *   status: 1,
 *   anime: 1,
 *   cate: '讲谈社',
 *   author: '贵志佑介',
 *   score: 9,
 *   rank: 7,
 *   total: 1073,
 *   image: '1e/7b/37782_OkkQ7',
 *   id: 37782,
 *   wid: 1827,
 *   len: 36,
 *   tags: '科幻 悬疑 冒险 末日 黑暗',
 *   hot: 2,
 *   up: 0
 * }
 */
export type WenkuItem = {
  cn: string
  jp: string
  ep: string
  update: string
  begin: string
  status: 0 | 1
  anime: 0 | 1
  cate: string
  author: string
  score: number
  rank: number
  total: number
  image: string
  id: number
  wid: number
  len: number
  tags: string
  hot: 0 | 1 | 2 | 3 | 4 | 5
  up: 0 | 1 | 2 | 3 | 4 | 5
}

/**
 * hentai_285482: {
 *   id: 285482,
 *   h: 1812,
 *   c: '异种族风俗娘评鉴指南',
 *   i: 'dc/8a/285482_c5RRj',
 *   s: 7.8,
 *   r: 448,
 *   n: 5675,
 *   a: '2020-01-11',
 *   e: 12,
 *   t: [76, 77, 23, 22, 79, 18, 53]
 * }
 */
export type HentaiItem = {
  id: number
  h: number
  c: string
  i: string
  s: number
  r: number
  n: number
  a: string
  e: number
  t: number[]
}
