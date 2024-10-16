/*
 * @Author: czy0729
 * @Date: 2022-06-10 14:20:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-04 05:36:03
 */
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
  RatingStatus,
  SubjectId,
  SubjectType,
  SubjectTypeValue,
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

  /** 不建议使用，旧接口有此值，用于书籍总 Chap */
  eps_count?: number
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

  /** 若有此值表示非旧 API 成功获取到的数据, 通常可以用于判断 NSFW */
  v0?: boolean
  _responseGroup: 'small' | 'medium' | 'large'
  _loaded: Loaded
}

/** 条目 (HTML) */
export type SubjectFromHTML = {
  /** 标题旁的子标题 */
  type: string

  /** 已收看集数 */
  watchedEps: string | number

  /** 总集数 */
  totalEps: string | number

  /** 详情 */
  info: string

  /** 用户标签 */
  tags: {
    name: string
    count: string
    meta?: boolean
  }[]

  /** 关联系列 */
  relations: {
    id: Id
    image: Cover<'m'>
    title: string
    type: string
    url: UrlSubject
  }[]

  /** 好友评分 */
  friend: {
    score: string
    total: string
  }

  /** 曲目信息 */
  disc: {
    title: string
    disc: {
      title: string
      href: `/ep/${number}`
    }[]
  }[]

  /** 书籍额外信息 */
  book: {
    chap: string | number
    vol: string | number
    totalChap: string
    totalVol: string
  }

  /** 单行本 */
  comic: {
    id: SubjectId
    name: string
    image: Cover<'c'>
  }[]

  /** 猜你喜欢 */
  like: {
    id: SubjectId
    name: string
    image: Cover<'m'>
  }[]

  /** 谁收藏了 */
  who: {
    avatar: Avatar<'l'>
    name: string
    userId: UserId
    star: string
    status: string
  }[]

  /** 目录 */
  catalog: {
    avatar: Avatar<'l'>
    name: string
    userId: UserId
    id: Id
    title: string
  }[]

  /** 职员数 */
  crtCounts: Record<string, number>

  /** 是否锁定 */
  lock: string

  /** hash 比如删除等网页操作需要 */
  formhash: string

  _loaded?: Loaded
}

/** 条目 (new api) */
export type SubjectV2 = {
  id: SubjectId
  date: string
  image: Cover<'m'>
  jp: string
  cn: string
  tags: {
    name: string
    count: number
  }[]
  rank: '' | number
  rating: RatingType
  collection: Collection
  eps: '' | number
  vol: '' | number
  locked: boolean
  nsfw: boolean
  type: SubjectTypeValue
  _loaded: Loaded
}

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

/** 条目信息快照 */
export type SubjectSnapshot = {
  air_date: string
  images: {
    common: string
  }
  name: string
  name_cn: string
  rating: {
    score: number
    total: number
  }
  rank: number | ''
  _loaded: number
}

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
  comment: string
  star: string | number
  relatedId: string | number
  action: string
  mainId: string
  mainName: string
}

/** 回复项 */
export type SubjectCommentsItem = Override<
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
    /** 是否有不同版本的评论 */
    version: boolean
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

  /** 谁收藏了 */
  collected: {
    avatar: Avatar<'l'>
    name: string
    userId: UserId
    last: string
  }[]

  /** 合作 */
  collabs: {
    href: `/person/${Id}`
    name: string
    cover: Cover<'s'>
    count: number
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
    /** 可筛选项 */
    filters?: any
  }
>

/** 人物作品 */
export type MonoVoices = Override<
  ListEmpty<
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
  >,
  {
    filters?: {
      title: string
      data: {
        title: string
        value: string
      }[]
    }[]
  }
>

/** 好友评分列表 */
export type Rating = Override<
  ListEmpty<{
    id: UserId
    avatar: Avatar<'l'>
    name: string
    time: string
    star: number
    comment: string
  }>,
  {
    counts: Record<RatingStatus, number>
  }
>

export type ComputedRating = Override<
  Rating,
  {
    counts: Record<RatingStatus, number>
  }
>

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

  /** v0 mark */
  v0?: true

  _loaded: Loaded
}

export type RankItem = {
  r?: number
  s?: number
  _loaded: Loaded
}

export type EpV2 = {
  list: Ep[]
  _loaded: Loaded
}
