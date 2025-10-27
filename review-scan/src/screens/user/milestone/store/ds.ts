/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:54:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 22:51:59
 */
import { COLLECTION_STATUS, COLLECTIONS_ORDERBY, SUBJECT_TYPE } from '@constants'
import { CollectionsOrder, CollectionStatus, Loaded, SubjectType } from '@types'
import { COMPONENT } from '../ds'
import { SubTitle } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  show: false
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** filters */
  subjectType: SUBJECT_TYPE[0].label as SubjectType,
  type: COLLECTION_STATUS[1].value as CollectionStatus,
  order: COLLECTIONS_ORDERBY[0].value as CollectionsOrder,
  tag: '',

  /** options */
  bg: true,
  numColumns: 5,
  radius: false,
  autoHeight: false,
  cnFirst: true,
  numberOfLines: 2,
  subTitle: '序号' as SubTitle,
  extraTitle: '无' as SubTitle,
  starsFull: false,
  starsColor: true,
  nsfw: true,
  lastTime: false,
  limit: 100,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
