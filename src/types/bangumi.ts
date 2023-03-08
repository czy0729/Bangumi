/*
 * 与 bgm.tv 有关的数据结构
 *
 * @Author: czy0729
 * @Date: 2022-06-27 13:10:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-07 19:31:11
 */
import { SubjectTypeValue } from '@constants/model/types'

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

/** 帖子 ID */
export type TopicId = `${'group' | 'subject' | 'ep' | 'prsn'}/${Id}`

export type Url = '//lain.bgm.tv'

/** 帖子地址 */
export type UrlTopic = `${Url}/topic/${TopicId}`

/** 日志地址 */
export type UrlBlog = `${Url}/blog/${Id}`

/** 用户空间地址 */
export type UrlUser = `${Url}/user/${UserId}`

/** 角色地址 */
export type UrlMono = `${Url}/${MonoId}`

/** 条目地址 */
export type UrlSubject = `${Url}/subject/${SubjectId}`

/** 条目帖子地址 */
export type UrlSubjectTopic = `${Url}/subject/topic/${Id}`

/** 章节地址 */
export type UrlEp = `${Url}/ep/${EpId}`

/** 静态资源地址 */
export type UrlStatic = `${Url}/pic`

/** 头像地址 */
export type Avatar<S extends 'l' | 'm' | 's' = 'l'> =
  `${UrlStatic}/user/${S}/${string}.jpg?r=${number}`

/** 条目封面地址 */
export type Cover<S extends 'l' | 'c' | 'm' | 's' | 'g' = 'm'> =
  `${UrlStatic}/cover/${S}/${string}.jpg`

/** 角色封面地址 */
export type CoverCrt<S extends 'l' | 'm' | 's' | 'g' = 'g'> =
  `${UrlStatic}/crt/${S}/${string}.jpg?r=${number}`

/** 小组封面地址 */
export type CoverGroup<S extends 'l' | 's' = 's'> =
  `${UrlStatic}/icon/${S}/${string}.jpg`

/** 用户上传的图片 */
export type CoverPhoto<S extends 'g' = 'g'> = `${UrlStatic}/photo/${S}/${string}.jpg`

/** 图片结构 */
export type Images = {
  large: Cover<'l'>
  common: Cover<'c'>
  medium: Cover<'m'>
  small: Cover<'s'>
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
export type Collection = Record<
  'wish' | 'collect' | 'doing' | 'on_hold' | 'dropped',
  number
>

/** 评分 */
export type Rating = {
  total: number
  score: number
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
// export type Actions = '看' | '玩' | '听' | '读'

type Actions = '看' | '玩' | '听' | '读'

/** 收藏状态动词 */
export type CollectActions =
  | `${Actions}过`
  | `在${Actions}`
  | `想${Actions}`
  | '搁置'
  | '抛弃'
