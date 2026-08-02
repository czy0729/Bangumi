/*
 * @Author: czy0729
 * @Date: 2023-02-06 19:35:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-28 18:57:18
 */
import type { ImageSourcePropType } from 'react-native'
import type {
  CollectionsOrder,
  CollectionStatus,
  CollectionStatusCn,
  RatingStatus,
  SearchCatCn,
  SubjectType,
  SubjectTypeCn,
  SubjectTypeValue
} from '@constants/model/types'
import type * as Screens from '@screens'
import type { Id, MonoId, PersonId, SubjectId, TopicId, UserId } from './bangumi'
import type { Fn } from './utils'

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
) => void

/** 获取页面路由参数 */
export type GetRouteParams<R> = R extends (path: Paths, params?: infer P) => void
  ? P extends undefined
    ? {}
    : P
  : {}

export type NavigationPushType = RouteActions &
  RouteAnime &
  RouteAward &
  RouteBlog &
  RouteBlogs &
  RouteBoard &
  RouteCatalog &
  RouteCatalogDetail &
  RouteCatalogs &
  RouteChannel &
  RouteCharacter &
  RouteCharacters &
  RouteDEV &
  RouteDiscoveryBlog &
  RouteEpisodes &
  RouteFriends &
  RouteGame &
  RouteGroup &
  RouteHentai &
  RouteInformation &
  RouteLike &
  RouteProxyHelp &
  RouteManga &
  RouteMilestone &
  RouteMono &
  RouteNotify &
  RouteOverview &
  RoutePM &
  RoutePersons &
  RoutePic &
  RoutePreview &
  RouteRank &
  RouteRating &
  RouteReviews &
  RouteSay &
  RouteSearch &
  RouteSetting &
  RouteShare &
  RouteSubject &
  RouteSubjectCatalogs &
  RouteSubjectInfo &
  RouteSubjectLink &
  RouteSubjectWiki &
  RouteTag &
  RouteTags &
  RouteTinygrail &
  RouteTinygrailCharaAssets &
  RouteTinygrailDeal &
  RouteTips &
  RouteTopic &
  RouteTyperank &
  RouteUser &
  RouteUserTimeline &
  RouteVoices &
  RouteWebBrowser &
  RouteWenku &
  RouteWordCloud &
  RouteWorks &
  RouteZone &
  ((path: Paths) => void)

/** 影评列表 */
export type RouteReviews = Route<
  'Reviews',
  {
    /** 条目 ID */
    subjectId: SubjectId

    /** 条目名 */
    name: string
  }
>

/** 电波提醒 */
export type RouteNotify = Route<
  'Notify',
  {
    /** 通知类型, pm 为私信, notify 为系统通知 */
    type?: 'pm' | 'notify'
  }
>

/** 分类排行 */
export type RouteTyperank = Route<
  'Typerank',
  {
    /** 条目类型 */
    type: SubjectType

    /** 标签 */
    tag: string

    /** 来自哪个条目 */
    subjectId?: SubjectId

    /** 来源 */
    _from?: string
  }
>

/** 频道 */
export type RouteChannel = Route<
  'Channel',
  {
    /** 条目类型 */
    type?: SubjectType
  }
>

/** 特色功能 */
export type RouteTips = Route<
  'Tips',
  {
    /** 功能标识, 用于加载对应的 Web 内容 */
    key?: string
  }
>

/** 找番剧 */
export type RouteAnime = Route<
  'Anime',
  {
    /** 预选标签 */
    _tags?: string[]
  }
>

/** 找漫画 */
export type RouteManga = Route<
  'Manga',
  {
    /** 预选标签 */
    _tags?: string[]
  }
>

/** 找文库 */
export type RouteWenku = Route<
  'Wenku',
  {
    /** 预选标签 */
    _tags?: string[]
  }
>

/** 找游戏 */
export type RouteGame = Route<
  'Game',
  {
    /** 预选标签 */
    _tags?: string[]
  }
>

/** 找里番 */
export type RouteHentai = Route<
  'Hentai',
  {
    /** 预选标签 */
    _tags?: string[]
  }
>

/** 用户的时间线 */
export type RouteUserTimeline = Route<
  'UserTimeline',
  {
    /** 用户 ID, 不传递使用自己的 ID */
    userId?: UserId

    /** 用户昵称 */
    userName?: string
  }
>

/** 图集 */
export type RoutePic = Route<
  'Pic',
  {
    /** 设为塔图的人物 (小圣杯专用) */
    monoId?: MonoId

    /** 关键字 */
    name: string

    /** 下次跳转是否需要替换路由 */
    replace?: boolean

    /** 目标关键字没有结果后, 追加的尝试关键字 */
    keywords?: string[]
  }
>

/** 吐槽详情 */
export type RouteSay = Route<
  'Say',
  {
    /** @deprecated 以 sayId 为最优先 */
    id?: Id

    /** 吐槽 ID */
    sayId?: Id

    /** 查看某吐槽是需要带上发布人的用户 ID */
    userId?: UserId

    /** 新吐槽发布后回调 (client only) */
    onNavigationCallback?: Fn
  }
>

/** 人物的角色 (声优) */
export type RouteVoices = Route<
  'Voices',
  {
    /** 现实人物 ID */
    monoId: PersonId

    /** 现实人物名字 */
    name?: string
  }
>

/** 人物的作品 (制作人员) */
export type RouteWorks = Route<
  'Works',
  {
    /** 现实人物 ID */
    monoId: PersonId

    /** 现实人物名字 */
    name?: string
  }
>

/** 日志详情 */
export type RouteBlog = Route<
  'Blog',
  {
    /** 日志 ID */
    blogId: Id

    /** 标题占位 */
    _title?: string

    /** 发布时间占位 */
    _time?: string

    /** 用户头像占位 */
    _avatar?: string

    /** 用户 ID 占位 */
    _userId?: string

    /** 用户名占位 */
    _userName?: string

    /** 原文链接占位 */
    _url?: string
  }
>

/** 条目更多角色 */
export type RouteCharacters = Route<
  'Characters',
  {
    /** 条目 ID */
    subjectId: SubjectId

    /** 条目名, 用于标题 */
    name?: string
  }
>

/** 条目封面一览 */
export type RouteOverview = Route<
  'Overview',
  {
    /** 条目 ID */
    subjectId: SubjectId

    /** 标题 */
    title: string

    /** 页面来源 */
    path?: string

    /**
     * 序列化列表数据
     * {
     *   id: Id
     *   image: string
     *   name: string
     *   desc?: string
     * }[]
     * */
    _list: string
  }
>

/** 制作人员 */
export type RoutePersons = Route<
  'Persons',
  {
    /** 条目 ID */
    subjectId: SubjectId

    /** 条目名, 用于标题 */
    name?: string
  }
>

/** 开发调试工具 */
export type RouteDEV = Route<
  'DEV',
  {
    /** 指定用户 ID, 用于调试 */
    userId?: UserId
  }
>

/** 全站日志 */
export type RouteDiscoveryBlog = Route<
  'DiscoveryBlog',
  {
    /** 条目类型 */
    type?: SubjectType
  }
>

/** 词云 */
export type RouteWordCloud = Route<
  'WordCloud',
  {
    /** 条目 ID */
    subjectId?: SubjectId

    /** 帖子 ID, 与其他 ID 互斥 */
    topicId?: TopicId

    /** 人物 ID, 与其他 ID 互斥 */
    monoId?: MonoId

    /** 用户 ID, 与其他 ID 互斥 */
    userId?: UserId

    /** 条目类型中文 */
    _type?: SubjectTypeCn
  }
>

/** 标签条目 */
export type RouteTag = Route<
  'Tag',
  {
    /** 标签类型 */
    type?: SubjectType

    /** 标签名 */
    tag?: string

    /** 默认年份筛选值 */
    airtime?: string

    /** 来源 */
    _from?: string
  }
>

/** 标签 */
export type RouteTags = Route<
  'Tags',
  {
    /** 条目类型 */
    type?: SubjectType
  }
>

/** 搜索 */
export type RouteSearch = Route<
  'Search',
  {
    /** 默认查询类别 */
    type?: SearchCatCn | ''

    /** 查询关键字 */
    value?: string

    /** 默认查询类别 (若使用 _type 而不使用 type, 会导致页面可能不刷新) */
    _type?: SearchCatCn | ''

    /** 查询关键字 (若使用 _value 而不使用 value, 会导致页面可能不刷新) */
    _value?: string

    /** 传递 false 时不自动聚焦 */
    _autoFocus?: boolean

    /** 来源页面 */
    _from?: string
  }
>

/** 人物详情 */
export type RouteMono = Route<
  'Mono',
  {
    /** 人物 ID */
    monoId: MonoId

    /** 中文名 */
    _name?: string

    /** 日文名, 原名 */
    _jp?: string

    /** 人物头像 */
    _image?: string | ImageSourcePropType

    /** 吐槽 +N */
    _count?: string | number

    /** 来源条目名 */
    _subjectName?: string
  }
>

/** 小组 */
export type RouteGroup = Route<
  'Group',
  {
    /** 小组 ID */
    groupId: string

    /** 小组名占位 */
    _title?: string
  }
>

/** 内置浏览器 */
export type RouteWebBrowser = Route<
  'WebBrowser',
  {
    /** 链接 */
    url: string

    /** 页面标题 */
    title?: string

    /** 顶部补充说明 */
    desc?: string

    /** 是否自动插入移动端 meta viewport */
    injectedViewport?: boolean

    /** 是否允许手势, 可用于避免在填写表单时手滑退出页面 (default=true) */
    gestureEnabled?: boolean
  }
>

/** 用户空间 */
export type RouteZone = Route<
  'Zone',
  {
    /** 用户 ID */
    userId: UserId

    /** 来自哪个约定的页面 */
    from?: 'tinygrail'

    /** 占位用户 ID */
    _id?: UserId

    /** 占位用户昵称 */
    _name?: string

    /** 占位用户头像 */
    _image?: string
  }
>

/** 目录 */
export type RouteCatalog = Route<
  'Catalog',
  {
    /** 默认搜索关键字 */
    _keyword?: string
  }
>

/** 目录详情 */
export type RouteCatalogDetail = Route<
  'CatalogDetail',
  {
    /** 目录 ID */
    catalogId: Id

    /** 是否隐藏条目分数 */
    _hideScore?: boolean

    /** 最后更新时间 (只有某些特定入口才有的) */
    _lastUpdate?: string
  }
>

/** 用户个人空间 */
export type RouteUser = Route<
  'User',
  {
    /** 用户 ID, 没传递则使用自己 */
    userId?: UserId
  }
>

/** 帖子详情 */
export type RouteTopic = Route<
  'Topic',
  {
    /** 帖子 ID: group/1, subject/1, ep/1, crt/1, prsn/1 */
    topicId: TopicId

    /** 发帖人头像占位 */
    _avatar?: string

    /** 描述占位 */
    _desc?: string

    /** 小组名占位 */
    _group?: string

    /** 小组缩略图占位 */
    _groupThumb?: string

    /** 是否跳过网络请求 (仅用占位数据) */
    _noFetch?: boolean

    /** 回复数字占位 */
    _replies?: string

    /** 发帖时间占位 */
    _time?: string

    /** 帖子标题占位 */
    _title?: string

    /** 帖子链接占位 */
    _url?: string

    /** 发帖人用户 ID 占位 */
    _userId?: UserId

    /** 发帖人用户名占位 */
    _userName?: string
  }
>

/** 用户目录 */
export type RouteCatalogs = Route<
  'Catalogs',
  {
    /** 用户 ID, 没有 ID 为自己 */
    userId?: UserId
  }
>

/** 用户日志列表 */
export type RouteBlogs = Route<
  'Blogs',
  {
    /** 用户 ID, 没有 ID 为自己 */
    userId: UserId
  }
>

/** 讨论版 */
export type RouteBoard = Route<
  'Board',
  {
    /** 条目 ID */
    subjectId: SubjectId

    /** 条目中文名 */
    name?: string
  }
>

/** 用户人物 */
export type RouteCharacter = Route<
  'Character',
  {
    /** 用户 ID */
    userName: UserId
  }
>

/** 好友 */
export type RouteFriends = Route<
  'Friends',
  {
    /** 用户 ID */
    userId?: UserId

    /** 好友筛选类型, rev 表示反向关注 */
    type?: 'rev'
  }
>

/** 短信 */
export type RoutePM = Route<
  'PM',
  {
    /** 已有 ID, 没有为新建 */
    id?: Id

    /** 对方用户 ID (数字或用户名), 用于发新短信 */
    userId?: UserId

    /** 用户昵称 (用于占位显示) */
    userName?: string

    /** 预填表单 hash (跳过 fetchPMParams) */
    pmFormhash?: string

    /** 预填收件人 ID */
    pmMsgReceivers?: string

    /** 信件交往用户 ID (用于查询关联信件) */
    _userId?: UserId
  }
>

/** 条目详情 */
export type RouteSubject = Route<
  'Subject',
  {
    /** 条目 ID */
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

    /** 默认收藏状态 */
    _collection?: CollectionStatusCn

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

/** 条目信息 (简介/详情) */
export type RouteSubjectInfo = Route<
  'SubjectInfo',
  {
    /** 条目 ID */
    subjectId: SubjectId

    /** 条目名 */
    name?: string

    /** 详情类型 */
    type?: '简介' | '详情'
  }
>

/** 条目关联图 */
export type RouteSubjectLink = Route<
  'SubjectLink',
  {
    /** 关系节点 ID */
    nodeId: number

    /** 是否来源自额外数据 */
    extra: boolean

    /** 来源条目类型 */
    type: SubjectTypeValue

    /** 条目 ID */
    _subjectId?: SubjectId

    /** 条目名 */
    _name?: string
  }
>

/** 条目修订历史 */
export type RouteSubjectWiki = Route<
  'SubjectWiki',
  {
    /** 条目 ID */
    subjectId: SubjectId

    /** 条目名 */
    name?: string
  }
>

/** 章节列表 */
export type RouteEpisodes = Route<
  'Episodes',
  {
    /** 条目 ID */
    subjectId: SubjectId

    /** 条目名 */
    name?: string

    /** 章节从索引开始 */
    filterEps?: number

    /** 预览图 (因浏览器跨域, clien only) */
    epsThumbs?: string[]

    /** 预览图请求头 (clien only) */
    epsThumbsHeader?: Record<string, string>
  }
>

/** 条目目录 */
export type RouteSubjectCatalogs = Route<
  'SubjectCatalogs',
  {
    /** 条目 ID */
    subjectId: SubjectId

    /** 条目名 */
    name?: string
  }
>

/** 排行榜 */
export type RouteRank = Route<
  'Rank',
  {
    /** 条目类型 */
    type?: SubjectType
  }
>

/** 用户评分 */
export type RouteRating = Route<
  'Rating',
  {
    /** 条目 ID */
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

/** 自定义跳转 */
export type RouteActions = Route<
  'Actions',
  {
    /** 条目 ID */
    subjectId: SubjectId

    /** 条目名称 */
    name: string
  }
>

/** 说明 */
export type RouteInformation = Route<
  'Information',
  {
    /** 标题 */
    title: string

    /** 正文 (浏览器端: 字符串逗号分割) */
    message: string | string[]

    /** 是否会员相关 */
    advance?: boolean

    /** 缩略图 (浏览器端: 字符串逗号分割) */
    images?: string | string[]

    /** 引用地址 */
    url?: string

    /** AI 相关 */
    ai?: boolean
  }
>

/** 代理补充说明 */
export type RouteProxyHelp = Route<'ProxyHelp'>

/** 猜你喜欢 */
export type RouteLike = Route<
  'Like',
  {
    /** 用户 ID, 为空使用自己 */
    userId?: UserId
  }
>

/** 条目分享 */
export type RouteShare = Route<
  'Share',
  {
    /** 条目 ID */
    _subjectId: SubjectId

    /** 条目类型中文 */
    _type: SubjectTypeCn | ''

    /** 条目链接 */
    _url: string

    /** base64 编码的封面图片 */
    _cover: `data:image/jpg;base64,${string}`

    /** 标题 */
    _title: string

    /** 内容 */
    _content: string

    /** 详情 */
    _detail: string
  }
>

/** 年鉴 */
export type RouteAward = Route<
  'Award',
  {
    /** 年鉴网络地址 */
    uri: string
  }
>

/** 设置 */
export type RouteSetting = Route<
  'Setting',
  {
    /** 进入页面后展开子菜单 */
    open?: string
  }
>

/** 预览 */
export type RoutePreview = Route<
  'Preview',
  {
    /** 条目 ID */
    subjectId: SubjectId

    /** 条目中文名 */
    cn?: string

    /** 条目原名 */
    jp?: string

    /** 条目年份 */
    year?: string

    /** 传递图片地址数组转字符串 */
    _images?: string

    /** 传递图片头对象转字符串 */
    _headers?: string
  }
>

/** 照片墙 */
export type RouteMilestone = Route<
  'Milestone',
  {
    /** 用户 ID */
    userId?: UserId

    /** 条目类型筛选 */
    subjectType?: SubjectType

    /** 收藏状态筛选 */
    type?: CollectionStatus

    /** 排序方式 */
    order?: CollectionsOrder

    /** 标签筛选 */
    tag?: string

    /** 列数 (网页分享为 string) */
    numColumns?: number | string

    /** 是否圆角 (网页分享为 string) */
    radius?: boolean | string

    /** 是否自动高度 (网页分享为 string) */
    autoHeight?: boolean | string

    /** 中文优先 (网页分享为 string) */
    cnFirst?: boolean | string

    /** 标题行数 (网页分享为 string) */
    numberOfLines?: number | string

    /** 副标题 */
    subTitle?: string

    /** 额外标题 */
    extraTitle?: string

    /** 星标是否满色 (网页分享为 string) */
    starsFull?: boolean | string

    /** 星标颜色 (网页分享为 string) */
    starsColor?: boolean | string

    /** 是否显示 NSFW (网页分享为 string) */
    nsfw?: boolean | string

    /** 是否显示最近时间 (网页分享为 string) */
    lastTime?: boolean | string

    /** 数量限制 (网页分享为 string) */
    limit?: number | string
  }
>

/**
 * 小圣杯 (通用路由)
 * 匹配所有 Tinygrail 开头的路径, 由内部路由表分发
 */
export type RouteTinygrail = (path: `Tinygrail${string}`, params?: Record<string, unknown>) => void

/** 小圣杯 - 我的持仓 */
export type RouteTinygrailCharaAssets = Route<
  'TinygrailCharaAssets',
  {
    /** 用户 ID */
    userId?: UserId

    /** 用户昵称 */
    userName?: string

    /** 提示消息 */
    message?: string

    /** 来源, lottery 表示来自抽奖 */
    form?: 'lottery' | undefined
  }
>

/** 小圣杯 - 交易 */
export type RouteTinygrailDeal = Route<
  'TinygrailDeal',
  {
    /** 人物 ID */
    monoId?: MonoId

    /** 交易类型, bid 为买, asks 为卖 */
    type?: 'bid' | 'asks'

    /** 来源页面, trade 为交易, sacrifice 为献祭 */
    form?: 'trade' | 'sacrifice'
  }
>
