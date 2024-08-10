/*
 * @Author: czy0729
 * @Date: 2023-02-06 19:35:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-10 00:54:18
 */
import { ImageSourcePropType } from 'react-native'
import { RatingStatus, SubjectType, SubjectTypeCn } from '@constants/model/types'
import * as Screens from '@screens'
import { Id, SubjectId, TopicId, UserId } from './bangumi'
import { Fn } from './utils'

/** 所有页面路径名 */
export type Paths = keyof typeof Screens

/** 路由和参数约束 */
export type NavigationPushType = RouteActions &
  RouteAnime &
  RouteAuth &
  RouteAward &
  RouteBlog &
  RouteBlogs &
  RouteCatalogDetail &
  RouteCatalogs &
  RouteChannel &
  RouteCharacter &
  RouteCharacters &
  RouteFriends &
  RouteGame &
  RouteGroup &
  RouteHentai &
  RouteInformation &
  RouteManga &
  RouteMono &
  RouteNotify &
  RoutePM &
  RouteRating &
  RouteReviews &
  RouteSay &
  RouteSearch &
  RouteSetting &
  RouteShare &
  RouteSubject &
  RouteSubjectCatalogs &
  RouteTag &
  RouteTinygrail &
  RouteTips &
  RouteTopic &
  RouteTyperank &
  RouteUser &
  RouteUserTimeline &
  RouteWebBrowser &
  RouteWenku &
  RouteZone &
  ((path: Paths) => any)

export type RouteReviews = (
  path: 'Reviews',
  params: {
    subjectId: SubjectId
    name: string
  }
) => any

export type RouteNotify = (
  path: 'Notify',
  params: {
    type: 'pm' | 'notify'
  }
) => any

export type RouteTyperank = (
  path: 'Typerank',
  params: {
    type: SubjectType
    tag: string
    subjectId?: SubjectId
  }
) => any

export type RouteChannel = (
  path: 'Channel',
  params: {
    type?: SubjectType
  }
) => any

export type RouteTips = (
  path: 'Tips',
  params: {
    key?: string
  }
) => any

export type RouteAuth = (path: 'Auth') => any

export type RouteAnime = (
  path: 'Anime',
  params: {
    _tags?: string[]
  }
) => any

export type RouteManga = (
  path: 'Manga',
  params: {
    _tags?: string[]
  }
) => any

export type RouteWenku = (
  path: 'Wenku',
  params: {
    _tags?: string[]
  }
) => any

export type RouteGame = (
  path: 'Game',
  params: {
    _tags?: string[]
  }
) => any

export type RouteHentai = (
  path: 'Hentai',
  params: {
    _tags?: string[]
  }
) => any

export type RouteUserTimeline = (
  path: 'UserTimeline',
  params: {
    userId?: UserId
    userName?: string
  }
) => any

export type RouteSay = (
  path: 'Say',
  params: {
    /** @deprecated */
    id?: Id
    sayId?: Id
    onNavigationCallback?: Fn
  }
) => any

export type RouteBlog = (
  path: 'Blog',
  params: {
    blogId: Id
  }
) => any

export type RouteCharacters = (
  path: 'Characters',
  params: {
    subjectId: SubjectId
    name?: string
  }
) => any

export type RouteTag = (
  path: 'Tag',
  params: {
    type: SubjectType
    tag: string
  }
) => any

export type RouteSearch = (
  path: 'Search',
  params: {
    type?: string
    value?: string

    /** 若使用 _type 而不使用 type, 会导致页面可能不刷新 */
    _type?: string

    /** 若使用 _value 而不使用 value, 会导致页面可能不刷新 */
    _value?: string
  }
) => any

export type RouteMono = (
  path: 'Mono',
  params: {
    monoId: string
    _name?: string
    _jp?: string
    _image?: string
    _count?: number
  }
) => any

export type RouteGroup = (
  path: 'Group',
  params: {
    groupId: string
    _title?: string
  }
) => any

export type RouteWebBrowser = (
  path: 'WebBrowser',
  params: {
    url: string
    title: string
    desc?: string

    /** 是否自动插入移动端 meta viewport */
    injectedViewport?: boolean
  }
) => any

export type RouteZone = (
  path: 'Zone',
  params: {
    userId: UserId
    from?: string
    _id?: UserId
    _name?: string
    _image?: string
  }
) => any

export type RouteCatalogDetail = (
  path: 'CatalogDetail',
  params: {
    catalogId: Id

    /** 是否隐藏条目分数 */
    _hideScore?: boolean

    /** 最后更新时间 (只有某些特定入口才有的) */
    _lastUpdate?: string
  }
) => any

export type RouteUser = (
  path: 'User',
  params: {
    userId: UserId
    _name?: string
    _image?: string
  }
) => any

export type RouteTopic = (
  path: 'Topic',
  params: {
    topicId: TopicId
    _title?: string
    _replies?: string
    _group?: string
    _groupThumb?: string
    _desc?: string
    _time?: string
    _avatar?: string
    _userName?: string
    _userId?: UserId
    _noFetch?: boolean
  }
) => any

export type RouteCatalogs = (
  path: 'Catalogs',
  params: {
    /** 用户 ID, 没有 ID 为自己 */
    userId?: UserId
  }
) => any

export type RouteBlogs = (
  path: 'Blogs',
  params: {
    /** 用户 ID */
    userId: UserId
  }
) => any

export type RouteCharacter = (
  path: 'Character',
  params: {
    /** 用户 ID */
    userName: UserId
  }
) => any

export type RouteFriends = (
  path: 'Friends',
  params: {
    /** 用户 ID */
    userId: UserId
  }
) => any

export type RoutePM = (
  path: 'PM',
  params: {
    /** 已有 ID, 没有为新建 */
    id?: Id

    /** 必须是数字 ID */
    userId?: number

    /** 用户昵称 (用于占位显示) */
    userName?: string
  }
) => any

export type RouteSubject = (
  path: 'Subject',
  params: {
    subjectId: SubjectId
    _jp?: string
    _cn?: string
    _image?: string | ImageSourcePropType
    _imageForce?: string
    _collection?: string
    _type?: SubjectTypeCn

    /** 找条目 */
    _aid?: Id
    _wid?: Id
    _mid?: Id
    _hid?: Id
  }
) => any

export type RouteSubjectCatalogs = (
  path: 'SubjectCatalogs',
  params: {
    subjectId: SubjectId
    name?: string
  }
) => any

export type RouteRating = (
  path: 'Rating',
  params: {
    subjectId: SubjectId
    status: RatingStatus | ''
    name: string
    wish: number
    collect: number
    doing: number
    onHold: number
    dropped: number
    type: string
  }
) => any

export type RouteActions = (
  path: 'Actions',
  params: {
    subjectId: SubjectId
    name: string
  }
) => any

export type RouteInformation = (
  path: 'Information',
  params: {
    title: string
    message: string[]
    advance?: boolean
    images?: string[]
  }
) => any

export type RouteShare = (
  path: 'Share',
  params: {
    _subjectId: SubjectId
    _type: SubjectTypeCn | ''
    _url: string
    _cover: `data:image/jpg;base64,${string}`
    _title: string
    _content: string
    _detail: string
  }
) => any

export type RouteAward = (
  path: 'Award',
  params: {
    uri: string
  }
) => any

export type RouteSetting = (
  path: 'Setting',
  params: {
    /** 进入页面后展开子菜单 */
    open?: string
  }
) => any

export type RouteTinygrail = (path: `Tinygrail${string}`, params?: Record<string, any>) => any
