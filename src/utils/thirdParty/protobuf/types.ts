/*
 * @Author: czy0729
 * @Date: 2023-12-09 00:00:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 21:44:39
 */
import type {
  JSONDouban,
  JSONJA,
  JSONKatakana,
  JSONMono,
  JSONNSFW,
  JSONTypeRankIds
} from '@assets/json/types'
import type { Item as ADVFingerItem } from '@utils/subject/adv/types'
import type { Item as AnimeFingerItem } from '@utils/subject/anime/types'
import type { Item as GameFingerItem } from '@utils/subject/game/types'
import type { Item as MangaFingerItem } from '@utils/subject/manga/types'
import type { BangumiData, Id } from '@types'

/**
 * protobuf 静态数据集名
 *  - 与 src/assets/proto/{name}/{proto/index.proto, bin/index.bin} 一一对应
 *  - 生成与校验: web/test/pb.js / yarn pb:verify
 *  - 'bangumi-data': bangumi-data 条目数据 (id / 日文名 / 中文名 / 条目类型 / 各站外链)
 *    - 供找番剧、日历、SMB 刮削、豆瓣同步等按条目名查找 id 映射
 *  - 'anime': 找番剧条目数据
 *  - 'manga': 找漫画条目数据
 *  - 'game': 找游戏条目数据
 *  - 'adv': 找 ADV (galgame) 条目数据
 *  - 'catalog': 目录 (advance 离线快照) 数据
 *  - 'ja': 条目名 → SubjectId 罗马音字典 (SMB 刮削)
 *  - 'd': 豆瓣 id → SubjectId 字典 (豆瓣同步)
 *  - 'katakana': 片假名 → 罗马字/英文 翻译字典
 *  - 'anime-ids': 年份/标签 → SubjectId[] 字典 (分类排行/tags/猜你喜欢)
 *  - 'nsfw': NSFW 条目数组
 *  - 'mono': 人物/单行本条目数组 (高级搜索联想)
 */
export type DataAssets =
  | 'bangumi-data'
  | 'anime'
  | 'manga'
  | 'game'
  | 'adv'
  | 'catalog'
  | 'ja'
  | 'd'
  | 'katakana'
  | 'anime-ids'
  | 'nsfw'
  | 'mono'

/** decode(name) 的函数签名 */
export type Decode = <T extends DataAssets>(name: T) => Promise<Data[T]>

/** 目录数据集的单个条目 (字段顺序与 proto 定义一致) */
type CatalogFingerItem = {
  /** 目录 id */
  i: Id

  /** 创建日期 (YYYY-MM-DD), 无更新时间时兜底展示 */
  d: string

  /** 最近更新日期 (YYYY-MM-DD) */
  l: string

  /** 标题 */
  t: string

  /** 收录的动画条目数 */
  a?: number

  /** 收录的书籍条目数 */
  b?: number

  /** 收录的音乐条目数 */
  m?: number

  /** 收录的游戏条目数 */
  g?: number

  /** 收录的三次元条目数 */
  r?: number

  /** 收录的角色数 */
  ch?: number

  /** 收录的人物数 */
  pe?: number

  /** 收录的话题数 */
  to?: number

  /** 收录的日志数 */
  bl?: number

  /** 收录的章节数 */
  ep?: number
}

/**
 * 各数据集解码后的业务数据类型
 *  - decode(name) 与 get(name) 的返回值按此映射
 */
export type Data = {
  /** 条目名 → 各站外链映射的数组 */
  'bangumi-data': BangumiData

  /** 找番剧条目数组 */
  anime: AnimeFingerItem[]

  /** 找漫画条目数组 */
  manga: MangaFingerItem[]

  /** 找游戏条目数组 */
  game: GameFingerItem[]

  /** 找 ADV 条目数组 */
  adv: ADVFingerItem[]

  /** 目录条目数组 */
  catalog: CatalogFingerItem[]

  /** 条目名 → SubjectId (decode 内由 Pair 数组还原) */
  ja: JSONJA

  /** 豆瓣 id → SubjectId (decode 内由 Pair 数组还原) */
  d: JSONDouban

  /** 片假名 → 罗马字/英文 (decode 内由 Pair 数组还原) */
  katakana: JSONKatakana

  /** 年份/标签 → SubjectId[] (decode 内由 Group 数组还原) */
  'anime-ids': JSONTypeRankIds

  /** NSFW 条目数组 */
  nsfw: JSONNSFW

  /** 人物/单行本条目数组 */
  mono: JSONMono
}

/** get(name) 的函数签名 (同步读缓存, 需先 await decode(name) 预热) */
export type Get = <T extends DataAssets>(name: T) => Data[T]
