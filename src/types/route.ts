/*
 * @Author: czy0729
 * @Date: 2023-02-06 19:35:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-18 18:23:12
 */
import * as Screens from '@screens'
import { RatingStatus, SubjectTypeCn } from '@constants/model/types'
import { Id, SubjectId, TopicId, UserId } from './bangumi'
import { Fn } from './utils'

/** 所有页面路径名 */
export type Paths = keyof typeof Screens

/** 路由和参数约束 */
export type NavigationPushType = RouteActions &
  RouteAuth &
  RouteAward &
  RouteBlog &
  RouteBlogs &
  RouteCatalogDetail &
  RouteCatalogs &
  RouteCharacter &
  RouteCharacters &
  RouteFriends &
  RouteGroup &
  RouteInformation &
  RouteMono &
  RoutePM &
  RouteRating &
  RouteSay &
  RouteSearch &
  RouteSetting &
  RouteShare &
  RouteSubject &
  RouteTag &
  RouteTinygrail &
  RouteTopic &
  RouteUser &
  RouteWebBrowser &
  RouteZone &
  ((path: Paths) => any)

type RouteAuth = (path: 'Auth') => any

type RouteSay = (
  path: 'Say',
  params: {
    onNavigationCallback?: Fn
  }
) => any

type RouteBlog = (
  path: 'Blog',
  params: {
    blogId: Id
  }
) => any

type RouteCharacters = (
  path: 'Characters',
  params: {
    subjectId: SubjectId
    name?: string
  }
) => any

type RouteTag = (
  path: 'Tag',
  params: {
    type: string
    tag: string
  }
) => any

type RouteSearch = (
  path: 'Search',
  params: {
    _type?: string
    _value?: string
  }
) => any

type RouteMono = (
  path: 'Mono',
  params: {
    monoId: string
    _name?: string
    _jp?: string
    _image?: string
    _count?: number
  }
) => any

type RouteGroup = (
  path: 'Group',
  params: {
    groupId: string
    _title?: string
  }
) => any

type RouteWebBrowser = (
  path: 'WebBrowser',
  params: {
    url: string
    title: string
    desc?: string

    /** 是否自动插入移动端 meta viewport */
    injectedViewport?: boolean
  }
) => any

type RouteZone = (
  path: 'Zone',
  params: {
    userId: UserId
    _id?: UserId
    _name?: string
    _image?: string
  }
) => any

type RouteCatalogDetail = (
  path: 'CatalogDetail',
  params: {
    catalogId: Id
  }
) => any

type RouteUser = (
  path: 'User',
  params: {
    userId: UserId
    _name?: string
    _image?: string
  }
) => any

type RouteTopic = (
  path: 'Topic',
  params: {
    topicId: TopicId
    _title?: string
    _replies?: string
    _group?: string
    _desc?: string
    _time?: string
    _avatar?: string
    _userName?: string
    _userId?: UserId
    _noFetch?: boolean
  }
) => any

type RouteCatalogs = (
  path: 'Catalogs',
  params: {
    /** 用户 ID, 没有 ID 为自己 */
    userId?: UserId
  }
) => any

type RouteBlogs = (
  path: 'Blogs',
  params: {
    /** 用户 ID */
    userId: UserId
  }
) => any

type RouteCharacter = (
  path: 'Character',
  params: {
    /** 用户 ID */
    userName: UserId
  }
) => any

type RouteFriends = (
  path: 'Friends',
  params: {
    /** 用户 ID */
    userId: UserId
  }
) => any

type RoutePM = (
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

type RouteSubject = (
  path: 'Subject',
  params: {
    subjectId: SubjectId
    _jp?: string
    _cn?: string
    _image?: string
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

type RouteRating = (
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

type RouteActions = (
  path: 'Actions',
  params: {
    subjectId: SubjectId
    name: string
  }
) => any

type RouteInformation = (
  path: 'Information',
  params: {
    title: string
    message: string[]
    advance?: boolean
  }
) => any

type RouteShare = (
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

type RouteAward = (
  path: 'Award',
  params: {
    uri: string
  }
) => any

type RouteSetting = (
  path: 'Setting',
  params: {
    open?: string
  }
) => any

type RouteTinygrail = (path: `Tinygrail${string}`, params?: Record<string, any>) => any
