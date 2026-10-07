/*
 * @Author: czy0729
 * @Date: 2022-09-23 06:23:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-06 07:37:28
 */
export type AnimeItem = {
  id: number

  /** @deprecated agefans id (新数据不再携带) */
  ageId?: number

  /** 中文名 (bgm 条目可能无中文名, 可选) */
  cn?: string

  /** 日文名 */
  jp?: string

  /** 封面 hash 路径 */
  image: string

  /** 话数 */
  ep?: number

  /** 类型, 缺省 TV */
  type?: string

  /** 放送状态 */
  status: '完结' | '连载' | '未播放'

  /** 放送日期 */
  begin: string

  /** 标签 (空格分隔) */
  tags?: string

  /** 类型 meta_tags (空格分隔: 形式 / 地区 / 改编来源 / 题材) */
  meta?: string

  /** 动画制作 */
  official?: string

  /** 改编来源 (原创 / 漫画改 / 小说改 / 游戏改) */
  origin?: string

  /** 导演 (infobox 导演 / 监督) */
  director?: string

  /** 原作 (infobox 原作) */
  author?: string

  /** 人物设定 (infobox 人物设定) */
  charaDesign?: string

  /** 敏感标记 (1 = NSFW, 0/缺席 = 全年龄) */
  nsfw?: number

  score: number
  rank: number
  total: number
}

/**
 * manga_{id} (找漫画详情, CDN 加密单文件):
 * {
 *   id: 27684,
 *   title: '哆啦A梦',
 *   cover: '69/20/27684_D4ySY',
 *   score: 9.3,
 *   total: 1578,
 *   rank: 4,
 *   date: '1974-07-31',
 *   info: '藤子・F・不二雄',
 *   pub: '小学館',
 *   vol: 45,
 *   ch: 1345
 * }
 */
export type MangaItem = {
  id: number
  title: string
  cover: string
  score: number
  total: number
  rank: number
  date: string

  /** 更新日期 (系列内最晚单卷发售日, 缺席 = 与 date 相同) */
  update?: string

  info: string

  /** 出版社 (首个) */
  pub?: string

  /** 卷数 (infobox 册数, 关系聚合单行本数回落) */
  vol?: number

  /** 话数 */
  ch?: number

  /** 页数 (infobox 页数, 单行本才有, 系列缺席) */
  pages?: number

  /** 标签 (top100, 空格分隔) */
  tags?: string

  /** 敏感标记 (1 = NSFW, 0/缺席 = 全年龄) */
  nsfw?: number
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

  /** 游戏类型 (infobox 原文, 详情 tip 显示) */
  genre?: string

  /** 标签 (top100, 空格分隔) */
  tags?: string

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

  /** 描述性信息 (平台 / 游戏类型) */
  info?: string

  /** 标签 (top100 命中名, 空格分隔; 旧版详情缓存无此字段) */
  tags?: string

  /** 在线截图 (VNDB, 数据侧已过滤 NSFW), 存在时优先于 CDN 截图使用 */
  screens?: ADVScreen[]
}

/** 在线截图 (缩略图供列表, 原图供查看器) */
export type ADVScreen = {
  url: string
  thumbnail: string
}

/**
 * wenku_{id} (找文库详情, CDN 加密单文件):
 * {
 *   id: 29,
 *   title: '云之彼端，约定的地方',
 *   cover: '44/13/11408_jp',
 *   score: 7.6,
 *   total: 178,
 *   rank: 2203,
 *   date: '2006-01-05',
 *   info: '加納新太',
 *   pub: 'エンターブレイン',
 *   vol: 1,
 *   anime: 1,
 *   tags: '轻小说 恋爱 奇幻'
 * }
 */
export type WenkuItem = {
  id: number
  title: string
  cover: string
  score: number
  total: number
  rank: number
  date: string

  /** 更新日期 (系列内最晚分卷发售日, 缺席 = 与 date 相同) */
  update?: string

  info: string

  /** 出版社 (首个) */
  pub?: string

  /** 卷数 (infobox 册数, 关系聚合分卷数回落) */
  vol?: number

  /** 动画化 (1 = 有动画) */
  anime?: number

  /** 敏感标记 (1 = NSFW, 0/缺席 = 全年龄) */
  nsfw?: number

  /** 标签 (top100 命中名, 空格分隔; 旧版详情缓存无此字段) */
  tags?: string
}

/**
 * album_{id} (找画集详情, CDN 加密单文件):
 * {
 *   id: 10,
 *   title: 'Your Eyes Only',
 *   cover: '...',
 *   score: 8.3,
 *   total: 100,
 *   rank: 820,
 *   date: '2003-01-29',
 *   info: 'CLAMP',
 *   pub: '講談社',
 *   nsfw: 0
 * }
 */
export type AlbumItem = {
  id: number
  title: string
  cover: string
  score: number
  total: number
  rank: number
  date: string
  info: string

  /** 出版社 (首个) */
  pub?: string

  /** 敏感标记 (1 = NSFW, 0/缺席 = 全年龄) */
  nsfw?: number

  /** 标签 (top100 命中名, 空格分隔; 旧版详情缓存无此字段) */
  tags?: string
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

/**
 * music_{id} (找音乐详情, CDN 加密单文件):
 * {
 *   id: 15,
 *   title: '浪漫制作',
 *   cover: 'fb/d7/15_ajp',
 *   score: 8.2,
 *   total: 513,
 *   rank: 664,
 *   date: '2001-12-30',
 *   info: 'OST / 动画 / ED'
 * }
 */
export type MusicItem = {
  id: number
  title: string
  cover: string
  score: number
  total: number
  rank: number
  date: string
  info: string

  /** 标签 (top100 命中名, 空格分隔; 旧版详情缓存无此字段) */
  tags?: string
}

/**
 * real_{id} (找三次元详情, CDN 加密单文件):
 * {
 *   id: 1346,
 *   title: '紧急救命',
 *   cover: '00/27/1346_qqYD',
 *   score: 8.1,
 *   total: 2837,
 *   rank: 712,
 *   date: '2008-07-03',
 *   info: '西浦正记、叶山浩树 / 山下智久'
 * }
 */
export type RealItem = {
  id: number
  title: string
  cover: string
  score: number
  total: number
  rank: number
  date: string
  info: string

  /** 标签 (top100 命中名, 空格分隔; 旧版详情缓存无此字段) */
  tags?: string
}
