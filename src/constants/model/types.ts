/*
 * @Author: czy0729
 * @Date: 2022-05-22 13:09:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-31 18:33:43
 */
import { ModelValueOf } from '@types'
import {
  BROWSER_SORT,
  COLLECTIONS_ORDERBY,
  COLLECTION_STATUS,
  EP_STATUS,
  MONO_WORKS_ORDERBY,
  PRIVATE,
  RAKUEN_SCOPE,
  RAKUEN_SCROLL_DIRECTION,
  RAKUEN_TYPE,
  RANK_ANIME_FILTER,
  RANK_BOOK_FILTER,
  RANK_GAME_FILTER,
  RANK_REAL_FILTER,
  RATING_STATUS,
  SEARCH_CAT,
  SEARCH_LEGACY,
  SETTING_FONTSIZEADJUST,
  SETTING_HOME_GRID_COVER_LAYOUT,
  SETTING_HOME_LAYOUT,
  SETTING_HOME_SORTING,
  SETTING_INITIAL_PAGE,
  SETTING_QUALITY,
  SETTING_TRANSITION,
  SETTING_USER_GRID_NUM,
  SUBJECT_TYPE,
  TAG_ORDERBY,
  TIMELINE_SCOPE,
  TIMELINE_TYPE
} from './index'

export type BrowserSort = ModelValueOf<typeof BROWSER_SORT>
export type CollectionStatus = ModelValueOf<typeof COLLECTION_STATUS>
export type CollectionStatusCn = ModelValueOf<typeof COLLECTION_STATUS, 'label'>
export type CollectionStatusValue = ModelValueOf<typeof COLLECTION_STATUS, 'title'>
export type CollectionsOrder = ModelValueOf<typeof COLLECTIONS_ORDERBY>
export type EpStatus = ModelValueOf<typeof EP_STATUS>
export type EpStatusCn = ModelValueOf<typeof EP_STATUS, 'label'>
export type MonoWorksOrderby = ModelValueOf<typeof MONO_WORKS_ORDERBY>
export type MonoWorksOrderbyCn = ModelValueOf<typeof MONO_WORKS_ORDERBY, 'label'>
export type Private = ModelValueOf<typeof PRIVATE>
export type RakuenScope = ModelValueOf<typeof RAKUEN_SCOPE>
export type RakuenScrollDirection = ModelValueOf<
  typeof RAKUEN_SCROLL_DIRECTION,
  'value'
>
export type RakuenType = ModelValueOf<typeof RAKUEN_TYPE>
export type RankAnimeFilter = ModelValueOf<typeof RANK_ANIME_FILTER>
export type RankBookFilter = ModelValueOf<typeof RANK_BOOK_FILTER>
export type RankGameFilter = ModelValueOf<typeof RANK_GAME_FILTER>
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
export type SettingHomeSorting = ModelValueOf<typeof SETTING_HOME_SORTING>
export type SettingHomeSortingCn = ModelValueOf<typeof SETTING_HOME_SORTING, 'label'>
export type SettingInitialPageCn = ModelValueOf<typeof SETTING_INITIAL_PAGE, 'label'>
export type SettingQualityCn = ModelValueOf<typeof SETTING_QUALITY, 'label'>
export type SettingTransitionCn = ModelValueOf<typeof SETTING_TRANSITION, 'label'>
export type SettingUserGridNumCn = ModelValueOf<typeof SETTING_USER_GRID_NUM, 'label'>
export type SubjectType = ModelValueOf<typeof SUBJECT_TYPE, 'label'>
export type SubjectTypeCn = ModelValueOf<typeof SUBJECT_TYPE, 'title'>
export type SubjectTypeValue = ModelValueOf<typeof SUBJECT_TYPE>
export type TagOrder = ModelValueOf<typeof TAG_ORDERBY>
export type TagOrderCn = ModelValueOf<typeof TAG_ORDERBY, 'label'>
export type TimeLineScope = ModelValueOf<typeof TIMELINE_SCOPE>
export type TimeLineScopeCn = ModelValueOf<typeof TIMELINE_SCOPE, 'label'>
export type TimeLineType = ModelValueOf<typeof TIMELINE_TYPE>
