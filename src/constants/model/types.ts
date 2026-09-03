/*
 * @Author: czy0729
 * @Date: 2022-05-22 13:09:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:19:58
 */
import type { ModelValueOf } from '@types'
import type {
  BROWSER_SORT,
  COLLECTIONS_ORDERBY,
  COLLECTION_STATUS,
  EP_STATUS,
  EP_TYPE,
  MONO_VOICES_INNER_ORDERBY,
  MONO_VOICES_OUTER_ORDERBY,
  MONO_WORKS_ORDERBY,
  PRIVATE,
  RAKUEN_AUTO_LOAD_IMAGE,
  RAKUEN_NEW_FLOOR_STYLE,
  RAKUEN_SCOPE,
  RAKUEN_SCROLL_DIRECTION,
  RAKUEN_SUB_EXPAND,
  RAKUEN_TYPE,
  RAKUEN_TYPE_GROUP,
  RAKUEN_TYPE_MONO,
  RANK_ANIME_FILTER,
  RANK_BOOK_FILTER,
  RANK_BOOK_FILTER_SUB,
  RANK_GAME_FILTER,
  RANK_GAME_FILTER_SUB,
  RANK_REAL_FILTER,
  RATING_STATUS,
  SEARCH_CAT,
  SEARCH_LEGACY,
  SETTING_CDN_ORIGIN,
  SETTING_FONTSIZE_ADJUST,
  SETTING_HOME_ANIME_INFO_INLINE,
  SETTING_HOME_COUNT_VIEW,
  SETTING_HOME_GRID_COVER_LAYOUT,
  SETTING_HOME_LAYOUT,
  SETTING_HOME_SORTING,
  SETTING_INITIAL_PAGE,
  SETTING_LETTER_SPACING,
  SETTING_LIVE2D_MODEL,
  SETTING_SERVER_STATUS,
  SETTING_SUBJECT_SPLIT_STYLES,
  SETTING_TRANSITION,
  SETTING_USER_COMMENTS_LINES,
  SETTING_USER_GRID_NUM,
  SUBJECT_TYPE,
  TAG_ORDERBY,
  TIMELINE_SCOPE,
  TIMELINE_TYPE,
  TINYGRAIL_CALCULATE_RICH_TYPE,
  TINYGRAIL_CALCULATE_TYPE
} from './index'
import type { Model } from './utils'

/** 数据源，支持可变或只读字符串数组 */
export type DataSource = string[] | readonly string[]

/** Model 键值项结构 */
export type ModelItem = {
  /** 键值名称 */
  label: string

  /** 键值值 */
  value: string

  /** 额外键值名称 */
  title?: string
}

/** Model 类的实例类型 */
export type ModelType = InstanceType<typeof Model>

/** 索引排序方式 */
export type BrowserSort = ModelValueOf<typeof BROWSER_SORT>

/** 收藏状态值 */
export type CollectionStatus = ModelValueOf<typeof COLLECTION_STATUS>

/** 收藏状态中文名称 */
export type CollectionStatusCn = ModelValueOf<typeof COLLECTION_STATUS, 'label'>

/** 收藏状态附加标题 */
export type CollectionStatusValue = ModelValueOf<typeof COLLECTION_STATUS, 'title'>

/** 收藏排序方式 */
export type CollectionsOrder = ModelValueOf<typeof COLLECTIONS_ORDERBY>

/** 章节类型 */
export type EpType = ModelValueOf<typeof EP_TYPE>

/** 章节状态 */
export type EpStatus = ModelValueOf<typeof EP_STATUS>

/** 人物作品排序方式 */
export type MonoWorksOrderby = ModelValueOf<typeof MONO_WORKS_ORDERBY>

/** 人物作品排序方式中文名称 */
export type MonoWorksOrderbyCn = ModelValueOf<typeof MONO_WORKS_ORDERBY, 'label'>

/** 收藏隐私 */
export type Private = ModelValueOf<typeof PRIVATE>

/** 收藏隐私中文名称 */
export type PrivateCn = ModelValueOf<typeof PRIVATE, 'label'>

/** 超展开板块 */
export type RakuenScope = ModelValueOf<typeof RAKUEN_SCOPE>

/** 超展开帖子图片自动加载 */
export type RakuenAutoLoadImage = ModelValueOf<typeof RAKUEN_AUTO_LOAD_IMAGE>

/** 超展开子楼层折叠 */
export type RakuenSubExpand = ModelValueOf<typeof RAKUEN_SUB_EXPAND>

/** 超展开帖子新楼层样式 */
export type RakuenNewFloorStyle = ModelValueOf<typeof RAKUEN_NEW_FLOOR_STYLE>

/** 超展开帖子新楼层样式中文名称 */
export type RakuenNewFloorStyleCn = ModelValueOf<typeof RAKUEN_NEW_FLOOR_STYLE, 'label'>

/** 超展开楼层导航条方向 */
export type RakuenScrollDirection = ModelValueOf<typeof RAKUEN_SCROLL_DIRECTION>

/** 超展开全局聚合类型 */
export type RakuenType = ModelValueOf<typeof RAKUEN_TYPE>

/** 超展开小组范围 */
export type RakuenTypeGroup = ModelValueOf<typeof RAKUEN_TYPE_GROUP>

/** 超展开小组范围中文名称 */
export type RakuenTypeGroupCn = ModelValueOf<typeof RAKUEN_TYPE_GROUP, 'label'>

/** 超展开人物类型 */
export type RakuenTypeMono = ModelValueOf<typeof RAKUEN_TYPE_MONO>

/** 超展开人物类型中文名称 */
export type RakuenTypeMonoCn = ModelValueOf<typeof RAKUEN_TYPE_MONO, 'label'>

/** 排行榜动画筛选条件 */
export type RankAnimeFilter = ModelValueOf<typeof RANK_ANIME_FILTER>

/** 排行榜书籍筛选条件 */
export type RankBookFilter = ModelValueOf<typeof RANK_BOOK_FILTER>

/** 排行榜书籍二级筛选 */
export type RankBookFilterSub = ModelValueOf<typeof RANK_BOOK_FILTER_SUB>

/** 排行榜游戏筛选条件 */
export type RankGameFilter = ModelValueOf<typeof RANK_GAME_FILTER>

/** 排行榜游戏平台筛选 */
export type RankGameFilterSub = ModelValueOf<typeof RANK_GAME_FILTER_SUB>

/** 排行榜三次元筛选条件 */
export type RankRealFilter = ModelValueOf<typeof RANK_REAL_FILTER>

/** 评分状态 */
export type RatingStatus = ModelValueOf<typeof RATING_STATUS>

/** 评分状态中文名称 */
export type RatingStatusCn = ModelValueOf<typeof RATING_STATUS, 'label'>

/** 人物声优外部排序方式 */
export type MonoVoicesOuterOrderby = ModelValueOf<typeof MONO_VOICES_OUTER_ORDERBY>

/** 人物声优内部排序方式 */
export type MonoVoicesInnerOrderby = ModelValueOf<typeof MONO_VOICES_INNER_ORDERBY>

/** 搜索分类 */
export type SearchCat = ModelValueOf<typeof SEARCH_CAT>

/** 搜索分类中文名称 */
export type SearchCatCn = ModelValueOf<typeof SEARCH_CAT, 'label'>

/** 搜索细度 */
export type SearchLegacy = ModelValueOf<typeof SEARCH_LEGACY>

/** 字体大小调整设置 */
export type SettingFontsizeAdjust = ModelValueOf<typeof SETTING_FONTSIZE_ADJUST>

/** 字间距调整设置 */
export type SettingLetterSpacing = ModelValueOf<typeof SETTING_LETTER_SPACING>

/** 首页布局设置 */
export type SettingHomeLayout = ModelValueOf<typeof SETTING_HOME_LAYOUT>

/** 首页布局设置中文名称 */
export type SettingHomeLayoutCn = ModelValueOf<typeof SETTING_HOME_LAYOUT, 'label'>

/** 首页网格封面布局设置 */
export type SettingHomeGridCoverLayout = ModelValueOf<
  typeof SETTING_HOME_GRID_COVER_LAYOUT,
  'value'
>

/** 首页网格封面布局设置中文名称 */
export type SettingHomeGridCoverLayoutCn = ModelValueOf<
  typeof SETTING_HOME_GRID_COVER_LAYOUT,
  'label'
>

/** 首页放送数字显示 */
export type SettingHomeCountView = ModelValueOf<typeof SETTING_HOME_COUNT_VIEW>

/** 首页放送数字显示中文名称 */
export type SettingHomeCountViewCn = ModelValueOf<typeof SETTING_HOME_COUNT_VIEW, 'label'>

/** 首页排序设置 */
export type SettingHomeSorting = ModelValueOf<typeof SETTING_HOME_SORTING>

/** 首页排序设置中文名称 */
export type SettingHomeSortingCn = ModelValueOf<typeof SETTING_HOME_SORTING, 'label'>

/** 首页动画信息内联设置 */
export type SettingHomeAnimeInfoInline = ModelValueOf<typeof SETTING_HOME_ANIME_INFO_INLINE>

/** 初始页面设置 */
export type SettingInitialPage = ModelValueOf<typeof SETTING_INITIAL_PAGE>

/** 初始页面设置中文名称 */
export type SettingInitialPageCn = ModelValueOf<typeof SETTING_INITIAL_PAGE, 'label'>

/** 过渡动画设置 */
export type SettingTransition = ModelValueOf<typeof SETTING_TRANSITION>

/** 过渡动画设置中文名称 */
export type SettingTransitionCn = ModelValueOf<typeof SETTING_TRANSITION, 'label'>

/** 条目分割样式设置 */
export type SettingSubjectSplitStyles = ModelValueOf<typeof SETTING_SUBJECT_SPLIT_STYLES>

/** 用户网格数量设置 */
export type SettingUserGridNum = ModelValueOf<typeof SETTING_USER_GRID_NUM>

/** 用户网格数量设置中文名称 */
export type SettingUserGridNumCn = ModelValueOf<typeof SETTING_USER_GRID_NUM, 'label'>

/** 用户评论行数设置 */
export type SettingUserCommentsLines = ModelValueOf<typeof SETTING_USER_COMMENTS_LINES>

/** CDN 源设置 */
export type SettingCDNOrigin = ModelValueOf<typeof SETTING_CDN_ORIGIN>

/** CDN 源设置中文名称 */
export type SettingCDNOriginCn = ModelValueOf<typeof SETTING_CDN_ORIGIN, 'label'>

/** Live2D 模型设置 */
export type SettingLive2DModel = ModelValueOf<typeof SETTING_LIVE2D_MODEL>

/** 服务可用性显示设置 */
export type SettingServerStatus = ModelValueOf<typeof SETTING_SERVER_STATUS>

/** Live2D 缩放比例 */
export type SettingLive2DScale = '大' | '中' | '小'

/** 条目类型（动画/书籍/游戏/三次元） */
export type SubjectType = ModelValueOf<typeof SUBJECT_TYPE, 'label'>

/** 条目类型中文名称 */
export type SubjectTypeCn = ModelValueOf<typeof SUBJECT_TYPE, 'title'>

/** 条目类型值 */
export type SubjectTypeValue = ModelValueOf<typeof SUBJECT_TYPE>

/** 标签排序方式 */
export type TagOrder = ModelValueOf<typeof TAG_ORDERBY>

/** 标签排序方式中文名称 */
export type TagOrderCn = ModelValueOf<typeof TAG_ORDERBY, 'label'>

/** 时间线作用域 */
export type TimeLineScope = ModelValueOf<typeof TIMELINE_SCOPE>

/** 时间线作用域中文名称 */
export type TimeLineScopeCn = ModelValueOf<typeof TIMELINE_SCOPE, 'label'>

/** 时间线类型 */
export type TimeLineType = ModelValueOf<typeof TIMELINE_TYPE>

/** 时间线类型中文名称 */
export type TimeLineTypeCn = ModelValueOf<typeof TIMELINE_TYPE, 'label'>

/** 小圣杯计算类型 */
export type TinygrailCalculateType = ModelValueOf<typeof TINYGRAIL_CALCULATE_TYPE>

/** 小圣杯计算类型中文名称 */
export type TinygrailCalculateTypeCn = ModelValueOf<typeof TINYGRAIL_CALCULATE_TYPE, 'label'>

/** 小圣杯富人计算类型 */
export type TinygrailCalculateRichType = ModelValueOf<typeof TINYGRAIL_CALCULATE_RICH_TYPE>

/** 小圣杯富人计算类型中文名称 */
export type TinygrailCalculateRichTypeCn = ModelValueOf<
  typeof TINYGRAIL_CALCULATE_RICH_TYPE,
  'label'
>
