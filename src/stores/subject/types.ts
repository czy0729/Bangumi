/*
 * @Author: czy0729
 * @Date: 2022-06-10 14:20:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-27 13:57:51
 */
import { SubjectType, SubjectTypeCn, SubjectTypeValue } from '@constants/model/types'
import {
  Avatar,
  Collection,
  Cover,
  CoverCrt,
  DeepPartial,
  Id,
  Images,
  ImagesAvatar,
  ImagesCrt,
  ListEmpty,
  Override,
  PersonId,
  Rating,
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
type Crt = {
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
type Staff = {
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

/** 条目 */
export type Subject = DeepPartial<{
  air_date: string
  air_weekday: number
  blog: Blog[]
  collection: Collection
  crt: Crt[]
  eps: string
  id: SubjectId
  images: Images
  name: string
  name_cn: string
  rank: number
  rating: Rating
  staff: Staff[]
  summary: string
  topic: Topic[]
  type: SubjectTypeValue
  url: UrlSubject
  _loaded: number
}>

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
    type: SubjectTypeCn
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
  _loaded: number
}>

/** 条目 (CDN) */
export type SubjectFormCDN = DeepPartial<{
  id: SubjectId
  type: SubjectTypeValue
  name: string
  image: Cover<'m'>
  rating: Rating
  summary: string
  info: string
  collection: Collection
  tags: {
    name: string
    count: string
  }[]
  eps: {
    id: Id
    url: UrlEp
    type: any
    sort: number
    name: string
    name_cn: string
    duration: string
    airdate: string
    comment: number
    desc: string
    status: string
  }[]
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
    type: SubjectTypeCn
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
}>

/** 公共回复参数 */
type SubjectCommentsAttrs = {
  id: string
  time: string
  floor: string
  avatar: string
  userId: string
  userName: string
  userSign: string
  replySub: string
  message: string
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
  ListEmpty<SubjectCommentsItem>,
  {
    _reverse?: boolean
  }
>

/** 角色回复 */
export type MonoCommentsItem = SubjectComments

/** 制作人员职位项 */
export type MonoWorksItem = {
  id: string
  cover: string
  name: string
  nameCn: string
  tip: string
  position: string[]
  score: string
  total: string
  rank: string
  collected: boolean
  type: SubjectType
}

/** 角色列表项 */
export type MonoVoicesItem = {
  cover: string
  id: string
  name: string
  nameCn: string
  subject: any[]
}

/** 人物作品列表 */
export type FetchMonoWorks = (
  args: {
    monoId: PersonId
    position?: string
    order?: 'date' | 'rank' | 'title'
  },
  refresh?: boolean
) => Promise<ListEmpty<MonoWorksItem>>

/** 人物角色列表 */
export type FetchMonoVoices = (args: {
  monoId: PersonId
  position?: string
}) => Promise<ListEmpty<MonoVoicesItem>>
