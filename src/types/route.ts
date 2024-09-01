/*
 * @Author: czy0729
 * @Date: 2023-02-06 19:35:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-01 09:35:18
 */
import { ImageSourcePropType } from 'react-native'
import { RatingStatus, SubjectType, SubjectTypeCn } from '@constants/model/types'
import * as Screens from '@screens'
import { Id, MonoId, SubjectId, TopicId, UserId } from './bangumi'
import { AnyObject, Fn } from './utils'

/** 所有页面路径名 */
export type Paths = keyof typeof Screens

/**
 * 构造页面路由类型
 *  - Path 路由
 *  - Params 参数 (下划线开头参数为占位数据, 用于页面快速展示数据, 网页端进入页面后会清除下划线开头参数)
 */
type Route<Path extends Paths, Params = undefined> = (
  path: Path,
  params?: Params extends undefined ? undefined : Params
) => any

/** 获取页面路由参数 */
export type GetRouteParams<R extends (path: string, params: object) => any> = Parameters<R>[1]

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
  RouteDiscoveryBlog &
  RouteEpisodes &
  RouteFriends &
  RouteGame &
  RouteGroup &
  RouteHentai &
  RouteInformation &
  RouteManga &
  RouteMono &
  RouteNotify &
  RoutePM &
  RoutePersons &
  RouteRank &
  RouteRating &
  RouteReviews &
  RouteSay &
  RouteSearch &
  RouteSetting &
  RouteShare &
  RouteSubject &
  RouteSubjectCatalogs &
  RouteTag &
  RouteTags &
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

export type RouteSay = Route<
  'Say',
  {
    /** @deprecated 以 sayId 为最优先 */
    id?: Id

    /** 吐槽 id */
    sayId?: Id

    /** 查看某吐槽是需要带上发布人的用户 id */
    userId?: UserId

    /** 新吐槽发布后回调 (client only) */
    onNavigationCallback?: Fn
  }
>

export type RouteBlog = (
  path: 'Blog',
  params: {
    blogId: Id
    _title?: string
  }
) => any

export type RouteCharacters = Route<
  'Characters',
  {
    subjectId: SubjectId

    /** 条目名, 用于标题 */
    name?: string
  }
>

export type RoutePersons = Route<
  'Persons',
  {
    subjectId: SubjectId

    /** 条目名, 用于标题 */
    name?: string
  }
>

export type RouteDiscoveryBlog = Route<
  'DiscoveryBlog',
  {
    type?: SubjectType
  }
>

export type RouteTag = (
  path: 'Tag',
  params: {
    type: SubjectType
    tag: string
  }
) => any

export type RouteTags = Route<
  'Tags',
  {
    type?: SubjectType
  }
>

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

export type RouteMono = Route<
  'Mono',
  {
    /** 人物 id */
    monoId: MonoId

    /** 中文名 */
    _name?: string

    /** 日文名, 原名 */
    _jp?: string

    /** 人物头像 */
    _image?: string

    /** 吐槽 +N */
    _count?: number
  }
>

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

export type RouteTopic = Route<
  'Topic',
  {
    /** 帖子 id: group/1, subject/1, ep/1, crt/1, prsn/1 */
    topicId: TopicId

    _avatar?: string
    _desc?: string
    _group?: string
    _groupThumb?: string
    _noFetch?: boolean
    _replies?: string
    _time?: string
    _title?: string
    _url?: string
    _userId?: UserId
    _userName?: string
  }
>

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

export type RouteSubject = Route<
  'Subject',
  {
    /** 条目 id */
    subjectId: SubjectId

    /** 条目类型中文 */
    _type?: SubjectTypeCn

    /** 中文名 */
    _cn?: string

    /** 日文名, 原名 */
    _jp?: string

    /** 封面占位 */
    _image?: string | ImageSourcePropType

    /** 封面占位, 比 _image 优先 */
    _imageForce?: string

    /** 找条目, 动画 */
    _aid?: Id

    /** 找条目, 小说 */
    _wid?: Id

    /** 找条目, 漫画 */
    _mid?: Id

    /** @deprecated 找条目, NSFW */
    _hid?: Id
  }
>

export type RouteEpisodes = Route<
  'Episodes',
  {
    subjectId: SubjectId

    /** 条目名 */
    name?: string

    /** 章节从索引开始 */
    filterEps?: number

    /** 预览图 (因浏览器跨域, clien only) */
    epsThumbs?: any[]

    /** 预览图请求头 (clien only) */
    epsThumbsHeader?: AnyObject
  }
>

export type RouteSubjectCatalogs = (
  path: 'SubjectCatalogs',
  params: {
    subjectId: SubjectId
    name?: string
  }
) => any

export type RouteRank = Route<
  'Rank',
  {
    type?: SubjectType
  }
>

export type RouteRating = Route<
  'Rating',
  {
    subjectId: SubjectId

    /** Tab 默认索引 */
    status?: RatingStatus | ''

    /** ex: 在看变成在读 */
    type?: SubjectTypeCn

    /** 标题 */
    name?: string

    /** 想看数字占位 */
    wish?: number

    /** 看过数字占位 */
    collect?: number

    /** 在看数字占位 */
    doing?: number

    /** 搁置数字占位 */
    onHold?: number

    /** 抛弃数字占位 */
    dropped?: number
  }
>

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
