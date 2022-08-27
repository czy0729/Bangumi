/*
 * @Author: czy0729
 * @Date: 2022-06-10 14:20:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-21 06:56:40
 */
import { SubjectType, SubjectTypeValue } from '@constants/model/types'
import {
  AnyObject,
  Avatar,
  Collection,
  Cover,
  CoverCrt,
  DeepPartial,
  HTMLText,
  Id,
  Images,
  ImagesAvatar,
  ImagesCrt,
  ListEmpty,
  Loaded,
  Override,
  Rating as RatingType,
  SubjectId,
  UrlBlog,
  UrlEp,
  UrlMono,
  UrlSubject,
  UrlSubjectTopic,
  UrlUser,
  UserId
} from '@types'

/** 日志 */
type Blog = {
  dateline: string
  id: Id
  image: string
  replies: number
  summary: string
  timestamp: number
  title: string
  url: UrlBlog
  user: {
    avatar: ImagesAvatar
    id: UserId
    nickname: string
    sign: string
    url: UrlUser
    username: string
  }
}

/** 帖子 */
type Topic = {
  id: Id
  lastpost: number
  main_id: number
  replies: number
  timestamp: number
  title: string
  url: UrlSubjectTopic
  user: {
    avatar: ImagesAvatar
    id: UserId
    nickname: string
    sign: string
    url: UrlUser
    username: string
  }
}

/** 角色 */
export type Crt = {
  actors: {
    id: Id
    images: ImagesCrt
    name: string
    url: UrlMono
  }[]
  collects: number
  comment: number
  id: Id
  images: ImagesCrt
  info: {
    alias: Record<string, string>
    birth: string
    gender: string
    name_cn: string
  }
  name: string
  name_cn: string
  role_name: string
  url: UrlMono
}

/** 工作人员 */
export type Staff = {
  collects: number
  comment: number
  id: Id
  images: ImagesCrt
  info: {
    alias: {
      en: string
      nick: string
    }
    birth: string
    name_cn: string
    source: string
  }
  jobs: string[]
  name: string
  name_cn: string
  role_name: string
  url: UrlMono
}

export type Ep = {
  id: Id
  url: UrlEp

  /** 章节类型 0: TV 1: SP */
  type: 0 | 1
  sort: number
  name: string
  name_cn: string
  duration: string
  airdate: string
  comment: number
  desc: string
  status: 'Air' | 'Today' | 'NA'
}

/** 条目 */
export type Subject = {
  air_date: string
  air_weekday: number
  blog: Blog[]
  collection: Collection
  crt: Crt[]
  eps: Ep[]
  id: SubjectId
  images: Images
  name: string
  name_cn: string
  rank: number
  rating: RatingType
  staff: Staff[]
  summary: string
  topic: Topic[]
  type: SubjectTypeValue
  url: UrlSubject
  _responseGroup: 'small' | 'medium' | 'large'
  _loaded: Loaded
}

/** 条目 (HTML) */
export type SubjectFormHTML = DeepPartial<{
  type: SubjectTypeValue
  watchedEps: string | number
  totalEps: string | number
  info: string
  tags: {
    name: string
    count: string
  }[]
  relations: {
    id: Id
    image: Cover<'m'>
    title: string
    type: string
    url: UrlSubject
  }[]
  friend: {
    score: string
    total: string
  }
  disc: {
    title: string
    disc: {
      title: string
      href: `/ep/${number}`
    }[]
  }[]
  book: {
    chap: number
    vol: number
    totalChap: string
    totalVol: string
  }
  comic: {
    id: SubjectId
    name: string
    image: Cover<'c'>
  }[]
  like: {
    id: SubjectId
    name: string
    image: Cover<'m'>
  }[]
  who: {
    avatar: Avatar<'l'>
    name: string
    userId: UserId
    star: string
    status: string
  }[]
  catalog: {
    avatar: Avatar<'l'>
    name: string
    userId: UserId
    id: Id
    title: string
  }[]
  lock: string
  formhash: string
  _loaded: Loaded
}>

/** 条目 (CDN) */
export type SubjectFormCDN = DeepPartial<{
  id: SubjectId
  type: SubjectTypeValue
  name: string
  image: Cover<'m'>
  rating: RatingType
  summary: string
  info: string
  collection: Collection
  tags: {
    name: string
    count: string
  }[]
  eps: Ep[]
  crt: {
    id: Id
    image: CoverCrt<'g'>
    name: string
    desc: string
  }[]
  staff: {
    id: Id
    image: CoverCrt<'g'>
    name: string
    desc: string
  }[]
  relations: {
    id: Id
    image: Cover<'m'>
    title: string
    type: string
    url: UrlSubject
  }[]
  disc: {
    title: string
    disc: {
      title: string
      href: `/ep/${number}`
    }[]
  }[]
  comic: {
    id: SubjectId
    name: string
    image: Cover<'c'>
  }[]
  like: {
    id: SubjectId
    name: string
    image: Cover<'m'>
  }[]
  lock: string
  _loaded: Loaded
}>

/** 包含条目的目录 */
export type SubjectCatalogs = ListEmpty<
  Partial<{
    id: Id
    title: string
    userId: UserId
    userName: string
    avatar: Avatar<'s'>
    time: string
  }>
>

/** 公共回复参数 */
type SubjectCommentsAttrs = {
  id: Id
  time: string
  floor: string
  avatar: string
  userId: UserId
  userName: string
  userSign: string
  replySub: string
  message: string
  star: string | number
}

/** 回复项 */
type SubjectCommentsItem = Override<
  SubjectCommentsAttrs,
  {
    /** 子回复 */
    sub: SubjectCommentsAttrs[]
  }
>

/** 条目回复 */
export type SubjectComments = Override<
  ListEmpty<DeepPartial<SubjectCommentsItem>>,
  {
    _reverse?: boolean
  }
>

/** 人物 */
export type Mono = DeepPartial<{
  name: string
  nameCn: string
  cover: CoverCrt<'m'>
  info: HTMLText
  detail: string

  /** 声优有此值 */
  voice: {
    href: `/character/${Id}`
    name: string
    nameCn: string
    cover: Cover<'s'>
    subjectHref: `/subject/${SubjectId}`
    subjectName: string
    subjectNameCn: string
    subjectCover: Cover<'g'>
    staff: string
  }[]

  /** 废弃 */
  workes: AnyObject[]

  /** 虚拟角色有此值 */
  jobs: {
    href: `/subject/${SubjectId}`
    name: string
    nameCn: string
    cover: Cover<'g'>
    staff: string
    cast: string
    castHref: string
    castTag: string
    castCover: string
    cast2: {
      cast: string
      castCover: string
      castHref: string
      castTag: string
    }
    type: SubjectTypeValue
  }[]

  /** 真实人物或组织有此值 */
  works: {
    href: `/subject/${SubjectId}`
    name: string
    cover: Cover<'g'>
    staff: string
    type: SubjectTypeValue
  }[]

  collectUrl: `${string}?gh=${string}`
  eraseCollectUrl: `${string}?gh=${string}`
  _loaded: Loaded
}>

/** 角色回复 */
export type MonoComments = SubjectComments

/** 人物作品 */
export type MonoWorks = Override<
  ListEmpty<
    Partial<{
      id: `/subject/${SubjectId}`
      cover: Cover<'c'>
      name: string
      nameCn: string
      tip: string
      position: string[]
      score: string
      total: string
      rank: string
      collected: boolean
      type: SubjectType
    }>
  >,
  {
    filters?: any
  }
>

/** 人物作品 */
export type MonoVoices = ListEmpty<
  Partial<{
    id: Id
    name: string
    nameCn: string
    cover: CoverCrt<'s'>
    subject: {
      id: SubjectId
      name: string
      nameCn: string
      cover: Cover<'g'>
      staff: string
    }[]
  }>
>

/** 好友评分列表 */
export type Rating = ListEmpty<{
  id: UserId
  avatar: Avatar<'l'>
  name: string
  time: string
  star: number
  comment: string
}>

/** wiki修订历史 */
export type Wiki = DeepPartial<{
  edits: {
    id: number
    time: string
    userId: UserId
    userName: string
    comment: string
    sub: string
  }[]
  covers: {
    id: number
    cover: Cover<'m'>
    userId: UserId
    userName: string
  }[]
}>

export type ApiSubjectResponse = {
  id: SubjectId
  url: UrlSubject
  type: SubjectTypeValue
  name: string
  name_cn: string
  summary: string

  /** responseGroup: large */
  eps?: Ep[]
  eps_count: number
  air_date: string

  /** responseGroup: medium */
  air_weekday?: number
  rating: RatingType
  rank: number
  images: Images
  collection: Collection

  /** responseGroup: medium */
  crt?: Crt

  /** responseGroup: medium */
  staff?: Staff

  /** responseGroup: large */
  topic?: Topic

  /** responseGroup: large */
  blog?: Blog

  _loaded: Loaded
}
