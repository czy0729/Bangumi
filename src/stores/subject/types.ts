/*
 * @Author: czy0729
 * @Date: 2022-06-10 14:20:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-21 00:35:12
 */
import {
  Avatar,
  Collection,
  Cover,
  CoverCrt,
  EpId,
  HTMLText,
  Id,
  Images,
  ImagesAvatar,
  ImagesCrt,
  ListEmpty,
  Loaded,
  Override,
  PersonId,
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

/** 条目 (HTML) 目录项 */
export type SubjectFromHtmlCatalogItem = {
  avatar: string
  name: string
  userId: UserId
  id: Id
  title: string
}

/** 条目 (HTML) 单行本项 */
export type SubjectFromHtmlComitItem = {
  id: SubjectId
  name: string
  image: string
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
    image: string
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
  comic: SubjectFromHtmlComitItem[]

  /** 猜你喜欢 */
  like: {
    id: SubjectId
    name: string
    image: string
  }[]

  /** 谁收藏了 */
  who: {
    avatar: string
    name: string
    userId: UserId
    star: string
    status: string
  }[]

  /** 目录 */
  catalog: SubjectFromHtmlCatalogItem[]

  /** 职员数 */
  crtCounts: Record<string, number>

  /** 是否锁定 */
  lock: string

  /** hash 比如删除等网页操作需要 */
  formhash: string

  /** 收藏此条目的时间 */
  collectedTime: string

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
export type SubjectFormCDN = {
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
}

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
  ListEmpty<SubjectCommentsItem>,
  {
    /** 是否有不同版本的评论 */
    version: boolean
    _reverse?: boolean
  }
>

/** 人物 */
export type Mono = {
  /** 人物日文名 (原名) */
  name: string

  /** 人物中文名 */
  nameCn: string

  /** 人物封面 */
  cover: string

  /** 人物各项详情属性 */
  info: HTMLText

  /** 人物描述 */
  detail: string

  /** 最近演出角色 (声优才有此值) */
  voice: {
    /** 虚拟角色链接 /character/{Id} */
    href: string

    /** 虚拟角色原名 */
    name: string

    /** 虚拟角色中文名 */
    nameCn: string

    /** 虚拟角色封面 */
    cover: string

    /** 条目链接 /subject/{SubjectId} */
    subjectHref: string

    /** 条目原名 */
    subjectName: string

    /** 条目中文名 */
    subjectNameCn: string

    /** 条目封面 */
    subjectCover: string

    /** 条目中的演出 */
    staff: string
  }[]

  /** 出演 (虚拟角色才有此值) */
  jobs: {
    /** 虚拟角色链接 /subject/{SubjectId} */
    href: string

    /** 虚拟角色原名 */
    name: string

    /** 虚拟角色中文名 */
    nameCn: string

    /** 虚拟角色封面 */
    cover: string

    /** 虚拟角色类型 */
    staff: string

    /** 声优名 */
    cast: string

    /** 声优链接 /person/{Id} */
    castHref: string

    /** 声优职位描述 */
    castTag: string

    /** 声优封面 */
    castCover: string

    /** 第二声优 */
    cast2: {
      /** 第二声优名 */
      cast: string

      /** 第二声优封面 */
      castCover: string

      /** 第二声优链接 /person/{Id} */
      castHref: string

      /** 第二声优职位描述 */
      castTag: string
    }

    /** 条目类型 */
    type: SubjectTypeValue
  }[]

  /** 最近参与 (真实人物、组织才有此值) */
  works: {
    /** 条目链接 /subject/{SubjectId} */
    href: string

    /** 条目原名 */
    name: string

    /** 条目封面 */
    cover: string

    /** 条目职位 */
    staff: string

    /** 条目类型 */
    type: SubjectTypeValue
  }[]

  /** 最近谁收藏了 */
  collected: {
    /** 用户头像 */
    avatar: string

    /** 用户昵称 */
    name: string

    /** 用户 ID */
    userId: UserId

    /** 最后操作时间 */
    last: string
  }[]

  /** 合作 */
  collabs: {
    /** 真实人物链接 /person/{Id} */
    href: string

    /** 真实人物原名 */
    name: string

    /** 真实人物封面 */
    cover: string

    /** 合作次数 */
    count: string
  }[]

  /** 收藏动作链接 {string}?gh={string} (需登录) */
  collectUrl: string

  /** 取消收藏动作链接 {string}?gh={string} (需登录) */
  eraseCollectUrl: string

  /** 数据最后加载时间 */
  _loaded?: Loaded
}

/** 基本回复项 */
type BaseCommentsItem = {
  /** 用户头像 */
  avatar: string

  /** 楼层 */
  floor: string

  /** 楼层 ID */
  id: string

  /** 回复正文 */
  message: string

  /** 回复参数 (需登录) */
  replySub: string

  /** 回复时间 */
  time: string

  /** 用户 ID */
  userId: UserId

  /** 用户昵称 */
  userName: string

  /** 用户签名 */
  userSign: string
}

/** 角色吐槽箱项 */
export type MonoCommentsItem = Override<
  BaseCommentsItem,
  {
    /** 回复子楼层 */
    sub: BaseCommentsItem[]
  }
>

/** 角色吐槽箱 */
export type MonoComments = ListEmpty<MonoCommentsItem>

/** 人物角色 */
export type MonoVoicesItem = {
  /** 虚拟角色 ID */
  id: Id

  /** 虚拟角色原名 */
  name: string

  /** 虚拟角色中文名 */
  nameCn: string

  /** 虚拟角色封面 */
  cover: string

  /** 条目 */
  subject: {
    /** 条目 ID */
    id: SubjectId

    /** 条目原名 */
    name: string

    /** 条目中文名 */
    nameCn: string

    /** 条目封面 */
    cover: string

    /** 角色职位 */
    staff: string
  }[]
}

/** 人物高级筛选项 */
export type MonoFiltersItem = {
  /**
   * 筛选列属性
   *  - 类型、角色
   * */
  title: string

  /**
   * 筛选项
   *  - 类型：全部、动画、游戏
   *  - 角色：全部、主角、配角
   *  - 职位：全部、艺术家、主题歌演出等
   * */
  data: {
    /** 筛选项标签 */
    title: string

    /** 筛选项值 */
    value: string
  }[]
}

/** 人物角色 */
export type MonoVoices = Override<
  ListEmpty<MonoVoicesItem>,
  {
    /** 人物角色高级筛选 */
    filters: MonoFiltersItem[]
  }
>

/** 人物作品项 */
export type MonoWorksItem = {
  /** 条目 ID */
  id: `/subject/${SubjectId}`

  /** 条目封面 */
  cover: string

  /** 条目原名 */
  name: string

  /** 条目中文名 */
  nameCn: string

  /** 条目简略描述 */
  tip: string

  /** 人物职位 */
  position: string[]

  /** 条目评分 */
  score: string

  /** 条目打分人数 */
  total: string

  /** 条目排名 */
  rank: string

  /** 条目是否收藏 (需登录) */
  collected: boolean

  /** 条目类型 */
  type: SubjectType
}

/** 人物作品 */
export type MonoWorks = Override<
  ListEmpty<MonoWorksItem>,
  {
    /** 人物作品高级筛选 */
    filters: MonoFiltersItem[]
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
export type Wiki = {
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
}

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
  code?: 200 | 404
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

export type EpStatus = Record<EpId, string>

/** 人物角色参数 */
export type FetchMonoVoicesArgs = {
  /** 现实人物 ID */
  monoId: PersonId

  /** 职位筛选 */
  position?: string
}

/** 人物作品参数 */
export type FetchMonoWorksArgs = {
  /** 现实人物 ID */
  monoId: PersonId

  /** 作品职位筛选 */
  position?: string

  /** 作品排序 */
  order?: 'date' | 'rank' | 'title'
}
