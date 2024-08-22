/*
 * @Author: czy0729
 * @Date: 2022-08-04 17:12:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 01:30:51
 */
import Constants from 'expo-constants'
import { _ } from '@stores'
import { COLLECTION_STATUS, MODEL_COLLECTIONS_ORDERBY, MODEL_SUBJECT_TYPE, WEB } from '@constants'
import { CollectionsOrder, SubjectType } from '@types'

export const COMPONENT = 'User'

export const DEFAULT_SUBJECT_TYPE = MODEL_SUBJECT_TYPE.getLabel<SubjectType>('动画')

export const DEFAULT_ORDER = MODEL_COLLECTIONS_ORDERBY.getValue<CollectionsOrder>('收藏时间')

export const H_RADIUS_LINE = _.radiusLg

/** fixed 后带背景的头部高度 */
export const H_HEADER = WEB
  ? 68
  : _.platforms(88, 68, 80, 80 - Constants.statusBarHeight) + H_RADIUS_LINE

/** TabBar 高度 */
export const H_TABBAR = _.r(48)

/** Tab data */
export const TABS = COLLECTION_STATUS.map(item => ({
  title: item.label,
  key: item.value
}))
