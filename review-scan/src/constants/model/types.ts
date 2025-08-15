/*
 * @Author: czy0729
 * @Date: 2022-05-22 13:09:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-11 01:06:31
 */
import { ModelValueOf } from '@types'
import {
  BROWSER_SORT,
  COLLECTION_STATUS,
  COLLECTIONS_ORDERBY,
  EP_STATUS,
  EP_TYPE,
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
  SETTING_FONTSIZEADJUST,
  SETTING_HOME_COUNT_VIEW,
  SETTING_HOME_GRID_COVER_LAYOUT,
  SETTING_HOME_LAYOUT,
  SETTING_HOME_SORTING,
  SETTING_INITIAL_PAGE,
  SETTING_SUBJECT_SPLIT_STYLES,
  SETTING_TRANSITION,
  SETTING_USER_GRID_NUM,
  SUBJECT_TYPE,
  TAG_ORDERBY,
  TIMELINE_SCOPE,
  TIMELINE_TYPE,
  TINYGRAIL_CACULATE_RICH_TYPE,
  TINYGRAIL_CACULATE_TYPE
} from './index'
import { Model } from './utils'

export type DataSource = string[] | readonly string[]

export type ModelItem = {
  /** 键值名称 */
  label: string

  /** 键值值 */
  value: string

  /** 额外键值名称 */
  title?: string
}

export type ModelType = InstanceType<typeof Model>

export type BrowserSort = ModelValueOf<typeof BROWSER_SORT>

export type CollectionStatus = ModelValueOf<typeof COLLECTION_STATUS>
export type CollectionStatusCn = ModelValueOf<typeof COLLECTION_STATUS, 'label'>
export type CollectionStatusValue = ModelValueOf<typeof COLLECTION_STATUS, 'title'>

export type CollectionsOrder = ModelValueOf<typeof COLLECTIONS_ORDERBY>
export type CollectionsOrderCn = ModelValueOf<typeof COLLECTIONS_ORDERBY, 'label'>

export type EpType = ModelValueOf<typeof EP_TYPE>
export type EpTypeCn = ModelValueOf<typeof EP_TYPE, 'label'>

export type EpStatus = ModelValueOf<typeof EP_STATUS>
export type EpStatusCn = ModelValueOf<typeof EP_STATUS, 'label'>

export type MonoWorksOrderby = ModelValueOf<typeof MONO_WORKS_ORDERBY>
export type MonoWorksOrderbyCn = ModelValueOf<typeof MONO_WORKS_ORDERBY, 'label'>

export type Private = ModelValueOf<typeof PRIVATE>
export type PrivateCn = ModelValueOf<typeof PRIVATE, 'label'>

export type RakuenScope = ModelValueOf<typeof RAKUEN_SCOPE>

export type RakuenAutoLoadImage = ModelValueOf<typeof RAKUEN_AUTO_LOAD_IMAGE>

export type RakuenSubExpand = ModelValueOf<typeof RAKUEN_SUB_EXPAND>

export type RakuenNewFloorStyle = ModelValueOf<typeof RAKUEN_NEW_FLOOR_STYLE>
export type RakuenNewFloorStyleCn = ModelValueOf<typeof RAKUEN_NEW_FLOOR_STYLE, 'label'>

export type RakuenScrollDirection = ModelValueOf<typeof RAKUEN_SCROLL_DIRECTION>
export type RakuenType = ModelValueOf<typeof RAKUEN_TYPE>

export type RakuenTypeGroup = ModelValueOf<typeof RAKUEN_TYPE_GROUP>
export type RakuenTypeGroupCn = ModelValueOf<typeof RAKUEN_TYPE_GROUP, 'label'>

export type RakuenTypeMono = ModelValueOf<typeof RAKUEN_TYPE_MONO>
export type RakuenTypeMonoCn = ModelValueOf<typeof RAKUEN_TYPE_MONO, 'label'>

export type RankAnimeFilter = ModelValueOf<typeof RANK_ANIME_FILTER>
export type RankBookFilter = ModelValueOf<typeof RANK_BOOK_FILTER>
export type RankBookFilterSub = ModelValueOf<typeof RANK_BOOK_FILTER_SUB>
export type RankGameFilter = ModelValueOf<typeof RANK_GAME_FILTER>
export type RankGameFilterSub = ModelValueOf<typeof RANK_GAME_FILTER_SUB>
export type RankRealFilter = ModelValueOf<typeof RANK_REAL_FILTER>

export type RatingStatus = ModelValueOf<typeof RATING_STATUS>
export type RatingStatusCn = ModelValueOf<typeof RATING_STATUS, 'label'>

export type SearchCat = ModelValueOf<typeof SEARCH_CAT>
export type SearchCatCn = ModelValueOf<typeof SEARCH_CAT, 'label'>

export type SearchLegacy = ModelValueOf<typeof SEARCH_LEGACY>
export type SettingFontsizeadjust = ModelValueOf<typeof SETTING_FONTSIZEADJUST>

export type SettingHomeLayout = ModelValueOf<typeof SETTING_HOME_LAYOUT>
export type SettingHomeLayoutCn = ModelValueOf<typeof SETTING_HOME_LAYOUT, 'label'>

export type SettingHomeGridCoverLayout = ModelValueOf<
  typeof SETTING_HOME_GRID_COVER_LAYOUT,
  'value'
>
export type SettingHomeGridCoverLayoutCn = ModelValueOf<
  typeof SETTING_HOME_GRID_COVER_LAYOUT,
  'label'
>

export type SettingHomeCountView = ModelValueOf<typeof SETTING_HOME_COUNT_VIEW>
export type SettingHomeCountViewCn = ModelValueOf<typeof SETTING_HOME_COUNT_VIEW, 'label'>

export type SettingHomeSorting = ModelValueOf<typeof SETTING_HOME_SORTING>
export type SettingHomeSortingCn = ModelValueOf<typeof SETTING_HOME_SORTING, 'label'>

export type SettingInitialPage = ModelValueOf<typeof SETTING_INITIAL_PAGE>
export type SettingInitialPageCn = ModelValueOf<typeof SETTING_INITIAL_PAGE, 'label'>

export type SettingTransition = ModelValueOf<typeof SETTING_TRANSITION>
export type SettingTransitionCn = ModelValueOf<typeof SETTING_TRANSITION, 'label'>

export type SettingSubjectSplitStyles = ModelValueOf<typeof SETTING_SUBJECT_SPLIT_STYLES>
export type SettingSubjectSplitStylesCn = ModelValueOf<typeof SETTING_SUBJECT_SPLIT_STYLES, 'label'>

export type SettingUserGridNum = ModelValueOf<typeof SETTING_USER_GRID_NUM>
export type SettingUserGridNumCn = ModelValueOf<typeof SETTING_USER_GRID_NUM, 'label'>

export type SettingCDNOrigin = ModelValueOf<typeof SETTING_CDN_ORIGIN>
export type SettingCDNOriginCn = ModelValueOf<typeof SETTING_CDN_ORIGIN, 'label'>

export type SubjectType = ModelValueOf<typeof SUBJECT_TYPE, 'label'>
export type SubjectTypeCn = ModelValueOf<typeof SUBJECT_TYPE, 'title'>

export type SubjectTypeValue = ModelValueOf<typeof SUBJECT_TYPE>

export type TagOrder = ModelValueOf<typeof TAG_ORDERBY>
export type TagOrderCn = ModelValueOf<typeof TAG_ORDERBY, 'label'>

export type TimeLineScope = ModelValueOf<typeof TIMELINE_SCOPE>
export type TimeLineScopeCn = ModelValueOf<typeof TIMELINE_SCOPE, 'label'>

export type TimeLineType = ModelValueOf<typeof TIMELINE_TYPE>
export type TimeLineTypeCn = ModelValueOf<typeof TIMELINE_TYPE, 'label'>

export type TinygrailCaculateType = ModelValueOf<typeof TINYGRAIL_CACULATE_TYPE>
export type TinygrailCaculateTypeCn = ModelValueOf<typeof TINYGRAIL_CACULATE_TYPE, 'label'>

export type TinygrailCaculateRichType = ModelValueOf<typeof TINYGRAIL_CACULATE_RICH_TYPE>
export type TinygrailCaculateRichTypeCn = ModelValueOf<typeof TINYGRAIL_CACULATE_RICH_TYPE, 'label'>
