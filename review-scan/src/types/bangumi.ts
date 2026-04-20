/*
 * 与 bgm.tv 有关的数据结构
 * @Author: czy0729
 * @Date: 2022-06-27 13:10:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-27 05:43:23
 */
import {
  DATA_AIRTIME,
  DATA_ANIME_AREA,
  DATA_ANIME_TAG,
  DATA_ANIME_TARGET,
  DATA_CLASSIFICATION,
  DATA_GAME_TAG,
  DATA_GAME_TARGET,
  DATA_MONTH,
  DATA_REAL_AREA,
  DATA_SOURCE,
  DATA_THEME
} from '@constants/constants'
import {
  RankAnimeFilter,
  RankBookFilter,
  RankBookFilterSub,
  RankGameFilter,
  RankGameFilterSub,
  RankRealFilter,
  SubjectTypeValue
} from '@constants/model/types'

/** 任意 ID */
export type Id = number | string

/** 条目 ID */
export type SubjectId = number | string

/** 章节 ID */
export type EpId = number | string

/** 用户 ID */
export type UserId = number | string

/** 真实人物 ID */
export type PersonId = `person/${Id}`

/** 虚拟角色 ID */
export type CharacterId = `character/${Id}`

/** 人物 ID */
export type MonoId = CharacterId | PersonId

/** 帖子类型 */
export type TopicType = 'group' | 'subject' | 'ep' | 'prsn' | 'crt'

/** 帖子 ID */
export type TopicId = `${TopicType}/${Id}`

/** 日志 ID */
export type BlogId = `blog/${Id}`

export type Url = '//lain.bgm.tv'

export type Host = 'https://bgm.tv'

/** 帖子地址 */
export type UrlTopic = `${Host}/topic/${TopicId}`

/** 日志地址 */
export type UrlBlog = `${Host}/blog/${Id}`

/** 用户空间地址 */
export type UrlUser = `${Host}/user/${UserId}`

/** 角色地址 */
export type UrlMono = `${Host}/${MonoId}`

/** 条目地址 */
export type UrlSubject = `${Host}/subject/${SubjectId}`

/** 条目帖子地址 */
export type UrlSubjectTopic = `${Host}/subject/topic/${Id}`

/** 章节地址 */
export type UrlEp = `${Host}/ep/${EpId}`

/** 静态资源地址 */
export type UrlStatic = `${Url}/pic`

/** 头像地址 */
export type Avatar<S extends 'l' | 'm' | 's' | 'g' = 'l'> =
  | `${UrlStatic}/user/${S}/${string}.jpg?r=${number}`
  | '${UrlStatic}/user/${S}/icon.jpg'

/** 条目封面地址 */
export type Cover<S extends 'l' | 'c' | 'm' | 's' | 'g' = 'm'> =
  | `${UrlStatic}/cover/${S}/${string}.jpg`

/** 角色封面地址 */
export type CoverCrt<S extends 'l' | 'm' | 's' | 'g' = 'g'> =
  | `${UrlStatic}/crt/${S}/${string}.jpg?r=${number}`

/** 小组封面地址 */
export type CoverGroup<S extends 'l' | 's' = 's'> = `${UrlStatic}/icon/${S}/${string}.jpg`

/** 用户上传的图片 */
export type CoverPhoto<S extends 'g' = 'g'> = `${UrlStatic}/photo/${S}/${string}.jpg`

/** 图片结构 */
export type Images = {
  /** w: origin */
  large: Cover<'l'>

  /** w: 150px */
  common: Cover<'c'>

  /** w: 100px */
  medium: Cover<'m'>

  /** w: 80px */
  small: Cover<'s'>

  /** w: 48px, h: 48px */
  grid: Cover<'g'>
}

/** 用户头像图片结构 */
export type ImagesAvatar = {
  large?: Avatar<'l'>
  medium: Avatar<'m'>
  small: Avatar<'s'>
}

/** 角色图片结构 */
export type ImagesCrt = {
  large: CoverCrt<'l'>
  medium: CoverCrt<'m'>
  small: CoverCrt<'s'>
  grid: CoverCrt<'g'>
}

/** 收藏数 */
export type Collection = Record<'wish' | 'collect' | 'doing' | 'on_hold' | 'dropped', number>

/** 评分 */
export type Rating = {
  total: number
  score: number
  rank?: number
  count: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10, number>
}

/** HTML 结构文字 */
export type HTMLText = string

/** 条目基本结构 */
export type Subject = Partial<{
  id: SubjectId
  url: UrlSubject
  type: SubjectTypeValue
  name: string
  name_cn: string
  summary: string
  eps: number
  eps_count: number
  air_date: string
  air_weekday: number
  images: Images
  collection: Collection
}>

/** 动词 */
type Actions = '看' | '玩' | '听' | '读'

/** 收藏状态动词 */
export type CollectActions = `${Actions}过` | `在${Actions}` | `想${Actions}` | '搁置' | '抛弃'

/** 一级分类 */
export type RankFilter = RankAnimeFilter | RankBookFilter | RankGameFilter | RankRealFilter

/** 二级分类 */
export type RankFilterSub = RankBookFilterSub | RankGameFilterSub

/** 放送年份 */
export type Airtime = (typeof DATA_AIRTIME)[number]

/** 放送月份 */
export type Month = (typeof DATA_MONTH)[number]

/** 来源 */
export type Source = (typeof DATA_SOURCE)[number]

/** 类型公共标签 */
export type Tag = (typeof DATA_ANIME_TAG | typeof DATA_GAME_TAG)[number]

/** 地区 */
export type Area = (typeof DATA_ANIME_AREA | typeof DATA_REAL_AREA)[number]

/** 受众 */
export type Target = (typeof DATA_ANIME_TARGET | typeof DATA_GAME_TARGET)[number]

/** 分级 */
export type Classification = (typeof DATA_CLASSIFICATION)[number]

/** 题材 */
export type Theme = (typeof DATA_THEME)[number]
